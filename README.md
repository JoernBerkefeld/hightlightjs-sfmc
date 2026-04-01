# SFMC Languages for Highlight.js

[![npm version](https://img.shields.io/npm/v/highlightjs-sfmc.svg)](https://www.npmjs.com/package/highlightjs-sfmc)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

Syntax highlighting for **Salesforce Marketing Cloud** languages using [Highlight.js](https://highlightjs.org/).

Includes grammars for:

- **AMPscript** — Marketing Cloud's proprietary scripting language
- **SSJS** (Server-Side JavaScript) — JavaScript runtime with SFMC-specific globals and APIs

## Usage

### Node.js / Bundler

```bash
npm install highlightjs-sfmc highlight.js
```

```javascript
import hljs from 'highlight.js';
import hljsAmpscript from 'highlightjs-sfmc/ampscript';
import hljsSsjs from 'highlightjs-sfmc/ssjs';

hljs.registerLanguage('ampscript', hljsAmpscript);
hljs.registerLanguage('ssjs', hljsSsjs);

hljs.highlightAll();
```

### CDN / Static Website

```html
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlightjs-sfmc/dist/ampscript.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlightjs-sfmc/dist/ssjs.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/default.min.css" />

<script>
  hljs.highlightAll();
</script>
```

Then mark your code blocks with the appropriate language:

```html
<pre><code class="language-ampscript">
%%[
SET @name = "World"
Output(Concat("Hello, ", @name))
]%%
</code></pre>

<pre><code class="language-ssjs">
Platform.Load("core", "1");
var rows = DataExtension.Init("MyDE").Rows.Lookup(["Key"], ["value"]);
Write(Stringify(rows));
</code></pre>
```

## What Gets Highlighted

### AMPscript

| Element | Examples | Scope |
|---|---|---|
| Block delimiters | `%%[` `]%%` | `meta` |
| Inline delimiters | `%%=` `=%%` | `meta` |
| Keywords | `VAR` `SET` `IF` `THEN` `ELSE` `ENDIF` `FOR` `NEXT` | `keyword` |
| Built-in functions | `Lookup` `ContentBlockByKey` `Output` `Concat` | `built_in` |
| User variables | `@firstName` | `variable` |
| System variables | `@@ExecCtx` | `variable.language` |
| Personalization | `%%Name%%` | `variable.language` |
| Strings | `"hello"` `'world'` | `string` |
| Numbers | `42` `3.14` | `number` |
| Comments | `/* block comment */` | `comment` |
| Operators | `==` `!=` `AND` `OR` `NOT` | `keyword` / `operator` |

### SSJS

Extends JavaScript highlighting with SFMC-specific additions:

| Element | Examples | Scope |
|---|---|---|
| SFMC globals | `Platform` `DataExtension` `WSProxy` `HTTP` | `built_in` |
| SFMC functions | `Write` `Stringify` `ContentBlockByKey` | `built_in` |
| Platform API | `Platform.Function.*` `Platform.Response.*` | `built_in` |
| Script.Util | `Script.Util.WSProxy` `Script.Util.HttpRequest` | `built_in` |
| Core methods | `.Init()` `.Retrieve()` `.Add()` | `title.function.invoke` |

All standard JavaScript syntax (variables, control flow, strings, etc.) is highlighted by the built-in JavaScript grammar.

## Testing with Highlight.js Core

To test this plugin against the Highlight.js test suite, clone the [highlight.js repo](https://github.com/highlightjs/highlight.js.git) and link this package into its `extra/` directory. Run the commands from the **parent folder** that contains both `highlight.js` (the clone) and `highlightjs-sfmc`.

**Bash / macOS / Linux** (symbolic link):

```bash
git clone --depth 1 https://github.com/highlightjs/highlight.js.git
cd highlight.js
mkdir -p extra
ln -s ../highlightjs-sfmc extra/highlightjs-sfmc
node ./tools/build.js -t node
npm test
```

**Windows PowerShell** (directory junction; usually works without elevated rights):

```powershell
git clone --depth 1 https://github.com/highlightjs/highlight.js.git
Set-Location highlight.js
New-Item -ItemType Directory -Force -Path extra | Out-Null
New-Item -ItemType Junction -Path "extra\highlightjs-sfmc" -Target (Resolve-Path "..\highlightjs-sfmc")
node .\tools\build.js -t node
npm test
```

If `Resolve-Path` fails, adjust `-Target` to the absolute path of your `highlightjs-sfmc` checkout. You can use a symbolic link instead (`New-Item -ItemType SymbolicLink`) if your Windows version and policy allow it (often requires an elevated shell or Developer Mode).

## License

[MIT](LICENSE.md)
