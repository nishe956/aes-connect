import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function Test() {
  const { data, error } = await supabase
    .from('events')
    .select('titre, date_evenement')
    .order('date_evenement', { ascending: false })

  return <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
}