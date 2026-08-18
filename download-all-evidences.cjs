const fs = require('fs');
const path = require('path');
const https = require('https');

// Curated verified Wikipedia/Wikimedia image URLs with high resolution
const IMAGES_TO_FETCH = {
  'lusitania_1915.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/RMS_Lusitania_leaving_New_York_1907.jpg',
  'sputnik_1957.jpg': 'https://upload.wikimedia.org/wikipedia/commons/b/be/Sputnik_asm.jpg',
  'gagarin_1961.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Gagarin_in_Sweden.jpg/1280px-Gagarin_in_Sweden.jpg',
  'normandia_1944.jpg': 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg',
  'iwojima_1945.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Raising_the_Flag_on_Iwo_Jima%2C_larger_-_edit1.jpg/1280px-Raising_the_Flag_on_Iwo_Jima%2C_larger_-_edit1.jpg',
  'reichstag_1945.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Reichstag_flag_original.jpg/1280px-Reichstag_flag_original.jpg',
  'versalles_1919.jpg': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Treaty_of_Versailles%2C_Signatures.jpg',
  'potsdam_1945.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Potsdam_conference_1945.jpg/1280px-Potsdam_conference_1945.jpg',
  'nuremberg_1945.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Nuremberg_trials_courtroom_1945.jpg/1280px-Nuremberg_trials_courtroom_1945.jpg',
  'eniac_1946.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Eniac.jpg',
  'goldengate_1937.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Golden_Gate_Bridge_pedestrian_day_1937.jpg/1280px-Golden_Gate_Bridge_pedestrian_day_1937.jpg',
  'hindenburg_1937.jpg': 'https://upload.wikimedia.org/wikipedia/commons/8/84/Hindenburg_burning.jpg',
  'tutankamon_1922.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Harry_Burton_-_Howard_Carter_in_Tutankhamun%27s_tomb.jpg/1280px-Harry_Burton_-_Howard_Carter_in_Tutankhamun%27s_tomb.jpg',
  'rontgen_1895.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/First_medical_X-ray_by_Wilhelm_R%C3%B6ntgen_of_his_wife_Anna_Bertha_Ludwig%27s_hand_-_18951222.jpg/1280px-First_medical_X-ray_by_Wilhelm_R%C3%B6ntgen_of_his_wife_Anna_Bertha_Ludwig%27s_hand_-_18951222.jpg',
  'adn_1953.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Photo_51_x-ray_diffraction_image.jpg/1024px-Photo_51_x-ray_diffraction_image.jpg',
  'lindbergh_1927.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Charles_Lindbergh_and_the_Spirit_of_Saint_Louis_%28Crisco_restoration%2C_with_wings%29.jpg/1280px-Charles_Lindbergh_and_the_Spirit_of_Saint_Louis_%28Crisco_restoration%2C_with_wings%29.jpg',
  'armisticio_1918.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Armistice_du_11_novembre_1918_Foch_au_centre.jpg/1280px-Armistice_du_11_novembre_1918_Foch_au_centre.jpg',
  'misiles_1962.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/MRBM_Launch_Site_1_San_Cristobal%2C_October_1962.jpg/1280px-MRBM_Launch_Site_1_San_Cristobal%2C_October_1962.jpg',
  'kavanagh_1936.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Edificio_Kavanagh_en_1936.jpg/1280px-Edificio_Kavanagh_en_1936.jpg',
  'bombardeo_1955.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Bombardeo_Plaza_de_Mayo_1955.jpg/1280px-Bombardeo_Plaza_de_Mayo_1955.jpg',
  'colon_1908.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Teatro_Colon_1908.jpg/1280px-Teatro_Colon_1908.jpg',
  'portena_1857.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Locomotora_La_Porte%C3%B1a_1857.jpg/1280px-Locomotora_La_Porte%C3%B1a_1857.jpg',
  'tucuman_1816.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Casa_de_Tucuman_1868_Angel_Paganelli.jpg/1280px-Casa_de_Tucuman_1868_Angel_Paganelli.jpg',
  'sanlorenzo_1813.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Combate_de_San_Lorenzo_por_Ballerini.jpg/1280px-Combate_de_San_Lorenzo_por_Ballerini.jpg',
  'asuncion_1946.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Peron_asuncion_1946.jpg/1280px-Peron_asuncion_1946.jpg',
  'evaperon_1952.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Funerales_de_Eva_Peron.jpg/1280px-Funerales_de_Eva_Peron.jpg',
  'bastones_1966.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Noche_de_los_bastones_largos.jpg/1280px-Noche_de_los_bastones_largos.jpg',
  'malvinas_1982.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Falklands_War_-_Argentine_soldiers_in_Port_Stanley.jpg/1280px-Falklands_War_-_Argentine_soldiers_in_Port_Stanley.jpg',
  'cuba_1959.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Fidel_Castro_and_Camilo_Cienfuegos_entering_Havana_on_8_January_1959.jpg/1280px-Fidel_Castro_and_Camilo_Cienfuegos_entering_Havana_on_8_January_1959.jpg',
  'tlatelolco_1968.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Plaza_de_las_Tres_Culturas_1968.jpg/1280px-Plaza_de_las_Tres_Culturas_1968.jpg',
  'sufragistas_1913.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/1913_Woman_Suffrage_Parade_Inez_Milholland.jpg/1280px-1913_Woman_Suffrage_Parade_Inez_Milholland.jpg',
  'woodstock_1969.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Woodstock_crowd.jpg/1280px-Woodstock_crowd.jpg',
  'lunchrock_1932.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Lunch_atop_a_Skyscraper_-_Charles_Clyde_Ebbets.jpg/1280px-Lunch_atop_a_Skyscraper_-_Charles_Clyde_Ebbets.jpg',
  'onu_1945.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Signing_the_UN_Charter_%281945%29.jpg/1280px-Signing_the_UN_Charter_%281945%29.jpg',
  'libertad_1886.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Unveiling_the_Statue_of_Liberty_1886.jpg/1280px-Unveiling_the_Statue_of_Liberty_1886.jpg',
  'marconi_1901.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Marconi_signal_hill_1901.jpg/1280px-Marconi_signal_hill_1901.jpg',
  'tiananmen_1989.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Tianasquare.jpg/1280px-Tianasquare.jpg'
};

