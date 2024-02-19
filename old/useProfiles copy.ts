import { loadRemote } from "@module-federation/runtime/.";
import { FC, useCallback, useEffect, useState } from "react";
import { useDeck } from "./useDeck";

export type Config = Record<string | number | symbol, unknown>;

type Profiles = {
  [key: string]: Profile;
};

export type Profile = {
  keys: {
    [key: string]: {
      plugin: string;
      config: Config;
    };
  };
};

export type Module = {
  default: FC;
  init: () => void;
  onPress: ({ config }: { config: Record<string | number, unknown> }) => void;
};

const PLUGIN_SCOPE = "./Plugin";
const STORAGE_KEY = "profiles";
const MODULE_CATCHE = new Map<string, Module>();

const getProfiles = () => {
  const plugins = localStorage.getItem(STORAGE_KEY);
  if (plugins) {
    return { ...JSON.parse(plugins) };
  }
  return { default: { keys: {} } };
};

const storeProfiles = (profiles: Profiles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
};

// const getProfiles = () => {
//   return { default: { keys: {} } };
// };

const getProfileName = () => {
  return "default";
};

export const useProfiles = (deck: ReturnType<typeof useDeck>) => {
  const [initalised, setInitalised] = useState(false);
  const [profiles, setProfiles] = useState<Profiles>(getProfiles());
  const [profileName, setProfileName] = useState<string>(getProfileName);
  const profile = profiles[profileName];

  const updateProfile = (obj: Profile) => {
    setProfiles((old) => {
      const nextProfiles = {
        ...old,
        [profileName]: {
          ...old[profileName],
          ...obj,
        },
      };
      storeProfiles(nextProfiles);
      return nextProfiles;
    });
  };

  const setPlugin = (name: string) => {
    const keyIndex = deck.selectedKey!;
    if (name) {
      loadModule(name, deck.selectedKey!);
    } else {
      deck.unbindOnPress(keyIndex);
    }
    updateProfile({
      keys: {
        ...profile.keys,
        [keyIndex]: {
          plugin: name,
          config: {}, //reset config for next
        },
      },
    });
  };

  const addProfile = (name: string, obj: Profile = { keys: {} }) => {
    setProfiles((old) => {
      const nextProfiles = {
        ...old,
        [name]: obj,
      };
      storeProfiles(nextProfiles);
      return nextProfiles;
    });
  };

  const promptAddProfile = () => {
    const _name = prompt(
      "What the name of the profile? Using names that already exists, will overwirte you old profile! You can use a pipe (`|`) after the name, to provide the config."
    );
    if (_name) {
      const [name, config] = _name.split("|");
      let parseedConfig;
      try {
        const _p = JSON.parse(config);
        if (_p) {
          parseedConfig = _p;
        }
      } catch (e) {
        console.log("invalid config provided");
      }
      console.log({ name, config });
      addProfile(name, parseedConfig);
      setProfileName(name);
    }
  };

  const promptExportProfile = () => {
    prompt("Profile:", `${profileName}|${JSON.stringify(profile)}`);
  };

  const setConfig = (key: number, config: Config) => {
    const next = {
      ...profile,
      keys: {
        ...profile.keys,
        [key]: {
          ...profile.keys[key],
          config,
        },
      },
    };
    updateProfile(next);
  };

  const loadModule = async (name: string, keyIndex: number) => {
    const moduleKey = `${PLUGIN_SCOPE}-${name}`;
    let module;
    if (MODULE_CATCHE.has(moduleKey)) {
      module = MODULE_CATCHE.get(moduleKey);
    } else {
      module = (await loadRemote(`${name}/${PLUGIN_SCOPE.slice(2)}`)) as Module;
      MODULE_CATCHE.set(moduleKey, module);
      // todo, maybe run initalise script here
    }

    if (module?.onPress) {
      try {
        // console.log("trying to bind", module, keyIndex);
        deck.bindOnPress(module!.onPress, keyIndex, profile.keys[keyIndex]);
        // console.log("binded", keyIndex);
      } catch (e) {
        console.error(
          `Webdeck: unable to initalise plugin correctly ${name}`,
          e
        );
      }
    }

    return module;
  };

  // deck.bindOnPress(() => {}, 0, profile.keys[0].config);
  // console.log(profile.keys[0].config);

  const getModule = (name: string) => {
    const moduleKey = `${PLUGIN_SCOPE}-${name}`;
    return MODULE_CATCHE.get(moduleKey);
  };

  useEffect(() => {
    const module = getModule(profile.keys[deck.selectedKey!].plugin);
    if (module?.onPress) {
      deck.bindOnPress(
        // eslint-disable-next-line @typescript-eslint/ban-types
        module?.onPress as Function,
        deck.selectedKey!,
        profile.keys[deck.selectedKey!].config
      );
    }
  }, [profile.keys[deck.selectedKey!].config]);

  const initalise = () => {
    const modules: Promise<unknown>[] = [];
    Object.keys(profile.keys).forEach((keyIndex) => {
      const { plugin } = profile.keys[keyIndex];
      if (plugin) modules.push(loadModule(plugin, parseInt(keyIndex)));
    });
    Promise.all(modules).then(() => setInitalised(true));
  };

  return {
    initalised,
    profiles,
    profile,
    profileName,

    setProfileName,
    setPlugin,
    updateProfile,
    addProfile,
    promptAddProfile,
    promptExportProfile,
    setConfig,
    loadModule,
    getModule,
    initalise,
  };
};
