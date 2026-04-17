const protocolo = globalThis.location?.protocol ?? 'http:';
const hostname = globalThis.location?.hostname ?? '127.0.0.1';
const portaApi = '8000';

export const apiConfig = {
  urlBase: `${protocolo}//${hostname}:${portaApi}/api/v1`,
} as const;
