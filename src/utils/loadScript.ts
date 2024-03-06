import { RemotePromise } from "../types/RemotePromise";

const URL_CATCHE = new Set<string>();

export const loadScript = async (url: string, name: string) => {
  return new Promise<RemotePromise>((resolve) => {
    if (!url) resolve({ loaded: false, url, name });
    if (URL_CATCHE.has(url)) {
      resolve({ loaded: true, url, name });
      return;
    }
    const element = document.createElement("script");
    element.src = url;
    element.type = "text/javascript";
    element.async = true;
    element.defer = true;
    element.onload = () => {
      URL_CATCHE.add(url);
      resolve({ loaded: true, url, name });
    };
    element.onerror = (e) => resolve({ loaded: false, url, name, e });

    document.head.appendChild(element);
  });
};
