import { init, loadRemote } from "@module-federation/runtime/.";
import { FC, useEffect, useState } from "react";
import queryString from "query-string";

export type Plugin = {
  name: string;
  creator: string;
  versions: string[];
  url: string;
};

export type RemotePromise = {
  loaded: boolean;
  url: string;
  name: string;
  e?: unknown;
};

type ModuleOnPress = {
  config: Record<string | number, unknown>;
  keyIndex: number;
};

export type Module = {
  default: FC;
  init: () => void;
  onPress: (params: ModuleOnPress) => void;
};

const PLUGIN_SCOPE = "./Plugin";
const URL_CATCHE = new Set<string>();
const STORAGE_KEY = "plugins";
const MODULE_CATCHE = new Map<string, Module>();

const getPlugins = () => {
  const plugins = localStorage.getItem(STORAGE_KEY);
  if (plugins) {
    return [...JSON.parse(plugins)];
  }
  return [];
};

const storePlugins = (plugins: Plugin[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plugins));
};

export const usePlugins = () => {
  const [initalised, setInitalised] = useState(false);
  const [plugins, setPlugins] = useState<Plugin[]>(getPlugins());

  const addPlugin = (obj: Plugin) => {
    setPlugins((old) => {
      const next = [...old, obj];
      storePlugins(next);
      return next;
    });
  };

  const promptAddPlugin = async () => {
    const input = prompt(
      "Add url to plugin. List of plugins: https://github.com/search?q=topic:webdeck-plugin"
    );
    if (input) {
      let name, homepage, creator;
      try {
        if (input.includes("github.com")) {
          // the provided a github.com link
          const url = input.replace(
            "https://github.com/",
            "https://api.github.com/repos/"
          );
          const resp = await fetch(url);
          const data = await resp.json();
          if (data && data.has_pages) {
            homepage = data.homepage;
            [creator, name] = data.full_name.split("/");
            console.log({ homepage, name });
            addPlugin({ name, creator, versions: ["1.0.0"], url: homepage });
          } else {
            throw new Error("");
          }
        } else if (input.includes("remoteEntry.js")) {
          const [_url, query] = input.split("?");
          const { name, creator, v } = queryString.parse(query);
          if (name) {
            addPlugin({
              name: name as string,
              creator: creator as string,
              versions: [v as string],
              url: _url.replace("remoteEntry.js", ""),
            });
          } else throw new Error("");
        } else {
          console.log("input", input);
          // the provided some other link
          throw new Error("");
        }
      } catch (e) {
        alert("Cound not add plugin, invalid url or repo provided.");
        console.error(e);
      }
    }
  };

  const promptRemovePlugin = (name: string, callback: () => void) => {
    const resp = confirm(
      "Are you sure you want to remove this plugin and everywhere where it was used? This action is not reversable."
    );
    if (resp) {
      setPlugins((_plugins) => {
        const next = _plugins.filter((plugin) => plugin.name !== name);
        storePlugins(next);
        return next;
      });
      callback();
    }
  };

  const loadScript = async (url: string, name: string) => {
    return new Promise<RemotePromise>((resolve) => {
      if (!url) resolve({ loaded: false, url, name });
      if (URL_CATCHE.has(url)) {
        resolve({ loaded: true, url, name });
        return;
      }
      const element = document.createElement("script");
      element.src = url;
      element.type = "text/javascript";
      element.async = true;
      element.onload = () => {
        URL_CATCHE.add(url);
        resolve({ loaded: true, url, name });
      };
      element.onerror = (e) => resolve({ loaded: false, url, name, e });

      document.head.appendChild(element);
    });
  };

  const loadModule = async (name: string) => {
    let module;
    const moduleKey = `${PLUGIN_SCOPE}-${name}`;
    if (MODULE_CATCHE.has(moduleKey)) {
      module = MODULE_CATCHE.get(moduleKey);
      // console.log({ 1: true, module, name });
    } else {
      // console.log("begin loading", name);
      module = (await loadRemote(
        `${name.replaceAll("-", "_")}/${PLUGIN_SCOPE.slice(2)}`
      )) as Module;
      // console.log("loaded", name);
      MODULE_CATCHE.set(moduleKey, module);
    }
    return module;
  };

  const getModule = (name: string) => {
    const moduleKey = `${PLUGIN_SCOPE}-${name?.replaceAll("-", "_")}`;
    return MODULE_CATCHE.get(moduleKey);
  };

  const getModules = () => {
    return MODULE_CATCHE;
  };

  // initalise all plugins
  useEffect(() => {
    setInitalised(false);
    // module federation config
    const config = {
      name: "webdeck",
      remotes: plugins.map((plugin) => {
        return {
          name: plugin.name.replaceAll("-", "_"),
          entry: `${plugin.url}remoteEntry.js`,
        };
      }),
    };

    // configure all plugins
    init(config);

    // once plugin are configured, load them
    const remotePromises: Promise<RemotePromise>[] = [];
    config.remotes.forEach((remote) => {
      remotePromises.push(loadScript(remote.entry, remote.name));
    });

    Promise.all(remotePromises).then((resolvedRemotePromises) => {
      const remotesById = resolvedRemotePromises.reduce((prev, current) => {
        if (!current.loaded) {
          console.error(
            `Webdeck: Could not load script "${current.name}" at ${current.url}`,
            current.e
          );
        }
        return {
          ...prev,
          [current.name]: current,
        };
      }, {} as { [key: string]: RemotePromise });

      // load modules once script all loaded.
      const modules: Promise<unknown>[] = [];
      config.remotes.map((remote) => {
        if (!remotesById?.[remote.name]) {
          console.error(
            `Webdeck: Cant initalise module "${name}" as script was not loaded succesfully!`
          );
          return module;
        }
        modules.push(loadModule(remote.name));
      });

      Promise.all(modules).then((resp) => {
        console.log("!!! Modules Loaded", resp);
        console.log("MODULE_CATCHE", getModules());
        setInitalised(true);
      });
    });
  }, [plugins]);

  const pluginsById = plugins.reduce(
    (prev, current) => ({ ...prev, [current.name]: current }),
    {} as Record<string, Plugin>
  );

  return {
    initalised,
    plugins,
    pluginsById,
    loadScript,
    setPlugins,
    addPlugin,
    promptAddPlugin,
    promptRemovePlugin,
    loadModule,
    getModule,
    getModules,
  };
};
