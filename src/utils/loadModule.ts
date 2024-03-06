import { loadRemote } from "@module-federation/runtime/.";
import { Module } from "../types/Module";

export type ModuleResolver = {
  name: string;
  scope: string;
  module: Module | undefined;
};

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
      loadRemote(`${name.replaceAll("-", "_")}/${scope.slice(2)}`)
        .then((module) => {
          cache.set(moduleKey, module as Module);
          resolve({ name, scope, module: module as Module });
        })
        .catch(() => {
          resolve({ name, scope, module: undefined });
        });
    }
  });
};
