import { useEffect, useState } from "react";
import { Module, ModuleManifest } from "../types/Module";
import { ModulesResolution, initalise } from "../utils/initalise";
import { Plugin } from "../types/Plugin";
import { useStorage } from "./useStorage";
import { fetchPlugin } from "../utils/fetchPlugin";

const PLUGIN_SCOPE = "./Plugin";
const STORAGE_KEY_PLUGINS = "plugins";
const STORAGE_KEY_CONFIG = "manifest";
const MODULE_CATCHE = new Map<string, Module>();

export const usePlugins = () => {
  const [plugins, setPlugins] = useStorage<Plugin[]>(STORAGE_KEY_PLUGINS);
  const [manifests, setManifests] = useStorage<Record<string, ModuleManifest>>(
    STORAGE_KEY_CONFIG,
    {} as never[]
  );
  const [initalised, setInitalised] = useState(false);
  const [modules, setModules] = useState<ModulesResolution>({});
  const pluginsById = plugins.reduce(
    (prev, current) => ({ ...prev, [current.name]: current }),
    {} as Record<string, Plugin>
  );

  const addPlugin = (plugin: Plugin) => {
    setPlugins([...plugins, plugin]);
  };

  const promptAddPlugin = async () => {
    const input = prompt(
      "Add url to plugin. List of plugins: https://github.com/search?q=topic:webdeck-plugin"
    );
    if (input) {
      const plugin = await fetchPlugin(input);
      if (plugin) addPlugin(plugin);
    }
  };

  const promptRemovePlugin = (name: string, callback: () => void) => {
    const resp = confirm(
      "Are you sure you want to remove this plugin and everywhere where it was used? This action is not reversable."
    );
    if (resp) {
      setPlugins(plugins.filter((plugin) => plugin.enum !== name));
      callback();
    }
  };

  // const getModule = (name: string) => {
  //   const moduleKey = `${PLUGIN_SCOPE}-${name}`;
  //   return MODULE_CATCHE.get(moduleKey);
  // };

  // const getModules = () => {
  //   return MODULE_CATCHE;
  // };

  // initalise plugins
  useEffect(() => {
    console.log("non changed right?");
    setInitalised(false);
    // module federation config
    const config = {
      name: "webdeck",
      remotes: plugins.map((plugin) => {
        return {
          name: plugin.enum,
          entry: `${plugin.url}remoteEntry.js`,
        };
      }),
    };
    // configure all plugins
    initalise(config, PLUGIN_SCOPE, MODULE_CATCHE).then((modules) => {
      setModules(modules);
      setInitalised(true);
      setManifests(
        Object.keys(modules).reduce(
          (prev, key) => ({
            ...prev,
            [key]: modules[key]?.module?.manifest || {},
          }),
          {}
        )
      );
    });
  }, [plugins]);

  return {
    initalised,
    plugins,
    pluginsById,
    modules,
    manifests,
    setPlugins,
    addPlugin,
    promptAddPlugin,
    promptRemovePlugin,
  };
};
