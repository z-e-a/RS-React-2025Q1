/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_PREFIX: string;
  readonly VITE_PAGITAOR_PORTION_SIZE: number;
  readonly VITE_PAGITAOR_PAGE_SIZE: number;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
