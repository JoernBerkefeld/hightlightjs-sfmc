import hljs from 'highlight.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import hljsDefineAmpscript from '../src/languages/ampscript.js';
import hljsDefineSsjs from '../src/languages/ssjs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

hljs.registerLanguage('ampscript', hljsDefineAmpscript);
hljs.registerLanguage('ssjs', hljsDefineSsjs);

for (const lang of ['ampscript', 'ssjs']) {
  const dir = path.join(__dirname, 'markup', lang);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.txt') && !f.includes('.expect.'));

  for (const file of files) {
    const code = fs.readFileSync(path.join(dir, file), 'utf-8');
    const result = hljs.highlight(code, { language: lang });
    const expectFile = file.replace('.txt', '.expect.txt');
    fs.writeFileSync(path.join(dir, expectFile), result.value);
    console.log(`Generated ${lang}/${expectFile}`);
  }
}
