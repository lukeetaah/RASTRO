import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'evidences');

async function downloadFromWiki(title, filename) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url&format=json';
  const r = await fetch(url, { headers: { 'User-Agent': 'RASTRO/1.0' } });
  const d = await r.json();
  const page = Object.values(d.query.pages)[0];
  const fileUrl = page.imageinfo[0].url.split('?')[0];
  console.log(`Downloading ${filename} from ${fileUrl}...`);
  const dest = path.join(dir, filename);
  execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -H "Referer: https://commons.wikimedia.org/" -o "${dest}" "${fileUrl}"`);
  console.log(`✅ Saved ${filename} (${fs.statSync(dest).size} bytes)`);
}

async function run() {
  await downloadFromWiki('File:Cordobazo-Mujeres.jpg', 'cordobazo_1969.jpg');
  await downloadFromWiki('File:Cabildo celebracion centenario 1910.jpg', 'centenario_1910.jpg');
}

run();
