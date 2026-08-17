import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'evidences');

const titles = [
  { name: 'lamoneda_1973.jpg', title: 'File:Golpe de Estado 1973.jpg' },
  { name: 'centenario_1910.jpg', title: 'File:Cabildo de bs as lado bolivar 1910.jpg' },
  { name: 'cordobazo_1969.jpg', title: 'File:Cordobazo - Barrio Alberdi - Av. Colon Parva de autos.jpg' }
];

async function run() {
  for (const item of titles) {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(item.title) + '&prop=imageinfo&iiprop=url&format=json';
    const res = await fetch(url, { headers: { 'User-Agent': 'RASTROApp/1.0' } });
    const data = await res.json();
    const page = Object.values(data.query.pages)[0];
    const fileUrl = page.imageinfo[0].url.split('?')[0];
    const dest = path.join(dir, item.name);
    console.log(`Downloading ${item.name} from ${fileUrl}...`);
    execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -o "${dest}" "${fileUrl}"`);
    console.log(`✅ Saved ${item.name} (${fs.statSync(dest).size} bytes)`);
  }
}

run();
