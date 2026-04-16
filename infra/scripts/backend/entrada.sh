#!/bin/sh
set -eu

if [ ! -f artisan ]; then
  echo "Projeto Laravel ainda nao foi inicializado em /aplicacao/backend."
  echo "Container da API mantido ativo para o bootstrap posterior."
  exec tail -f /dev/null
fi

if [ -f composer.json ]; then
  composer install --no-interaction
fi

if [ -f .env.example ] && [ ! -f .env ]; then
  cp .env.example .env
fi

if php artisan --version >/dev/null 2>&1; then
  if ! grep -q "^APP_KEY=base64:" .env 2>/dev/null; then
    php artisan key:generate --force || true
  fi

  php artisan migrate --force || true
  php artisan serve --host=0.0.0.0 --port=8000
fi

exec tail -f /dev/null
