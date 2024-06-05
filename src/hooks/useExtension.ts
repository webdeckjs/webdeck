import { useEffect, useState } from "react";

export const EXTENSION_ID = "njlliemmhglnlfelmmoljccgpdipigff";

export const useExtension = () => {
  const [installed, setInstalled] = useState<null | boolean>(null);
  const [data, setData] = useState({});

  const getExtenison = () => {
    if (window.chrome?.runtime) {
      chrome.runtime.sendMessage(
        EXTENSION_ID,
        { type: "health" },
        (response) => {
          setInstalled(true);
          setData(response);
        }
      );
    } else {
      setInstalled(false);
      setData({});
    }
  };

  const fetch = async (
    url: string,
    {
      method,
      body,
      options,
    }: {
      method?: string;
      body?: string;
      options?: Record<string, unknown>;
    } = { method: "get" }
  ) => {
    return new Promise((resolve) => {
      if (window.chrome?.runtime) {
        chrome?.runtime?.sendMessage(
          EXTENSION_ID,
          { type: "fetch", method, url, body, ...options },
          (response) => resolve(response)
        );
      } else {
        resolve({ error: true, e: "no_extension" });
      }
    });
  };

  useEffect(() => {
    getExtenison();
  }, []);

  return { installed, getExtenison, fetch, data };
};
