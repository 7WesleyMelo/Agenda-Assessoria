#!/bin/sh
set -eu

if [ ! -f artisan ]; then
  echo "Projeto Laravel ainda nao foi inicializado em /aplicacao/backend."
  echo "Container da API mantido ativo para o bootstrap posterior."
  exec tail -f /dev/null
fi

checksum_atual() {
  cksum composer.lock | awk '{ print $1 ":" $2 }'
}

instalar_dependencias() {
  echo "Instalando dependencias do backend..."
  composer install --no-interaction --prefer-dist
  checksum_atual > vendor/.composer-lock.checksum
}

if [ -f composer.json ] && [ -f composer.lock ]; then
  if [ ! -d vendor ] || [ ! -f vendor/.composer-lock.checksum ]; then
    instalar_dependencias
  elif [ "$(cat vendor/.composer-lock.checksum)" != "$(checksum_atual)" ]; then
    instalar_dependencias
  fi
fi

if [ -f .env.example ] && [ ! -f .env ]; then
  cp .env.example .env
fi

if php artisan --version >/dev/null 2>&1; then
  echo "Backend Laravel detectado. Iniciando bootstrap do ambiente..."

  if ! grep -q "^APP_KEY=base64:" .env 2>/dev/null; then
    echo "Gerando APP_KEY..."
    php artisan key:generate --force || true
  fi

  if ! grep -q "^JWT_SECRET=.\+" .env 2>/dev/null; then
    echo "Gerando JWT_SECRET..."
    printf '\nJWT_SECRET=%s\n' "$(php -r "echo bin2hex(random_bytes(32));")" >> .env
  fi

  echo "Executando migracoes do banco..."
  php artisan migrate --force

  if [ "${AUTO_SEED:-true}" = "true" ]; then
    echo "Semeando usuario administrador padrao e usuarios de demonstracao..."
    php artisan db:seed --class=UsuarioAdministradorSeeder --force
  else
    echo "AUTO_SEED desativado. Seed automatica ignorada."
  fi

  echo "Iniciando servidor Laravel na porta 8000..."
  php artisan serve --host=0.0.0.0 --port=8000
fi

exec tail -f /dev/null
