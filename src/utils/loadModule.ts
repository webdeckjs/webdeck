import { loadRemote } from "@module-federation/runtime/.";
import { Module } from "../types/Module";

export type ModuleResolver = {
  name: string;
  scope: string;
  module: Module | undefined;
};

const TIMEOUT_TIME = 5000;

export const loadModule = async (
  name: string,
  scope: string,
  cache: Map<string, Module>
) => {
  return new Promise<ModuleResolver>((resolve) => {
    const moduleKey = `${scope}-${name}`;
    if (cache.has(moduleKey)) {
      const module = cache.get(moduleKey);
      resolve({ name, scope, module });
    } else {
      // loadRemote seems to never resolve if there an issues with its name.
      // so best to timeout after 10 seconds to prevent issues with others.
      const timeout = setTimeout(() => {
        resolve({ name, scope, module: undefined });
      }, TIMEOUT_TIME);

      loadRemote(`${name}/${scope.slice(2)}`)
        .then((module) => {
          cache.set(moduleKey, module as Module);
          resolve({ name, scope, module: module as Module });
          clearTimeout(timeout);
        })
        .catch(() => {
          resolve({ name, scope, module: undefined });
          clearTimeout(timeout);
        });
    }
  });
};
