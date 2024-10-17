import { useEffect, useState } from "react";

export const EXTENSION_ID = "njlliemmhglnlfelmmoljccgpdipigff";

export const useExtension = () => {
  const [installed, setInstalled] = useState<null | boolean>(null);
  const [metadata, setMetaData] = useState({});

  const getExtenison = () => {
    if (window.chrome?.runtime) {
      chrome.runtime.sendMessage(
        EXTENSION_ID,
        { type: "health" },
        (response) => {
          setInstalled(true);
          setMetaData(response);
        }
      );
    } else {
      setInstalled(false);
      setMetaData({});
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

  const setData = async (data: unknown) => {
    return new Promise((resolve) => {
      if (window.chrome?.runtime) {
        chrome.runtime.sendMessage(
          EXTENSION_ID,
          { type: "set.data", data: { data } },
          (resp) => {
            resolve(resp);
          }
        );
      } else {
        resolve(false);
      }
    });
  };

  const getData = async () => {
    return new Promise((resolve) => {
      if (window.chrome?.runtime) {
        chrome.runtime.sendMessage(
          EXTENSION_ID,
          { type: "get.data", keys: "data" },
          (r) => {
            resolve(r);
          }
        );
      } else {
        resolve(false);
      }
    });
  };

  const syncData = (event: MessageEvent<unknown>) => {
    console.log("reactor hawwow", event);
  };

  useEffect(() => {
    getExtenison();
  }, []);

  useEffect(() => {
    window.addEventListener("message", syncData, false);
    return () => {
      window.removeEventListener("message", syncData, false);
    };
  }, []);

  return { installed, getExtenison, fetch, metadata, setData, getData };
};
