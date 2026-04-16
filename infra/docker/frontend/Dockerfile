FROM node:22-alpine

RUN apk add --no-cache bash

WORKDIR /aplicacao/frontend

COPY infra/scripts/frontend/entrada.sh /usr/local/bin/entrada-frontend

RUN chmod +x /usr/local/bin/entrada-frontend

CMD ["entrada-frontend"]
