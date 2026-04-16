FROM php:8.3-cli-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        curl \
        unzip \
        libpq-dev \
        libzip-dev \
        libicu-dev \
    && docker-php-ext-install \
        pdo_pgsql \
        pgsql \
        zip \
        intl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /aplicacao/backend

COPY infra/scripts/backend/entrada.sh /usr/local/bin/entrada-backend

RUN chmod +x /usr/local/bin/entrada-backend

CMD ["entrada-backend"]
