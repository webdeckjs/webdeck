import { useCallback, useEffect, useState } from "react";
import {
  StreamDeckWeb,
  getStreamDecks,
  requestStreamDecks,
} from "@elgato-stream-deck/webhid";
import {
  VirtualDeck,
  getVirtualDeck,
  requestVirtualDecks,
} from "../utils/virtualDeck";
import { usePlugins } from "./usePlugins";
import { useProfiles } from "./useProfiles";

export const useDeck = (
  profiles: ReturnType<typeof useProfiles>,
  plugins: ReturnType<typeof usePlugins>
) => {
  const [editMode, setEditMode] = useState(true);
  const [selectedKey, setSelectedKey] = useState<number | undefined>(0);
  const [virtualDeck, setVirtualDeck] = useState<VirtualDeck | null>();
  const [streamDeck, setStreamDeck] = useState<StreamDeckWeb | null>();
  const [pressedMap, setPressedMap] = useState<{ [key: number]: boolean }>({});

  const onMouseDown = (keyIndex: number) => {
    if (streamDeck) {
      streamDeck!.fillKeyColor(keyIndex, 255, 0, 0);
    } else {
      // console.log("pressed key", keyIndex);
    }
  };

  const onMouseUp = (keyIndex: number) => {
    if (editMode) {
      if (streamDeck) {
        streamDeck!.fillKeyColor(keyIndex, 0, 0, 0);
      } else {
        // console.log("pressed key", keyIndex);
      }
    } else {
      const key = profiles.profile.keys[keyIndex];
      if (key?.plugin) {
        const module = plugins.getModule(key.plugin);
        try {
          module?.onPress({ ...key, keyIndex });
        } catch (e) {
          console.warn(
            `Webdeck: Failed to execute ${key.plugin}. Have you added and exported onPress() functions in you plugin?`,
            e
          );
        }
      }
    }
  };

  useEffect(() => {
    const execute = async () => {
      const [_streamDeck] = await getStreamDecks();
      if (_streamDeck) {
        setStreamDeck(_streamDeck);
        return;
      } else {
        const [_virtualdeck] = getVirtualDeck();
        if (_virtualdeck) {
          setVirtualDeck(_virtualdeck);
        }
      }
    };
    execute();
  }, []);

  const tryGetStreamDeck = useCallback(async () => {
    const [_streamDeck] = await requestStreamDecks();
    if (!_streamDeck) {
      console.error("Couldn’t get a Stream Deck");
    } else {
      setStreamDeck(_streamDeck);
    }
  }, []);

  const tryCreateVirtualDeck = useCallback(() => {
    const [_virtualdeck] = requestVirtualDecks();
    if (!_virtualdeck) {
      console.error("Couldn’t get a Virtual Deck");
    } else {
      setVirtualDeck(_virtualdeck);
    }
    console.log(_virtualdeck);
  }, []);

  const disconect = useCallback(async () => {
    if (streamDeck) {
      //TODO: temporary solution, untill forget is added
      //@ISSUE: https://github.com/Julusian/node-elgato-stream-deck/issues/79
      const [deck] = await navigator.hid.getDevices();
      try {
        await deck.forget();
        await deck.close();
      } catch (e) {
        /*suppress error */
      }
      setStreamDeck(null);
    } else if (virtualDeck) {
      virtualDeck.close();
      setVirtualDeck(null);
    }
  }, [streamDeck, virtualDeck]);

  useEffect(() => {
    const _onPressDown = (keyIndex: number) => {
      setPressedMap((old) => ({
        ...old,
        [keyIndex]: true,
      }));
    };

    const _onPressUp = (keyIndex: number) => {
      setPressedMap((old) => ({
        ...old,
        [keyIndex]: false,
      }));

      // callback from plugin
      const key = profiles.profile.keys[keyIndex];
      if (key?.plugin) {
        const module = plugins.getModule(key.plugin);
        try {
          module?.onPress({ ...key, keyIndex });
        } catch (e) {
          console.warn(
            `Webdeck: Failed to execute ${key.plugin}. Have you added and exported onPress() functions in you plugin?`,
            e
          );
        }
      }
    };

    if (streamDeck) {
      streamDeck.on("down", _onPressDown);
      streamDeck.on("up", _onPressUp);
    }
    return () => {
      streamDeck?.off("down", _onPressDown);
      streamDeck?.off("up", _onPressUp);
    };
  }, [streamDeck, profiles.profile.keys]);

  const current = streamDeck || virtualDeck;

  return {
    current,
    initalised: !!current,
    onMouseDown,
    onMouseUp,
    selectedKey,
    setSelectedKey,
    disconect,

    // virtual deck stuff
    tryCreateVirtualDeck,
    isVirtual: !!virtualDeck,

    // steam deck stuff
    tryGetStreamDeck,
    pressedMap,

    // preview mode
    editMode,
    setEditMode,
  };
};

// const addEvents = (_streamDeck: StreamDeckWeb) => {
//   _streamDeck.on("down", (keyIndex) => {
//     setPressedMap((old) => ({
//       ...old,
//       [keyIndex]: true,
//     }));
//   });
//   _streamDeck.on("up", (keyIndex) => {
//     setPressedMap((old) => ({
//       ...old,
//       [keyIndex]: false,
//     }));
//     console.log(onPressMap);
//     onPressMap[keyIndex]?.();
//   });
// };

// useEffect(() => {}, []);
