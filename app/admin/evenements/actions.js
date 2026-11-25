"use server";

import { redirect } from "next/navigation";
import { exigerAdmin } from "@/lib/admin";

const CATEGORIES = ["politique", "securite", "economie", "diplomatie"];
const PAYS = ["BF", "ML", "NE", "AES"];
const TYPES_SOURCE = ["officiel", "presse", "academique"];

function fabriquerSlug(titre, date) {
  const base = titre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
  return `${base || "evenement"}-${date.slice(0, 4)}`;
}

function messageErreur(erreur) {
  if (erreur.code === "23505") {
    return "Un événement avec le même titre et la même année existe déjà.";
  }
  if (erreur.code === "23514") {
    return "Un champ ne respecte pas les limites : titre de 5 à 200 caractères, résumé de 10 à 600 caractères, liens commençant par http.";
  }
  return `Erreur : ${erreur.message}`;
}

async function annuler(supabase, evenementId, sourceIds) {
  await supabase.from("events").delete().eq("id", evenementId);
  if (sourceIds.length > 0) {
    await supabase.from("sources").delete().in("id", sourceIds);
  }
}

export async function creerEvenement(formData) {
  const { supabase } = await exigerAdmin();

  const texte = (nom) => String(formData.get(nom) ?? "").trim();

  const titre = texte("titre");
  const date = texte("date_evenement");
  const lieu = texte("lieu");
  const resume = texte("resume");
  const categorie = texte("categorie");
  const importance = Number(texte("importance") || 2);
  const statutDemande = texte("statut") === "publie" ? "publie" : "brouillon";
  const lienMedia = texte("lien_media");
  const pointsCles = texte("points_cles")
    .split("\n")
    .map((ligne) => ligne.trim())
    .filter(Boolean);
  const pays = formData
    .getAll("pays")
    .map(String)
    .filter((p) => PAYS.includes(p));

  // --- Vérifications avant d’écrire dans la base ---
  if (titre.length < 5) {
    return { erreur: "Le titre doit faire au moins 5 caractères." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { erreur: "Choisis la date de l’événement." };
  }
  if (resume.length < 10 || resume.length > 600) {
    return { erreur: "Le résumé doit faire entre 10 et 600 caractères." };
  }
  if (!CATEGORIES.includes(categorie)) {
    return { erreur: "Choisis une catégorie." };
  }
  if (![1, 2, 3].includes(importance)) {
    return { erreur: "L’importance doit être 1, 2 ou 3." };
  }
  if (pays.length === 0) {
    return { erreur: "Coche au moins un pays concerné." };
  }
  if (lienMedia && !/^https?:\/\//i.test(lienMedia)) {
    return { erreur: "Le lien média doit commencer par http:// ou https://." };
  }

  const sources = [];
  for (let i = 1; i <= 3; i++) {
    const source = {
      titre: texte(`source_titre_${i}`),
      editeur: texte(`source_editeur_${i}`),
      url: texte(`source_url_${i}`),
      type: texte(`source_type_${i}`),
      date_publication: texte(`source_date_${i}`),
    };
    const remplie =
      source.titre || source.editeur || source.url || source.date_publication;
    if (!remplie) continue;

    if (
      !source.titre ||
      !source.editeur ||
      !source.url ||
      !TYPES_SOURCE.includes(source.type)
    ) {
      return {
        erreur: `Source ${i} : le titre, l’éditeur, le lien et le type sont obligatoires.`,
      };
    }
    if (!/^https?:\/\//i.test(source.url)) {
      return {
        erreur: `Source ${i} : le lien doit commencer par http:// ou https://.`,
      };
    }
    sources.push(source);
  }

  if (statutDemande === "publie" && sources.length < 2) {
    return {
      erreur:
        "Pour publier, il faut au moins 2 sources. Choisis « Brouillon » ou ajoute des sources.",
    };
  }

  // --- 1. L’événement (toujours créé en brouillon d’abord) ---
  const { data: evenement, error: erreurEvenement } = await supabase
    .from("events")
    .insert({
      titre,
      slug: fabriquerSlug(titre, date),
      date_evenement: date,
      lieu: lieu || null,
      resume,
      points_cles: pointsCles,
      contexte_avant: texte("contexte_avant") || null,
      contexte_evenement: texte("contexte_evenement") || null,
      contexte_impact: texte("contexte_impact") || null,
      lien_media: lienMedia || null,
      categorie,
      importance,
      statut: "brouillon",
    })
    .select("id")
    .single();

  if (erreurEvenement) {
    return { erreur: messageErreur(erreurEvenement) };
  }

  // --- 2. Les pays concernés ---
  const { error: erreurPays } = await supabase
    .from("event_countries")
    .insert(pays.map((p) => ({ event_id: evenement.id, pays: p })));
  if (erreurPays) {
    await annuler(supabase, evenement.id, []);
    return { erreur: messageErreur(erreurPays) };
  }

  // --- 3. Les sources et leurs liens avec l’événement ---
  let sourceIds = [];
  if (sources.length > 0) {
    const { data: sourcesCreees, error: erreurSources } = await supabase
      .from("sources")
      .insert(
        sources.map((s) => ({
          titre: s.titre,
          editeur: s.editeur,
          url: s.url,
          type: s.type,
          date_publication: s.date_publication || null,
        }))
      )
      .select("id");
    if (erreurSources) {
      await annuler(supabase, evenement.id, []);
      return { erreur: messageErreur(erreurSources) };
    }
    sourceIds = sourcesCreees.map((s) => s.id);

    const { error: erreurLiens } = await supabase
      .from("event_sources")
      .insert(
        sourceIds.map((id) => ({ event_id: evenement.id, source_id: id }))
      );
    if (erreurLiens) {
      await annuler(supabase, evenement.id, sourceIds);
      return { erreur: messageErreur(erreurLiens) };
    }
  }

  // --- 4. Publication (la base vérifie qu’il y a assez de sources) ---
  if (statutDemande === "publie") {
    const { error: erreurPublication } = await supabase
      .from("events")
      .update({ statut: "publie" })
      .eq("id", evenement.id);
    if (erreurPublication) {
      return {
        erreur: `L’événement est enregistré en brouillon (visible dans la liste), mais la publication a été refusée : ${erreurPublication.message}`,
      };
    }
  }

  redirect("/admin?cree=1");
}
