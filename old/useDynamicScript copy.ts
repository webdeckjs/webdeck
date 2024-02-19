import { useEffect, useState } from "react";

const urlCache = new Set();

export const useDynamicScript = (url: string) => {
  const [ready, setReady] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    // postfix remote entry file
    const _url = url + "remoteEntry.js";

    if (urlCache.has(_url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);

    const element = document.createElement("script");

    element.src = _url;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
      urlCache.add(_url);
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
    };

    document.head.appendChild(element);

    return () => {
      // INVestigate why this is dismounted and deleted.
      // urlCache.delete(_url);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    errorLoading,
    ready,
  };
};
