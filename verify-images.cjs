const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/canonical-evidences.ts');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /id:\s*'([^']+)'[\s\S]*?image_url:\s*'([^']+)'/g;
let match;
const evidences = [];

while ((match = regex.exec(content)) !== null) {
  evidences.push({ id: match[1], url: match[2] });
}

console.log(`Found ${evidences.length} evidences. Verifying URLs...`);

async function verifyAll() {
  const failed = [];
  for (const ev of evidences) {
    if (ev.url.startsWith('/')) {
      const localPath = path.join(__dirname, 'public', ev.url);
      if (!fs.existsSync(localPath)) {
        console.error(`❌ Local missing: ${ev.id} -> ${ev.url}`);
        failed.push(ev);
      } else {
        console.log(`✅ Local OK: ${ev.id}`);
      }
    } else {
      try {
        const res = await fetch(ev.url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (res.ok && res.status === 200) {
          console.log(`✅ Remote OK (200): ${ev.id}`);
        } else {
          console.error(`❌ Remote FAILED (${res.status}): ${ev.id} -> ${ev.url}`);
          failed.push({ id: ev.id, status: res.status, url: ev.url });
        }
      } catch (err) {
        console.error(`❌ Remote ERROR: ${ev.id} -> ${ev.url} (${err.message})`);
        failed.push({ id: ev.id, error: err.message, url: ev.url });
      }
    }
  }

  console.log('\n--- SUMMARY ---');
  console.log(`Total: ${evidences.length}, Failed: ${failed.length}`);
  if (failed.length > 0) {
    console.log('Failed items:\n' + JSON.stringify(failed, null, 2));
  }
}

verifyAll();
