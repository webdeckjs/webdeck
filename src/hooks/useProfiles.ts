import { useState } from "react";

export type Config = Record<string | number | symbol, unknown>;

export type Key = {
  plugin: string;
  config: Config;
  icon: string;
  title: string;
  loading: boolean;
};

type Profiles = {
  [key: string]: Profile;
};

export type Profile = {
  keys: {
    [key: string]: Key;
  };
};

const STORAGE_KEY = "profiles";

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

const getProfileName = () => {
  return "default";
};

export const useProfiles = () => {
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

  const setPlugin = (name: string, keyIndex: number) => {
    const config = profile.keys[keyIndex]?.config;
    if (config && Object.values(config).length > 0) {
      const resp = confirm(
        "You have previus configured a plugin in this slot, this action will replace and remove that config. This action is not reversable. Are you sure?"
      );
      if (resp === false) return false;
    }
    updateProfile({
      keys: {
        ...profile.keys,
        [keyIndex]: name
          ? {
              plugin: name,
              config: {}, //reset config for next
              icon: "",
              title: "",
              loading: false,
            }
          : undefined,
      },
    });
  };

  const removePlugin = (name: string) => {
    updateProfile({
      keys: {
        ...Object.keys(profile.keys).reduce((prev, key) => {
          const config = profile.keys[key];
          const match = name === config.plugin;
          return {
            ...prev,
            [key]: match ? undefined : config,
          };
        }, {}),
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

  const promptRemoveProfile = () => {
    const resp = confirm(
      "Are you sure you want to delete this profile? These changes are inreversable."
    );
    if (resp) {
      setProfiles((old) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [profileName]: _, ...rest } = old;
        setProfileName("default");
        return { ...rest };
      });
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

  const getConfig = async (key: number) => {
    const _profiles = (await getProfiles()) as Profiles;
    return _profiles[profileName].keys[key].config;
  };

  const setIcon = (key: number, icon: string) => {
    const next = {
      ...profile,
      keys: {
        ...profile.keys,
        [key]: {
          ...profile.keys[key],
          icon,
        },
      },
    };
    updateProfile(next);
  };

  const setTitle = (key: number, title: string) => {
    const next = {
      ...profile,
      keys: {
        ...profile.keys,
        [key]: {
          ...profile.keys[key],
          title,
        },
      },
    };
    updateProfile(next);
  };

  const setLoading = (key: number, loading: boolean) => {
    const next = {
      ...profile,
      keys: {
        ...profile.keys,
        [key]: {
          ...profile.keys[key],
          loading,
        },
      },
    };
    updateProfile(next);
  };

  return {
    profiles,
    profile,
    profileName,

    setProfileName,
    setPlugin,
    removePlugin,
    updateProfile,
    addProfile,
    promptAddProfile,
    promptRemoveProfile,
    promptExportProfile,
    setConfig,
    getConfig,
    setIcon,
    setTitle,
    setLoading,
  };
};
