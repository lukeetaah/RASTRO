import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'evidences');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const corpusToDownload = [
  // 1. Conferencia de Yalta 1945 (Churchill, Roosevelt, Stalin)
  {
    name: 'yalta_1945.jpg',
    title: 'File:Yalta Conference (Churchill, Roosevelt, Stalin) (cropped).jpg',
  },
  // 2. Liberación de París 1944 (De Gaulle en Campos Elíseos)
  {
    name: 'paris_1944.jpg',
    title: 'File:Crowds of French people line the Champs Elysees to view Allied tanks and French armored vehicles after the liberation of Paris. - NARA - 531252.jpg',
  },
  // 3. Primer Vuelo de los Hermanos Wright 1903
  {
    name: 'wright_1903.jpg',
    title: 'File:First flight2.jpg',
  },
  // 4. Construcción de la Torre Eiffel 1888/1889
  {
    name: 'eiffel_1889.jpg',
    title: 'File:Tour Eiffel 1888.jpg',
  },
  // 5. 17 de Octubre de 1945 en Plaza de Mayo (Patas en la fuente)
  {
    name: 'plaza_mayo_1945.jpg',
    title: 'File:Plaza de Mayo el 17 de octubre de 1945.jpg',
  },
  // 6. Titanic partiendo de Southampton 1912
  {
    name: 'titanic_1912.jpg',
    title: 'File:Titanic departs Queenstown ts006.jpg',
  },
  // 7. Alexander Fleming y la Penicilina 1928/1943
  {
    name: 'fleming_1928.jpg',
    title: 'File:Alexander Fleming in his laboratory.jpg',
  },
  // 8. Inauguración de Brasilia 1960
  {
    name: 'brasilia_1960.jpg',
    title: 'File:Inauguração de Brasília.tif',
  }
];

async function downloadItem(item) {
  try {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(item.title) + '&prop=imageinfo&iiprop=url&format=json';
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'RASTRO-Expanded-Archive/3.0 (https://github.com/lukeetaah/RASTRO; info@rastro-game.com)'
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
    await sleep(2000);
  }
}

main();
