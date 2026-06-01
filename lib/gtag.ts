export const GA_MEASUREMENT_ID = "G-7YKMYN32Q6";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string) => {
  if (typeof window.gtag !== "function") return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

type EventParams = Record<string, string | number | boolean | null | undefined>;

export const event = (action: string, params: EventParams = {}) => {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", action, params);
};

export const trackWhatsAppClick = ({
  source,
  phone,
}: {
  source: string;
  phone?: string;
}) => {
  event("whatsapp_click", {
    event_category: "engagement",
    event_label: source,
    contact_method: "whatsapp",
    phone,
  });
};

export const trackContactFormSubmit = ({
  source,
  serviceType,
}: {
  source: string;
  serviceType?: string;
}) => {
  event("generate_lead", {
    event_category: "lead",
    event_label: source,
    contact_method: "form",
    service_type: serviceType,
  });
};
