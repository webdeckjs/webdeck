export type VirtualDeck = {
  PRODUCT_NAME: string;
  NUM_KEYS: number;
  KEY_COLUMNS: number;
  KEY_ROWS: number;
  close(): void;
};

const STORAGE_KEY = "virtualdeck";

const close = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const config: Record<string, VirtualDeck> = {
  default: {
    PRODUCT_NAME: "VirtualDeck 2x3",
    NUM_KEYS: 6,
    KEY_COLUMNS: 3,
    KEY_ROWS: 2,
    close,
  },
};

export const getVirtualDeck = (): VirtualDeck[] => {
  const virtualdeck = localStorage.getItem(STORAGE_KEY);
  if (virtualdeck) {
    return [{ ...JSON.parse(virtualdeck), close }];
  }
  return [];
};

export const requestVirtualDecks = (
  key: keyof typeof config = "default"
): VirtualDeck[] => {
  const virtualdeck = config[key];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(virtualdeck));
  return [config[key]];
};
