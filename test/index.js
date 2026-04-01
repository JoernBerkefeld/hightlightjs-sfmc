import 'should';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import hljs from 'highlight.js';
import fs from 'fs';
import hljsDefineAmpscript from '../src/languages/ampscript.js';
import hljsDefineSsjs from '../src/languages/ssjs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

hljs.registerLanguage('ampscript', hljsDefineAmpscript);
hljs.registerLanguage('ssjs', hljsDefineSsjs);

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

function describeLanguage(langName) {
  describe(`${langName} syntax highlighting`, () => {
    const markupDir = path.join(__dirname, 'markup', langName);

    let files;
    before(async () => {
      files = (await readdir(markupDir)).filter((f) => !f.includes('.expect.'));
    });

    it('has test fixtures', () => {
      files.length.should.be.above(0, `No test fixtures found in ${markupDir}`);
    });

    it('should perform syntax highlighting', async () => {
      for (const file of files) {
        const scenario = file.replace(/\.txt$/, '');
        const filePath = path.join(markupDir, file);
        const expectFilePath = filePath.replace('.txt', '.expect.txt');
        const code = await readFile(filePath, 'utf-8');
        const expected = await readFile(expectFilePath, 'utf-8');
        const result = hljs.highlight(code, { language: langName });
        const actual = result.value;
        actual.trim().should.eql(expected.trim(), `Mismatch in ${scenario}`);
      }
    });
  });
}

describeLanguage('ampscript');
describeLanguage('ssjs');

describe('AMPscript auto-detection', () => {
  it('should detect ampscript from block delimiters', async () => {
    const code = await readFile(
      path.join(__dirname, 'detect', 'ampscript', 'detect-block.txt'),
      'utf-8'
    );
    const result = hljs.highlightAuto(code);
    result.language.should.eql('ampscript');
  });
});
