import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'evidences');

const directEvidences = [
  {
    name: 'obelisco_1936.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Construccion_del_Obelisco_(Buenos_Aires).jpg'
  },
  {
    name: 'cordobazo_1969.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Cordobazo_-_Marcha.jpg'
  },
  {
    name: 'lamoneda_1973.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Palacio_de_la_moneda_11_septiembre_1973.jpg'
  },
  {
    name: 'panama_1914.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Ancon_at_Miraflores_Locks_1914.jpg'
  },
  {
    name: 'centenario_1910.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Cabildo_de_Buenos_Aires_-_1910.jpg'
  }
];

for (const item of directEvidences) {
  const dest = path.join(dir, item.name);
  console.log(`Downloading direct ${item.name}...`);
  try {
    execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" -o "${dest}" "${item.url}"`, { stdio: 'inherit' });
    const stats = fs.statSync(dest);
    console.log(`✅ ${item.name}: ${stats.size} bytes`);
  } catch (err) {
    console.error(`❌ Error on ${item.name}:`, err.message);
  }
}
