import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  VirtualDeck,
  getVirtualDeck,
  requestVirtualDecks,
} from "../utils/virtualDeck";
import { usePlugins } from "./usePlugins";
import { useProfiles } from "./useProfiles";
import {
  PhysicalDeck,
  getPhysicalDeck,
  requestPhysicalDeck,
} from "../utils/physicalDeck";
import { useDrawKey } from "./useDrawKey";

type Initer = Record<string, { plugin: string; destructor: Function }>;

export const useDeck = (
  profiles: ReturnType<typeof useProfiles>,
  plugins: ReturnType<typeof usePlugins>
) => {
  const [editMode, setEditMode] = useState(true);
  const [selectedKey, setSelectedKey] = useState<number | undefined>(0);
  const [virtualDeck, setVirtualDeck] = useState<VirtualDeck | undefined>();
  const [physicalDeck, setPhysicalDeck] = useState<PhysicalDeck | undefined>();
  const [inited, setInited] = useState<Initer>({});
  const { getContext } = useDrawKey();

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
      const module = plugins.modules[key.plugin]?.module;
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

  const drawKey = (
    keyIndex: number,
    callback: ({
      canvas,
      ctx,
    }: {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
    }) => void
  ) => {
    const canvas = document.createElement("canvas");
    canvas.width = current?.ICON_SIZE || 72;
    canvas.height = current?.ICON_SIZE || 72;
    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    callback({ canvas, ctx });

    if (physicalDeck) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height, {
        colorSpace: "srgb",
      }).data;
      physicalDeck?.fillKeyBuffer(keyIndex, Buffer.from(data), {
        format: "rgba",
      });
    }

    console.log("doc", document.getElementById(`keyid-${keyIndex}`));

    document
      .getElementById(`keyid-${keyIndex}`)
      ?.setAttribute("src", canvas.toDataURL());
  };

  const tryGetPhysicalDeck = useCallback(async () => {
    const [deck] = await requestPhysicalDeck();
    if (deck) {
      setPhysicalDeck(deck);
    } else {
      console.error("Couldn't get a Physical Deck");
    }
  }, []);

  const tryCreateVirtualDeck = useCallback(() => {
    const [deck] = requestVirtualDecks();
    if (deck) {
      setVirtualDeck(deck);
    } else {
      console.error("Couldn't get a Virtual Deck");
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

  // @needs optimisations
  useEffect(() => {
    if (physicalDeck) {
      physicalDeck.on("down", onMouseDown);
      physicalDeck.on("up", onMouseUp);
      // draw keys once to get updated

      physicalDeck?.drawKeys((key) => {
        // console.log(
        //   "plugins.manifests[profiles.profile.keys[key]?.plugin]",
        //   plugins.manifests[profiles.profile.keys[key]?.plugin]
        // );
        if (
          plugins.manifests[profiles.profile.keys[key]?.plugin]?.bespoke ===
          true
        ) {
          // bespoke item
          console.log("bespoke");
        } else {
          const context = getContext(
            key,
            physicalDeck,
            profiles,
            plugins
          ).getData();
          physicalDeck?.fillKeyBuffer(key, Buffer.from(context.data), {
            format: "rgba",
          });
        }
      });
    }

    return () => {
      physicalDeck?.off("down", onMouseDown);
      physicalDeck?.off("up", onMouseUp);
    };
  }, [plugins.initalised, plugins, profiles]);

  // @needs optimisations
  useEffect(() => {
    if (plugins.initalised) {
      const nextInited = {} as Initer;
      Object.keys(profiles.profile.keys).map((key) => {
        const keyConf = profiles.profile.keys[key];
        const initKeyConf = inited[key];
        const NOD = () => console.log("@destructor", keyConf, key);
        const module = plugins.modules?.[keyConf?.plugin]?.module;
        const props = {
          drawKey: (callback) => drawKey(parseInt(key), callback),
          config: keyConf,
        };

        if (initKeyConf) {
          // theres something here already
          if (initKeyConf.plugin === keyConf?.plugin) {
            // plugin has not changed
            nextInited[key] = initKeyConf;
          } else {
            // plugin has changed, destruct and reinitalised new code
            initKeyConf.destructor?.();
            if (keyConf) {
              nextInited[key] = {
                plugin: keyConf.plugin,
                destructor: module?.init?.(props) || NOD,
              };
            }
          }
        } else {
          // no prev initaliation, if we have a value we should initalised
          if (keyConf) {
            nextInited[key] = {
              plugin: keyConf.plugin,
              destructor: module?.init?.(props) || NOD,
            };
          }
        }
      });

      console.log({ nextInited });

      setInited(nextInited);
    }
  }, [plugins.initalised, profiles.profile.keys]);

  return {
    isVirtual: !!virtualDeck,
    isPhysical: !!physicalDeck,
    initalised: !!current,
    physicalDeck,
    virtualDeck,
    current,
    selectedKey,
    editMode,
    inited,

    onMouseDown,
    onMouseUp,
    setSelectedKey,

    disconect,

    tryGetPhysicalDeck,
    tryCreateVirtualDeck,
    setEditMode,
  };
};
