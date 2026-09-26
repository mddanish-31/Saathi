import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    let val = match[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[match[1].trim()] = val;
  }
}

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const serviceKey = env['SUPABASE_SECRET_KEY'] || env['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !serviceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const tables = [
  'users',
  'categories',
  'subcategories',
  'services',
  'professionals',
  'portfolio_items',
  'reviews',
  'enquiries',
  'notifications',
];

async function run() {
  console.log('=== SUPABASE 9 TABLES ROW COUNT DIAGNOSTIC ===');
  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`Table: ${table} -> ERROR: ${error.message}`);
    } else {
      console.log(`Table: ${table.padEnd(16)} -> ${count} rows (Live)`);
    }
  }
}

run();
