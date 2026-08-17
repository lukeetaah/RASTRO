import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const title = 'File:Desfile en Plaza de Mayo, 25 de Mayo de 1910.jpg';
const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url&format=json';

async function main() {
  const r = await fetch(url, { headers: { 'User-Agent': 'RASTROApp/1.0' } });
  const d = await r.json();
  const page = Object.values(d.query.pages)[0];
  const fileUrl = page.imageinfo[0].url.split('?')[0];
  console.log(`Downloading Centenario from ${fileUrl}...`);
  const dest = path.join(process.cwd(), 'public', 'evidences', 'centenario_1910.jpg');
  execSync(`curl.exe -s -L -A "Mozilla/5.0" -o "${dest}" "${fileUrl}"`);
  console.log(`✅ Centenario 1910: ${fs.statSync(dest).size} bytes`);
}

main();
