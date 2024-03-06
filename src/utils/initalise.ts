import { init } from "@module-federation/runtime/.";
import { RemotePromise } from "../types/RemotePromise";
import { loadScript } from "./loadScript";
import { ModuleResolver, loadModule } from "./loadModule";
import { Module } from "../types/Module";

type Config = {
  name: string;
  remotes: {
    name: string;
    entry: string;
  }[];
};

export type ModulesResolution = {
  [key: string]: {
    name: string;
    scope: string;
    module?: Module;
    loaded: boolean;
  };
};

export const initalise = async (
  config: Config,
  scope: string,
  cache: Map<string, Module>
) => {
  return new Promise<ModulesResolution>((resolve) => {
    init(config);

    const scripts: Promise<RemotePromise>[] = [];
    config.remotes.forEach((script) => {
      scripts.push(loadScript(script.entry, script.name));
    });

    Promise.all(scripts).then((remotes) => {
      const modules: Promise<ModuleResolver>[] = [];
      remotes.forEach((remote) => {
        if (!remote.loaded) {
          console.error(
            `Webdeck: Could not load script "${remote.name}" at ${remote.url}`,
            remote.e
          );
          // returned a empty module as we could not resolve it.
          modules.push(
            Promise.resolve({ name: remote.name, scope, module: undefined })
          );
        } else {
          modules.push(loadModule(remote.name, scope, cache));
        }
      });

      Promise.all(modules).then((elements) => {
        resolve(
          elements.reduce(
            (p, e) => ({
              ...p,
              [e.name]: { ...e, loaded: !!e.module },
            }),
            {} as ModulesResolution
          )
        );
      });
    });
  });
};
