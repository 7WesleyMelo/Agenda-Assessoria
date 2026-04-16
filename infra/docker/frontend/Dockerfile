FROM node:22-alpine

RUN apk add --no-cache \
    bash \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont

ENV CHROME_BIN=/usr/bin/chromium-browser

WORKDIR /aplicacao/frontend

COPY infra/scripts/frontend/entrada.sh /usr/local/bin/entrada-frontend

RUN chmod +x /usr/local/bin/entrada-frontend

CMD ["entrada-frontend"]
