#!/bin/sh
set -eu

if [ ! -f package.json ]; then
  echo "Projeto Angular ainda nao foi inicializado em /aplicacao/frontend."
  echo "Container do frontend mantido ativo para o bootstrap posterior."
  exec tail -f /dev/null
fi

checksum_atual() {
  cksum package-lock.json | awk '{ print $1 ":" $2 }'
}

instalar_dependencias() {
  echo "Instalando dependencias do frontend..."
  npm ci
  checksum_atual > node_modules/.package-lock.checksum
}

if [ ! -d node_modules ] || [ ! -f node_modules/.package-lock.checksum ]; then
  instalar_dependencias
elif [ -f package-lock.json ] && [ "$(cat node_modules/.package-lock.checksum)" != "$(checksum_atual)" ]; then
  instalar_dependencias
fi

if grep -q '"start"' package.json; then
  exec npm start -- --host 0.0.0.0 --port 4200 --poll 2000
fi

exec tail -f /dev/null
