const fs = require('fs');
const path = require('path');

const evFile = path.join(__dirname, 'src/data/canonical-evidences.ts');
const evContent = fs.readFileSync(evFile, 'utf8');

// Extract all ids and image_urls
const regex = /id:\s*'([^']+)'[\s\S]*?image_url:\s*'([^']+)'/g;
let match;
const allEv = [];

while ((match = regex.exec(evContent)) !== null) {
  allEv.push({ id: match[1], url: match[2] });
}

console.log(`Checking ${allEv.length} canonical evidences...`);

const missing = [];
const valid = [];

for (const item of allEv) {
  const filename = path.basename(item.url);
  const localFile = path.join(__dirname, 'public/evidences', filename);
  if (fs.existsSync(localFile) && fs.statSync(localFile).size > 1000) {
    const sizeKb = (fs.statSync(localFile).size / 1024).toFixed(1);
    valid.push({ id: item.id, file: filename, size: `${sizeKb} KB` });
  } else {
    missing.push({ id: item.id, url: item.url, file: filename });
  }
}

console.log(`\n✅ Valid local files: ${valid.length} / ${allEv.length}`);
if (missing.length > 0) {
  console.log(`\n⚠️ Missing or invalid (${missing.length}):`, JSON.stringify(missing, null, 2));
} else {
  console.log('🎉 ALL 57 EVIDENCES HAVE LOCAL VALID IMAGES!');
}
