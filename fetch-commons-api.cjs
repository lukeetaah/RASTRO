const fs = require('fs');
const path = require('path');
const https = require('https');

const COMMONS_FILES = [
  { file: 'malvinas_1982.jpg', title: 'File:Infantes_de_Marina,_Islas_Malvinas,_1982._AR-AGN-AGAS01-rg-537-345487.jpg' },
  { file: 'portena_1857.jpg', title: 'File:Primer_Locomotora_Argentina_"La_Porteña".jpg' },
  { file: 'lindbergh_1927.jpg', title: 'File:Charles_Lindbergh_and_the_Spirit_of_Saint_Louis_(Crisco_restoration,_with_wings).jpg' },
  { file: 'cuba_1959.jpg', title: 'File:Fidel_Castro_and_Camilo_Cienfuegos_entering_Havana_on_8_January_1959.jpg' },
  { file: 'versalles_1919.jpg', title: 'File:Treaty_of_Versailles,_Signatures.jpg' },
  { file: 'woodstock_1969.jpg', title: 'File:Woodstock_crowd.jpg' },
  { file: 'goldengate_1937.jpg', title: 'File:Golden_Gate_Bridge_pedestrian_day_1937.jpg' },
  { file: 'tucuman_1816.jpg', title: 'File:Casa_de_Tucuman_1868_Angel_Paganelli.jpg' },
  { file: 'asuncion_1946.jpg', title: 'File:Peron_asuncion_1946.jpg' },
  { file: 'evaperon_1952.jpg', title: 'File:Funerales_de_Eva_Peron.jpg' },
  { file: 'sufragistas_1913.jpg', title: 'File:1913_Woman_Suffrage_Parade_Inez_Milholland.jpg' },
  { file: 'onu_1945.jpg', title: 'File:Signing_the_UN_Charter_(1945).jpg' },
  { file: 'libertad_1886.jpg', title: 'File:Unveiling_the_Statue_of_Liberty_1886.jpg' },
  { file: 'tiananmen_1989.jpg', title: 'File:Tianasquare.jpg' }
];

const USER_AGENT = 'RASTRO-Game/1.0 (https://rastro.app; developer@rastro.app)';
const outDir = path.join(__dirname, 'public/evidences');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadBinary(url, dest) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': USER_AGENT } }, (redirRes) => {
          redirRes.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve();
          });
        }).on('error', reject);
        return;
      }
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log(`Resolving exact Wikimedia Commons URLs for ${COMMONS_FILES.length} files...`);
  
  for (const item of COMMONS_FILES) {
    const dest = path.join(outDir, item.file);
    try {
      const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.title)}&prop=imageinfo&iiprop=url&iiurlwidth=1600&format=json`;
      const res = await fetchJson(apiUrl);
      const pages = res.query?.pages;
      const pageId = Object.keys(pages || {})[0];
      const imageInfo = pages?.[pageId]?.imageinfo?.[0];

      const downloadUrl = imageInfo?.thumburl || imageInfo?.url;
      if (!downloadUrl) {
        console.error(`⚠️ Could not find URL on Commons for ${item.title}`);
        continue;
      }

      console.log(`📥 Downloading ${item.file} from: ${downloadUrl}`);
      await downloadBinary(downloadUrl, dest);
      const size = fs.statSync(dest).size;
      console.log(`✅ Saved ${item.file} (${(size / 1024).toFixed(1)} KB)`);

      await new Promise(r => setTimeout(r, 250));
    } catch (err) {
      console.error(`❌ Error on ${item.file}:`, err.message);
    }
  }

  console.log('✨ All high-res downloads finished!');
}

main();
