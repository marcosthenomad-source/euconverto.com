import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const TABLE_NAME = 'kv_store_12d56551';

// Get a single value by key
export async function get(key: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('value')
    .eq('key', key)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw error;
  }

  return data?.value;
}

// Set a single key-value pair
export async function set(key: string, value: any) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert({ key, value }, { onConflict: 'key' });

  if (error) {
    throw error;
  }
}

// Delete a single key
export async function del(key: string) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('key', key);

  if (error) {
    throw error;
  }
}

// Get multiple values by keys
export async function mget(keys: string[]) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('value')
    .in('key', keys);

  if (error) {
    throw error;
  }

  return data?.map(row => row.value) || [];
}

// Set multiple key-value pairs
export async function mset(entries: Record<string, any>) {
  const rows = Object.entries(entries).map(([key, value]) => ({
    key,
    value
  }));

  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert(rows, { onConflict: 'key' });

  if (error) {
    throw error;
  }
}

// Delete multiple keys
export async function mdel(keys: string[]) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .in('key', keys);

  if (error) {
    throw error;
  }
}

// Get all values with keys matching a prefix
export async function getByPrefix(prefix: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('value')
    .like('key', `${prefix}%`);

  if (error) {
    throw error;
  }

  return data?.map(row => row.value) || [];
}
