// Genera una versión de un solo archivo (self-contained) a partir de los
// archivos del proyecto, para publicar/previsualizar como Artifact.
//   node build-artifact.mjs [rutaSalida]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const DIR = dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || join(DIR, 'bloom.standalone.html');

const html = readFileSync(join(DIR, 'index.html'), 'utf8');
const css  = readFileSync(join(DIR, 'styles.css'), 'utf8');
const js   = readFileSync(join(DIR, 'app.js'), 'utf8');

const body = html.slice(html.indexOf('<body>') + '<body>'.length, html.indexOf('</body>'))
  .replace(/<script src="app\.js"[^>]*><\/script>\s*/i, '')
  .trim();

const doc = `<title>Bloom — Tu compañía diaria</title>
<style>
${css.trim()}
</style>
${body}
<script>
${js.trim()}
</script>
`;
writeFileSync(out, doc);
console.log('Artifact generado en', out, '·', doc.length, 'bytes');
