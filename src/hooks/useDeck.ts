import { useCallback, useEffect, useState } from "react";
import {
  VirtualDeck,
  getVirtualDeck,
  requestVirtualDecks,
} from "../utils/virtualDeck";
import { usePlugins } from "./usePlugins";
import { useProfiles } from "./useProfiles";
import { drawKey } from "../utils/drawKey";
import {
  PhysicalDeck,
  getPhysicalDeck,
  requestPhysicalDeck,
} from "../utils/physicalDeck";

export const useDeck = (
  profiles: ReturnType<typeof useProfiles>,
  plugins: ReturnType<typeof usePlugins>
) => {
  const [editMode, setEditMode] = useState(true);
  const [selectedKey, setSelectedKey] = useState<number | undefined>(0);
  const [virtualDeck, setVirtualDeck] = useState<VirtualDeck | undefined>();
  const [physicalDeck, setPhysicalDeck] = useState<PhysicalDeck | undefined>();
  const current = physicalDeck || virtualDeck;

  const onMouseDown = (keyIndex: number) => {
    // if (streamDeck) {
    //   // streamDeck!.fillKeyColor(keyIndex, 255, 0, 0);
    // } else {
    //   console.log("pressed key", keyIndex);
    // }
    console.log("pressed key", keyIndex);
  };

  const onMouseUp = (keyIndex: number) => {
    const key = profiles.profile.keys[keyIndex];
    if (key?.plugin) {
      const module = plugins.getModule(key.plugin);
      try {
        module!.onPress!({
          ...key,
          keyIndex,
          setIcon: (icon: string) => profiles.setIcon(keyIndex, icon),
        });
      } catch (e) {
        console.warn(
          `Webdeck: Failed to execute ${key.plugin}. Have you added and exported onPress() functions in you plugin?`,
          e
        );
      }
    }
  };

  const tryGetPhysicalDeck = useCallback(async () => {
    const [deck] = await requestPhysicalDeck();
    if (deck) {
      setPhysicalDeck(deck);
    } else {
      console.error("Couldn’t get a Physical Deck");
    }
  }, []);

  const tryCreateVirtualDeck = useCallback(() => {
    const [deck] = requestVirtualDecks();
    if (deck) {
      setVirtualDeck(deck);
    } else {
      console.error("Couldn’t get a Virtual Deck");
    }
  }, []);

  const disconect = useCallback(async () => {
    if (physicalDeck) {
      physicalDeck.close();
      setPhysicalDeck(undefined);
    } else if (virtualDeck) {
      virtualDeck.close();
      setVirtualDeck(undefined);
    }
  }, [physicalDeck, virtualDeck]);

  useEffect(() => {
    const execute = async () => {
      const [pdeck] = await getPhysicalDeck();
      if (pdeck) {
        setPhysicalDeck(pdeck);
      } else {
        const [vdeck] = getVirtualDeck();
        if (vdeck) {
          setVirtualDeck(vdeck);
        }
      }
    };
    execute();
  }, []);

  useEffect(() => {
    if (physicalDeck) {
      physicalDeck.on("down", onMouseDown);
      physicalDeck.on("up", onMouseUp);
      physicalDeck.drawKeys((key) =>
        drawKey(physicalDeck, key, profiles.profile, plugins)
      );
    }

    return () => {
      physicalDeck?.off("down", onMouseDown);
      physicalDeck?.off("up", onMouseUp);
    };
  }, [physicalDeck, virtualDeck, profiles.profile.keys]);

  return {
    isVirtual: !!virtualDeck,
    isPhysical: !!physicalDeck,
    initalised: !!current,
    current,
    selectedKey,
    editMode,

    onMouseDown,
    onMouseUp,
    setSelectedKey,

    disconect,

    tryGetPhysicalDeck,
    tryCreateVirtualDeck,
    setEditMode,
  };
};
