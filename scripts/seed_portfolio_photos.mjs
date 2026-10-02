import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env.local
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

// Curated high-res editorial photography mapped to specialists
const PRO_IMAGES = {
  'pro-beatbox-collective': {
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    items: [
      { idSuffix: 'port-a3-1', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80' },
      { idSuffix: 'port-a3-2', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80' },
    ],
  },
  'pro-aura-weddings': {
    cover: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    items: [
      { idSuffix: 'port-1', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80' },
      { idSuffix: 'port-2', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80' },
      { idSuffix: 'port-3', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80' },
    ],
  },
  'pro-avantika-anchors': {
    cover: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    items: [
      { idSuffix: 'port-a3-3', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80' },
    ],
  },
  'pro-samarpan-coordination': {
    cover: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    items: [
      { idSuffix: 'port-7', url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80' },
    ],
  },
  'pro-nakshatra-events': {
    cover: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    items: [
      { idSuffix: 'port-4', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80' },
    ],
  },
  'pro-sufi-soul-ensemble': {
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    items: [
      { idSuffix: 'port-a3-4', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80' },
    ],
  },
  'pro-vedic-heritage': {
    cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    items: [
      { idSuffix: 'port-5', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80' },
    ],
  },
  'pro-sound-dimension': {
    cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    items: [
      { idSuffix: 'port-a3-5', url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80' },
    ],
  },
};

async function seedPhotos() {
  console.log('Seeding portfolio photos for verified professionals...');

  for (const [proId, data] of Object.entries(PRO_IMAGES)) {
    // 1. Update Professional Cover & Avatar
    const { error: proErr } = await supabase
      .from('professionals')
      .update({
        cover_image_url: data.cover,
        avatar_url: data.avatar,
      })
      .eq('id', proId);

    if (proErr) {
      console.error(`Error updating pro ${proId}:`, proErr.message);
    } else {
      console.log(`Updated pro: ${proId}`);
    }

    // 2. Update Portfolio Items
    for (const item of data.items) {
      const { error: portErr } = await supabase
        .from('portfolio_items')
        .update({ image_url: item.url })
        .eq('professional_id', proId);

      if (portErr) {
        console.error(`Error updating portfolio item:`, portErr.message);
      }
    }
  }

  console.log('Portfolio photos seeded successfully!');
}

seedPhotos().catch(console.error);
