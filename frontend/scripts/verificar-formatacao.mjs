import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const raiz = process.cwd();
const extensoes = new Set(['.ts', '.html', '.scss', '.json', '.md']);
const arquivosRaiz = [
  'package.json',
  'angular.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.spec.json',
  'README.md',
];
const diretorios = ['src'];

function normalizarConteudo(conteudo) {
  const normalizado = conteudo
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}$/g, '\n\n');

  return normalizado.endsWith('\n') ? normalizado : `${normalizado}\n`;
}

async function coletarArquivos(diretorio) {
  const entradas = await readdir(diretorio, { withFileTypes: true });
  const arquivos = [];

  for (const entrada of entradas) {
    const caminho = path.join(diretorio, entrada.name);

    if (entrada.isDirectory()) {
      arquivos.push(...(await coletarArquivos(caminho)));
      continue;
    }

    if (extensoes.has(path.extname(entrada.name))) {
      arquivos.push(caminho);
    }
  }

  return arquivos;
}

async function obterArquivosAlvo() {
  const encontrados = [];

  for (const arquivo of arquivosRaiz) {
    const caminho = path.join(raiz, arquivo);

    try {
      const info = await stat(caminho);

      if (info.isFile()) {
        encontrados.push(caminho);
      }
    } catch {}
  }

  for (const diretorio of diretorios) {
    encontrados.push(...(await coletarArquivos(path.join(raiz, diretorio))));
  }

  return encontrados;
}

async function main() {
  const divergentes = [];
  const arquivos = await obterArquivosAlvo();

  for (const arquivo of arquivos) {
    const original = await readFile(arquivo, 'utf8');
    const formatado = normalizarConteudo(original);

    if (original !== formatado) {
      divergentes.push(path.relative(raiz, arquivo));
    }
  }

  if (divergentes.length === 0) {
    console.log('Formatação verificada com sucesso.');
    return;
  }

  console.error('Arquivos fora do padrão de formatação:');
  for (const arquivo of divergentes) {
    console.error(`- ${arquivo}`);
  }

  process.exitCode = 1;
}

await main();
