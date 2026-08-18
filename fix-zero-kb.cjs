const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'public/evidences');
const files = fs.readdirSync(dir);

const zeroKb = [];
for (const f of files) {
  const p = path.join(dir, f);
  const stat = fs.statSync(p);
  if (stat.size < 2000) {
    zeroKb.push({ file: f, size: stat.size });
  }
}

console.log(`Found ${zeroKb.length} files under 2KB:`, zeroKb);

// Direct high-res Wikimedia URLs for any corrupted / 0KB files
const FALLBACK_SOURCES = {
  'centenario_1910.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Exposicion_del_Centenario_1910_Pabellon_de_las_Provincias.jpg',
  'cordobazo_1969.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Cordobazo.jpg',
  'misiles_1962.jpg': 'https://upload.wikimedia.org/wikipedia/commons/5/52/MRBM_Launch_Site_1_San_Cristobal%2C_October_1962.jpg',
  'sputnik_1957.jpg': 'https://upload.wikimedia.org/wikipedia/commons/b/be/Sputnik_asm.jpg',
  'tiananmen_1989.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Tianasquare.jpg',
  'sanlorenzo_1813.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Combate_de_San_Lorenzo_por_Ballerini.jpg',
  'onu_1945.jpg': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Signing_the_UN_Charter_%281945%29.jpg',
  'tutankamon_1922.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Harry_Burton_-_Howard_Carter_in_Tutankhamun%27s_tomb.jpg',
  'bastones_1966.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Noche_de_los_bastones_largos.jpg',
  'malvinas_1982.jpg': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Infantes_de_Marina%2C_Islas_Malvinas%2C_1982._AR-AGN-AGAS01-rg-537-345487.jpg',
  'portena_1857.jpg': 'https://upload.wikimedia.org/wikipedia/commons/8/83/Primer_Locomotora_Argentina_%22La_Porte%C3%B1a%22.jpg'
};

const USER_AGENT = 'RASTRO-Bot/1.0 (https://rastro.app; admin@rastro.app)';

function downloadDirect(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, { headers: { 'User-Agent': USER_AGENT } }, redirRes => {
          redirRes.pipe(file);
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

async function fix() {
  for (const item of zeroKb) {
    const url = FALLBACK_SOURCES[item.file];
    if (!url) {
      console.log(`No fallback defined for ${item.file}`);
      continue;
    }
    const dest = path.join(dir, item.file);
    try {
      console.log(`Fixing ${item.file}...`);
      await downloadDirect(url, dest);
      const newSize = fs.statSync(dest).size;
      console.log(`✅ Fixed ${item.file}: ${(newSize / 1024).toFixed(1)} KB`);
    } catch (e) {
      console.error(`❌ Failed ${item.file}: ${e.message}`);
    }
  }
  console.log('Done scanning and fixing zero-kb files.');
}

fix();
