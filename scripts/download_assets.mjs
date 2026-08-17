import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'evidences');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const files = [
  { name: 'obelisco_1936.jpg', file: 'File:Construccion_del_Obelisco_(Buenos_Aires).jpg' },
  { name: 'solvay_1927.jpg', file: 'File:Solvay_conference_1927.jpg' },
  { name: 'apollo11_1969.jpg', file: 'File:Aldrin_Apollo_11_original.jpg' },
  { name: 'berlin_1989.jpg', file: 'File:Berlinermauer.jpg' },
  { name: 'cordobazo_1969.jpg', file: 'File:Cordobazo_-_Marcha.jpg' },
  { name: 'lamoneda_1973.jpg', file: 'File:Palacio_de_la_moneda_11_septiembre_1973.jpg' },
  { name: 'panama_1914.jpg', file: 'File:Ancon_at_Miraflores_Locks_1914.jpg' },
  { name: 'centenario_1910.jpg', file: 'File:Cabildo_de_Buenos_Aires_-_1910.jpg' }
];

async function fetchFromWikiAPI(fileTitle) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url|thumburl&iiurlwidth=1280&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'RASTRO-Game-Bot/1.0 (lucas@example.com)' } });
  const data = await res.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  const info = pages[pageId].imageinfo[0];
  return info.thumburl || info.url;
}

async function run() {
  for (const item of files) {
    try {
      console.log(`Getting URL for ${item.file}...`);
      const directUrl = await fetchFromWikiAPI(item.file);
      console.log(`Downloading ${item.name} from ${directUrl}...`);
      
      const imgRes = await fetch(directUrl, {
        headers: { 'User-Agent': 'RASTRO-Game-Bot/1.0 (lucas@example.com)' }
      });
      if (!imgRes.ok) throw new Error(`HTTP ${imgRes.status}`);
      
      const arrayBuffer = await imgRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const outPath = path.join(dir, item.name);
      fs.writeFileSync(outPath, buffer);
      console.log(`✅ Saved ${item.name} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`❌ Error on ${item.name}:`, err.message);
    }
  }
}

run();
