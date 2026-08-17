import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'evidences');

const filesToFix = [
  {
    name: 'lamoneda_1973.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Palacio_de_la_Moneda_incendiado_1973.jpg'
  },
  {
    name: 'panama_1914.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Opening_of_the_Panama_Canal_SS_Ancon_approaching_Gamboa_Looking_north_Aug_15%2C_1914_-_DPLA_-_0c0baedc6b427a89406d5779c16b4205.jpg'
  },
  {
    name: 'centenario_1910.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Cabildo_celebracion_centenario_1910.jpg'
  },
  {
    name: 'cordobazo_1969.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Cordobazo_marcha_SMATA_1969.jpg'
  }
];

for (const item of filesToFix) {
  const dest = path.join(dir, item.name);
  try {
    console.log(`Downloading ${item.name}...`);
    execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -o "${dest}" "${item.url}"`);
    const size = fs.statSync(dest).size;
    console.log(`✅ ${item.name}: ${size} bytes`);
  } catch (err) {
    console.error(`Error on ${item.name}:`, err.message);
  }
}