const outputDir = path.join(__dirname, 'public/evidences');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    // Use wsrv.nl proxy to bypass Wikimedia rate-limiting
    const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(url.replace(/^https?:\/\//, ''))}&output=jpg&q=90`;
    
    https.get(proxyUrl, { headers: { 'User-Agent': 'Mozilla/5.0 RASTRO-Game/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirRes) => {
          const fileStream = fs.createWriteStream(destPath);
          redirRes.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve();
          });
        }).on('error', reject);
        return;
      }
      
      if (res.statusCode !== 200) {
        // Try fallback to direct url
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (directRes) => {
          if (directRes.statusCode === 200) {
            const fileStream = fs.createWriteStream(destPath);
            directRes.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              resolve();
            });
          } else {
            reject(new Error(`Failed with status ${res.statusCode} (direct: ${directRes.statusCode})`));
          }
        }).on('error', reject);
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Starting download of ${Object.keys(IMAGES_TO_FETCH).length} historical images...`);
  
  for (const [filename, url] of Object.entries(IMAGES_TO_FETCH)) {
    const dest = path.join(outputDir, filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`⏩ Already exists: ${filename}`);
      continue;
    }

    try {
      console.log(`📥 Downloading: ${filename}...`);
      await downloadFile(url, dest);
      const size = fs.statSync(dest).size;
      console.log(`✅ Saved: ${filename} (${(size / 1024).toFixed(1)} KB)`);
      // Small sleep to be polite
      await new Promise(r => setTimeout(r, 250));
    } catch (err) {
      console.error(`❌ Error downloading ${filename}: ${err.message}`);
    }
  }

  console.log('🎉 Download process finished!');
}

run();
