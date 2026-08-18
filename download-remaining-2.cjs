const fs = require('fs');
const path = require('path');
const https = require('https');

const TARGETS = [
  { file: 'onu_1945.jpg', wiki: 'en', search: 'Charter_of_the_United_Nations' },
  { file: 'tucuman_1816.jpg', wiki: 'es', search: 'Casa_de_Tucumán' }
];

const USER_AGENT = 'RASTROGame/1.1 (https://rastro.app; support@rastro.app)';
const outDir = path.join(__dirname, 'public/evidences');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(d));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadBinary(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': USER_AGENT } }, redir => {
          redir.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
        return;
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of TARGETS) {
    const dest = path.join(outDir, item.file);
    try {
      const pageUrl = `https://${item.wiki}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.search)}&prop=pageimages|images&pithumbsize=1600&format=json`;
      const json = await fetchJson(pageUrl);
      const pages = json.query?.pages || {};
      const pageId = Object.keys(pages)[0];
      const pageData = pages[pageId];

      let imageUrl = pageData?.thumbnail?.source;

      if (!imageUrl && pageData?.images?.length > 0) {
        for (const img of pageData.images) {
          if (img.title.endsWith('.jpg') || img.title.endsWith('.png') || img.title.endsWith('.JPG')) {
            const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(img.title)}&prop=imageinfo&iiprop=url&iiurlwidth=1600&format=json`;
            const infoJson = await fetchJson(infoUrl);
            const infoPages = infoJson.query?.pages || {};
            const infoId = Object.keys(infoPages)[0];
            const info = infoPages[infoId]?.imageinfo?.[0];
            if (info?.thumburl || info?.url) {
              imageUrl = info.thumburl || info.url;
              break;
            }
          }
        }
      }

      if (!imageUrl) {
        console.error(`⚠️ No image found for ${item.search}`);
        continue;
      }

      console.log(`📥 Downloading ${item.file} from: ${imageUrl}`);
      await downloadBinary(imageUrl, dest);
      const size = fs.statSync(dest).size;
      console.log(`✅ Success ${item.file}: ${(size / 1024).toFixed(1)} KB`);
    } catch (e) {
      console.error(`❌ Error on ${item.file}:`, e.message);
    }
  }
}

run();
