import { loadRemote } from "@module-federation/runtime";
import { FC } from "react";

type Module = {
  default: FC;
  init: () => void;
  onPress: () => void;
};

export function loadModule(
  scope: string,
  name: string,
  bindOnPress: (fn: () => void) => void
) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    const module = (await loadRemote(`${scope}/${name.slice(2)}`)) as Module;
    try {
      module.init();
      bindOnPress(module.onPress);
    } catch (e) {
      console.warn(
        `Webdeck: Failed to initalise: ${scope}. Have you added and exported init() & onPress() functions in you plugin?`,
        e
      );
    }
    return module;
  };
}
