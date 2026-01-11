// src/global.d.ts
export { };

type GtagCommand = 'consent' | 'config' | 'event' | 'js';

interface GtagConsentParams {
  analytics_storage?: 'granted' | 'denied';
  ad_storage?: 'granted' | 'denied';
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: GtagCommand,
      target: string | Date,
      params?: GtagConsentParams | Record<string, unknown>
    ) => void;
  }
}
