import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'evidences');

const queries = [
  { name: 'obelisco_1936.jpg', search: 'Obelisco Buenos Aires 1936 construccion' },
  { name: 'cordobazo_1969.jpg', search: 'Cordobazo 1969' },
  { name: 'lamoneda_1973.jpg', search: 'Palacio de la Moneda 1973 bombardeo' },
  { name: 'panama_1914.jpg', search: 'Ancon Panama canal 1914' },
  { name: 'centenario_1910.jpg', search: 'Cabildo Buenos Aires 1910 centenario' }
];

async function searchAndDownload(item) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(item.search)}&srnamespace=6&format=json`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': 'RASTROApp/1.0 (lucas@example.com)' } });
    const data = await res.json();
    const firstResult = data.query.search[0];
    if (!firstResult) {
      console.error(`No results for ${item.search}`);
      return;
    }
    const title = firstResult.title;
    console.log(`Found title: ${title}`);

    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
    const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': 'RASTROApp/1.0 (lucas@example.com)' } });
    const infoData = await infoRes.json();
    const pages = infoData.query.pages;
    const pageId = Object.keys(pages)[0];
    const directUrl = pages[pageId].imageinfo[0].url;

    console.log(`Direct URL: ${directUrl}`);
    const dest = path.join(dir, item.name);
    execSync(`curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -o "${dest}" "${directUrl}"`);
    const size = fs.statSync(dest).size;
    console.log(`🎉 SAVED ${item.name} (${size} bytes)`);
  } catch (err) {
    console.error(`Error on ${item.name}:`, err.message);
  }
}

async function main() {
  for (const q of queries) {
    await searchAndDownload(q);
  }
}

main();
