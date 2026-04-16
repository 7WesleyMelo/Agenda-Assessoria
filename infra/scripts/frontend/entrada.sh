#!/bin/sh
set -eu

if [ ! -f package.json ]; then
  echo "Projeto Angular ainda nao foi inicializado em /aplicacao/frontend."
  echo "Container do frontend mantido ativo para o bootstrap posterior."
  exec tail -f /dev/null
fi

npm install

if npm run | grep -q "start"; then
  exec npm start -- --host 0.0.0.0 --port 4200
fi

exec tail -f /dev/null
