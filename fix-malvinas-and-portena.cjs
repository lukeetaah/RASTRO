const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES = [
  {
    file: 'malvinas_1982.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Infantes_de_Marina%2C_Islas_Malvinas%2C_1982._AR-AGN-AGAS01-rg-537-345487.jpg/1920px-Infantes_de_Marina%2C_Islas_Malvinas%2C_1982._AR-AGN-AGAS01-rg-537-345487.jpg'
  },
  {
    file: 'portena_1857.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/La_Porte%C3%B1a_detalle_BN.jpg/1920px-La_Porte%C3%B1a_detalle_BN.jpg'
  },
  {
    file: 'lindbergh_1927.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Charles_Lindbergh_and_the_Spirit_of_Saint_Louis_%28Crisco_restoration%2C_with_wings%29.jpg/1920px-Charles_Lindbergh_and_the_Spirit_of_Saint_Louis_%28Crisco_restoration%2C_with_wings%29.jpg'
  },
  {
    file: 'cuba_1959.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Fidel_Castro_and_Camilo_Cienfuegos_entering_Havana_on_8_January_1959.jpg/1920px-Fidel_Castro_and_Camilo_Cienfuegos_entering_Havana_on_8_January_1959.jpg'
  },
  {
    file: 'woodstock_1969.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Woodstock_crowd.jpg/1920px-Woodstock_crowd.jpg'
  },
  {
    file: 'sufragistas_1913.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/1913_Woman_Suffrage_Parade_Inez_Milholland.jpg/1920px-1913_Woman_Suffrage_Parade_Inez_Milholland.jpg'
  },
  {
    file: 'versalles_1919.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Treaty_of_Versailles%2C_Signatures.jpg/1920px-Treaty_of_Versailles%2C_Signatures.jpg'
  },
  {
    file: 'goldengate_1937.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Golden_Gate_Bridge_pedestrian_day_1937.jpg/1920px-Golden_Gate_Bridge_pedestrian_day_1937.jpg'
  },
  {
    file: 'tucuman_1816.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Casa_de_Tucuman_1868_Angel_Paganelli.jpg/1920px-Casa_de_Tucuman_1868_Angel_Paganelli.jpg'
  },
  {
    file: 'asuncion_1946.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Peron_asuncion_1946.jpg/1920px-Peron_asuncion_1946.jpg'
  },
  {
    file: 'evaperon_1952.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Funerales_de_Eva_Peron.jpg/1920px-Funerales_de_Eva_Peron.jpg'
  },
  {
    file: 'onu_1945.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Signing_the_UN_Charter_%281945%29.jpg/1920px-Signing_the_UN_Charter_%281945%29.jpg'
  },
  {
    file: 'libertad_1886.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Unveiling_the_Statue_of_Liberty_1886.jpg/1920px-Unveiling_the_Statue_of_Liberty_1886.jpg'
  },
  {
    file: 'tiananmen_1989.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Tianasquare.jpg/1920px-Tianasquare.jpg'
  }
];

const outDir = path.join(__dirname, 'public/evidences');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'RASTRO-Game/1.0 (https://rastro.app; contact@rastro.app)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': 'RASTRO-Game/1.0 (https://rastro.app; contact@rastro.app)' } }, redirRes => {
          redirRes.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve();
          });
        }).on('error', reject);
        return;
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of IMAGES) {
    const dest = path.join(outDir, item.file);
    try {
      console.log(`Downloading high-res ${item.file}...`);
      await download(item.url, dest);
      const size = fs.statSync(dest).size;
      console.log(`✅ Success: ${item.file} (${(size / 1024).toFixed(1)} KB)`);
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.error(`❌ Error on ${item.file}:`, err.message);
    }
  }
  console.log('Done fixing high-res authentic images!');
}

run();
