import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'evidences');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const corpusToDownload = [
  {
    name: 'obelisco_1936.jpg',
    title: 'File:Obelisco de Buenos Aires 1936.jpg',
  },
  {
    name: 'cabildo_1810.jpg',
    title: 'File:Cabildoabierto-Subercaseaux.jpg',
  },
  {
    name: 'cruce_andes_1817.jpg',
    title: 'File:Cruce de los Andes.jpg',
  },
  {
    name: 'cordobazo_1969.jpg',
    title: 'File:Cordobazo-Mujeres.jpg',
  },
  {
    name: 'centenario_1910.jpg',
    title: 'File:Plaza de Mayo 1910.jpg',
  },
  {
    name: 'lamoneda_1973.jpg',
    title: 'File:Golpe de Estado 1973.jpg',
  },
  {
    name: 'panama_1914.jpg',
    title: 'File:Opening of the Panama Canal SS Ancon approaching Gamboa Looking north Aug 15, 1914 - DPLA - 0c0baedc6b427a89406d5779c16b4205.jpg',
  },
  {
    name: 'solvay_1927.jpg',
    title: 'File:Solvay conference 1927.jpg',
  },
  {
    name: 'apollo11_1969.jpg',
    title: 'File:Aldrin Apollo 11 original.jpg',
  },
  {
    name: 'berlin_1989.jpg',
    title: 'File:Berlinermauer.jpg',
  },
  {
    name: 'hiroshima_1945.jpg',
    title: 'File:Atomic cloud over Hiroshima.jpg',
  },
  {
    name: 'sarajevo_1914.jpg',
    title: 'File:DC-1914-27-d-Sarajevo-cropped.jpg',
  },
  {
    name: 'mlk_1963.jpg',
    title: 'File:Martin Luther King - I Have a Dream.jpg',
  }
];

async function downloadItem(item) {
  try {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(item.title) + '&prop=imageinfo&iiprop=url&format=json';
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'RASTRO-Historical-Archive/2.0 (https://github.com/lukeetaah/RASTRO; contact@rastro-game.com)'
      }
    });
    const text = await res.text();
    if (text.startsWith('You are making')) {
      console.warn(`Rate limit hit on ${item.name}, waiting 3s...`);
      await sleep(3000);
      return;
    }
    const data = JSON.parse(text);
    const page = Object.values(data.query.pages)[0];
    if (!page.imageinfo || !page.imageinfo[0]) {
      console.warn(`No image info for ${item.title}`);
      return;
    }
    const fileUrl = page.imageinfo[0].url.split('?')[0];
    const dest = path.join(dir, item.name);
    console.log(`Downloading ${item.name} from ${fileUrl}...`);
    execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -H "Referer: https://commons.wikimedia.org/" -o "${dest}" "${fileUrl}"`);
    const size = fs.statSync(dest).size;
    console.log(`✅ ${item.name}: ${size} bytes`);
  } catch (err) {
    console.error(`❌ Error on ${item.name}:`, err.message);
  }
}

async function main() {
  for (const item of corpusToDownload) {
    await downloadItem(item);
    await sleep(2000); // 2s pause between Wikimedia API calls
  }
}

main();
