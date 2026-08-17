import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'evidences');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const queries = [
  { name: 'yalta_1945.jpg', query: 'Yalta Conference Churchill Roosevelt Stalin' },
  { name: 'paris_1944.jpg', query: 'De Gaulle Champs-Elysees liberation Paris 1944' },
  { name: 'eiffel_1889.jpg', query: 'Construction tour Eiffel 1888' },
  { name: 'titanic_1912.jpg', query: 'Titanic departs Southampton 1912' },
  { name: 'fleming_1928.jpg', query: 'Alexander Fleming laboratory penicillin' }
];

async function searchAndDownload(item) {
  try {
    const searchUrl = 'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(item.query) + '&srnamespace=6&format=json';
    const res = await fetch(searchUrl, { headers: { 'User-Agent': 'RASTRO/3.0 (info@rastro.com)' } });
    const data = await res.json();
    if (!data.query || !data.query.search || data.query.search.length === 0) {
      console.warn(`No search results for ${item.query}`);
      return;
    }
    const title = data.query.search[0].title;
    console.log(`Found title for ${item.name}: ${title}`);

    const infoUrl = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url&format=json';
    const infoRes = await fetch(infoUrl, { headers: { 'User-Agent': 'RASTRO/3.0 (info@rastro.com)' } });
    const infoData = await infoRes.json();
    const page = Object.values(infoData.query.pages)[0];
    if (!page.imageinfo || !page.imageinfo[0]) return;

    const fileUrl = page.imageinfo[0].url.split('?')[0];
    const dest = path.join(dir, item.name);
    console.log(`Downloading ${item.name} from ${fileUrl}...`);
    execSync(`curl.exe -s -L -A "Mozilla/5.0" -H "Referer: https://commons.wikimedia.org/" -o "${dest}" "${fileUrl}"`);
    const size = fs.statSync(dest).size;
    console.log(`✅ ${item.name}: ${size} bytes`);
  } catch (err) {
    console.error(`❌ Error on ${item.name}:`, err.message);
  }
}

async function main() {
  for (const item of queries) {
    await searchAndDownload(item);
    await sleep(2000);
  }
}

main();
