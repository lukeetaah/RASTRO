const fs = require('fs');
const path = require('path');
const https = require('https');

const PAGES = [
  { file: 'lusitania_1915.jpg', wiki: 'en', page: 'RMS_Lusitania' },
  { file: 'sputnik_1957.jpg', wiki: 'en', page: 'Sputnik_1' },
  { file: 'gagarin_1961.jpg', wiki: 'en', page: 'Yuri_Gagarin' },
  { file: 'normandia_1944.jpg', wiki: 'en', page: 'Normandy_landings' },
  { file: 'iwojima_1945.jpg', wiki: 'en', page: 'Raising_the_Flag_on_Iwo_Jima' },
  { file: 'reichstag_1945.jpg', wiki: 'en', page: 'Raising_a_Flag_over_the_Reichstag' },
  { file: 'versalles_1919.jpg', wiki: 'en', page: 'Treaty_of_Versailles' },
  { file: 'potsdam_1945.jpg', wiki: 'en', page: 'Potsdam_Conference' },
  { file: 'nuremberg_1945.jpg', wiki: 'en', page: 'Nuremberg_trials' },
  { file: 'eniac_1946.jpg', wiki: 'en', page: 'ENIAC' },
  { file: 'goldengate_1937.jpg', wiki: 'en', page: 'Golden_Gate_Bridge' },
  { file: 'hindenburg_1937.jpg', wiki: 'en', page: 'Hindenburg_disaster' },
  { file: 'tutankamon_1922.jpg', wiki: 'en', page: 'Howard_Carter' },
  { file: 'rontgen_1895.jpg', wiki: 'en', page: 'Wilhelm_R%C3%B6ntgen' },
  { file: 'adn_1953.jpg', wiki: 'en', page: 'Photo_51' },
  { file: 'lindbergh_1927.jpg', wiki: 'en', page: 'Charles_Lindbergh' },
  { file: 'armisticio_1918.jpg', wiki: 'en', page: 'Armistice_of_11_November_1918' },
  { file: 'misiles_1962.jpg', wiki: 'en', page: 'Cuban_Missile_Crisis' },
  { file: 'kavanagh_1936.jpg', wiki: 'es', page: 'Edificio_Kavanagh' },
  { file: 'bombardeo_1955.jpg', wiki: 'es', page: 'Bombardeo_de_la_Plaza_de_Mayo' },
  { file: 'colon_1908.jpg', wiki: 'es', page: 'Teatro_Col%C3%B3n' },
  { file: 'portena_1857.jpg', wiki: 'es', page: 'La_Porte%C3%B1a_(locomotora)' },
  { file: 'tucuman_1816.jpg', wiki: 'es', page: 'Casa_Hist%C3%B3rica_de_la_Independencia' },
  { file: 'sanlorenzo_1813.jpg', wiki: 'es', page: 'Combate_de_San_Lorenzo' },
  { file: 'asuncion_1946.jpg', wiki: 'es', page: 'Juan_Domingo_Per%C3%B3n' },
  { file: 'evaperon_1952.jpg', wiki: 'es', page: 'Eva_Per%C3%B3n' },
  { file: 'bastones_1966.jpg', wiki: 'es', page: 'Noche_de_los_Bastones_Largos' },
  { file: 'malvinas_1982.jpg', wiki: 'es', page: 'Guerra_de_las_Malvinas' },
  { file: 'cuba_1959.jpg', wiki: 'es', page: 'Revoluci%C3%B3n_cubana' },
  { file: 'tlatelolco_1968.jpg', wiki: 'es', page: 'Masacre_de_Tlatelolco' },
  { file: 'sufragistas_1913.jpg', wiki: 'en', page: 'Woman_Suffrage_Procession' },
  { file: 'woodstock_1969.jpg', wiki: 'en', page: 'Woodstock' },
  { file: 'lunchrock_1932.jpg', wiki: 'en', page: 'Lunch_atop_a_Skyscraper' },
  { file: 'onu_1945.jpg', wiki: 'en', page: 'United_Nations_Charter' },
  { file: 'libertad_1886.jpg', wiki: 'en', page: 'Statue_of_Liberty' },
  { file: 'marconi_1901.jpg', wiki: 'en', page: 'Guglielmo_Marconi' },
  { file: 'tiananmen_1989.jpg', wiki: 'en', page: 'Tank_Man' }
];

const USER_AGENT = 'RASTRO-Game/1.0 (https://rastro.app; lucas@rastro.app)';
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
  console.log(`Querying Wikipedia API for ${PAGES.length} events with compliant User-Agent...`);
  
  for (const item of PAGES) {
    const dest = path.join(outDir, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      console.log(`⏩ Already valid: ${item.file}`);
      continue;
    }

    try {
      const summaryUrl = `https://${item.wiki}.wikipedia.org/api/rest_v1/page/summary/${item.page}`;
      const summary = await fetchJson(summaryUrl);
      
      const imageUrl = summary.originalimage?.source || summary.thumbnail?.source;
      if (!imageUrl) {
        console.error(`⚠️ No image found for ${item.page}`);
        continue;
      }

      console.log(`📥 Downloading for ${item.page}: ${imageUrl}`);
      await downloadBinary(imageUrl, dest);
      const size = fs.statSync(dest).size;
      console.log(`✅ Saved ${item.file} (${(size / 1024).toFixed(1)} KB)`);

      // Gentle pause to respect API policy
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.error(`❌ Error on ${item.page}:`, err.message);
    }
  }

  console.log('✨ All downloads completed!');
}

main();
