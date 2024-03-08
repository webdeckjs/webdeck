import {
  StreamDeckWeb,
  getStreamDecks,
  requestStreamDecks,
} from "@elgato-stream-deck/webhid";

// FOR NOW we hardcoding to only steamdeck
// TODO: expands this to modular based drivers

export type PhysicalDeck = StreamDeckWeb & {
  drawKeys: (fn: (key: number) => void) => void;
};

const close = async () => {
  //TODO: temporary solution, untill forget is added
  //@ISSUE: https://github.com/Julusian/node-elgato-stream-deck/issues/79
  const [deck] = await navigator.hid.getDevices();
  try {
    await deck.forget();
    await deck.close();
  } catch (e) {
    /*suppress error */
  }
};

const drawKeys = (numKeys: number, callback: (index: number) => void) => {
  Array.from({ length: numKeys || 0 }).forEach((_, index) => {
    callback(index);
  });
};

export const getPhysicalDeck = async () => {
  const [deck] = await getStreamDecks();
  if (deck) {
    deck.close = close;
    (deck as PhysicalDeck).drawKeys = (callback) =>
      drawKeys(deck.NUM_KEYS, callback);
    return [deck as PhysicalDeck];
  }
  return [];
};

export const requestPhysicalDeck = async () => {
  const [deck] = await requestStreamDecks();
  if (deck) {
    deck.close = close;
    (deck as PhysicalDeck).drawKeys = (callback) =>
      drawKeys(deck.NUM_KEYS, callback);
    return [deck as PhysicalDeck];
  }
  return [];
};
