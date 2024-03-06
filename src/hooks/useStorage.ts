import { useState } from "react";

export const useStorage = <T>(storageKey: string, initType = []) => {
  const get = (): T => {
    const items = localStorage.getItem(storageKey);
    if (items) {
      // array,
      if (initType.length !== undefined) {
        // @ts-expect-error dynamic-values
        return [...JSON.parse(items)];
      }
      return { ...JSON.parse(items) };
    }
    // @ts-expect-error dynamic-values
    return initType;
  };

  const set = (data: T) => {
    setItems(data); // TODO: double check RLC on this.
    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
  };

  const [items, setItems] = useState<T>(get());
  return [items, set] as const;
};
