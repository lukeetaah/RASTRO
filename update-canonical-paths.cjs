const fs = require('fs');
const path = require('path');

const evPath = path.join(__dirname, 'src/data/canonical-evidences.ts');
let content = fs.readFileSync(evPath, 'utf8');

const MAPPINGS = [
  { id: 'ev-mar-1915-lusitania', file: '/evidences/lusitania_1915.jpg' },
  { id: 'ev-esp-1957-sputnik', file: '/evidences/sputnik_1957.jpg' },
  { id: 'ev-esp-1961-gagarin', file: '/evidences/gagarin_1961.jpg' },
  { id: 'ev-guer-1944-normandia', file: '/evidences/normandia_1944.jpg' },
  { id: 'ev-guer-1945-iwojima', file: '/evidences/iwojima_1945.jpg' },
  { id: 'ev-guer-1945-reichstag', file: '/evidences/reichstag_1945.jpg' },
  { id: 'ev-pol-1919-versalles', file: '/evidences/versalles_1919.jpg' },
  { id: 'ev-pol-1945-potsdam', file: '/evidences/potsdam_1945.jpg' },
  { id: 'ev-jur-1945-nuremberg', file: '/evidences/nuremberg_1945.jpg' },
  { id: 'ev-tec-1946-eniac', file: '/evidences/eniac_1946.jpg' },
  { id: 'ev-arq-1937-goldengate', file: '/evidences/goldengate_1937.jpg' },
  { id: 'ev-des-1937-hindenburg', file: '/evidences/hindenburg_1937.jpg' },
  { id: 'ev-cie-1922-tutankamon', file: '/evidences/tutankamon_1922.jpg' },
  { id: 'ev-cie-1895-rontgen', file: '/evidences/rontgen_1895.jpg' },
  { id: 'ev-cie-1953-adn', file: '/evidences/adn_1953.jpg' },
  { id: 'ev-avi-1927-lindbergh', file: '/evidences/lindbergh_1927.jpg' },
  { id: 'ev-guer-1918-armisticio', file: '/evidences/armisticio_1918.jpg' },
  { id: 'ev-pol-1962-misiles', file: '/evidences/misiles_1962.jpg' },
  { id: 'ev-arg-1936-kavanagh', file: '/evidences/kavanagh_1936.jpg' },
  { id: 'ev-arg-1955-bombardeo', file: '/evidences/bombardeo_1955.jpg' },
  { id: 'ev-arg-1908-colon', file: '/evidences/colon_1908.jpg' },
  { id: 'ev-arg-1857-portena', file: '/evidences/portena_1857.jpg' },
  { id: 'ev-arg-1816-tucuman', file: '/evidences/tucuman_1816.jpg' },
  { id: 'ev-arg-1813-sanlorenzo', file: '/evidences/sanlorenzo_1813.jpg' },
  { id: 'ev-arg-1946-asuncion', file: '/evidences/asuncion_1946.jpg' },
  { id: 'ev-arg-1952-evaperon', file: '/evidences/evaperon_1952.jpg' },
  { id: 'ev-arg-1966-bastones', file: '/evidences/bastones_1966.jpg' },
  { id: 'ev-arg-1982-malvinas', file: '/evidences/malvinas_1982.jpg' },
  { id: 'ev-lat-1959-cuba', file: '/evidences/cuba_1959.jpg' },
  { id: 'ev-lat-1968-tlatelolco', file: '/evidences/tlatelolco_1968.jpg' },
  { id: 'ev-soc-1913-sufragistas', file: '/evidences/sufragistas_1913.jpg' },
  { id: 'ev-soc-1969-woodstock', file: '/evidences/woodstock_1969.jpg' },
  { id: 'ev-arq-1932-lunchrock', file: '/evidences/lunchrock_1932.jpg' },
  { id: 'ev-pol-1945-onu', file: '/evidences/onu_1945.jpg' },
  { id: 'ev-arq-1886-libertad', file: '/evidences/libertad_1886.jpg' },
  { id: 'ev-tec-1901-marconi', file: '/evidences/marconi_1901.jpg' },
  { id: 'ev-pol-1989-tiananmen', file: '/evidences/tiananmen_1989.jpg' }
];

for (const map of MAPPINGS) {
  const blockRegex = new RegExp(`id:\\s*'${map.id}'[\\s\\S]*?image_url:\\s*'[^']+'[\\s\\S]*?image_hd_url:\\s*'[^']+'`, 'g');
  content = content.replace(blockRegex, (match) => {
    return match
      .replace(/image_url:\s*'[^']+'/, `image_url: '${map.file}'`)
      .replace(/image_hd_url:\s*'[^']+'/, `image_hd_url: '${map.file}'`);
  });
}

fs.writeFileSync(evPath, content, 'utf8');
console.log('✅ Successfully updated all 37 canonical evidence paths to local assets!');
