// import { useState, useEffect, lazy, FC } from "react";
// import { useDynamicScript } from "./useDynamicScript";
// import { loadModule } from "../utils/loadModule";
// import { Config } from "@testing-library/react";
// import { useAppContext } from "../contexts/AppContext";
// import { loadRemote } from "@module-federation/runtime/.";

// type FederatedComponentType = FC<{
//   config: Config;
//   setConfig: (config: Config) => void;
// }>;

// type Module = {
//   default: FC;
//   init: () => void;
//   onPress: () => void;
// };

// const componentCache = new Map<string, FederatedComponentType>();
// const moduleCache = new Map<string, Module>();

// export const useFederatedComponent = (
//   remoteUrl: string,
//   scope: string,
//   name: string
// ) => {
//   const {
//     deck,
//     profiles: { profile },
//   } = useAppContext();
//   const [loaded, setLoaded] = useState(false);

//   const key = `${remoteUrl}-${scope}-${name}`;
//   const [Component, setComponent] = useState<null | FederatedComponentType>(
//     null
//   );
//   const { ready, errorLoading } = useDynamicScript(remoteUrl);

//   useEffect(() => {
//     if (Component) setComponent(null);
//     // Only recalculate when key changes
//   }, [key]);

//   // todo more dynamic loading.

//   const loadModule = async (
//     _scope: string,
//     _name: string,
//     keyIndex: number
//   ) => {
//     const moduleKey = `${scope}-${name}`;
//     let module;
//     if (moduleCache.has(moduleKey)) {
//       module = moduleCache.get(moduleKey);
//     } else {
//       module = (await loadRemote(`${_scope}/${_name.slice(2)}`)) as Module;
//       moduleCache.set(moduleKey, module);
//       try {
//         module!.init();
//       } catch (e) {
//         console.warn(
//           `Webdeck: Failed to initalise: ${scope}. Have you added and exported init() functions in you plugin?`,
//           e
//         );
//       }
//     }

//     // bind key
//     deck.bindOnPress(module!.onPress, keyIndex);

//     return module;
//   };

//   // preload
//   useEffect(() => {
//     const preload = async () => {
//       Object.keys(profile.keys).forEach((index) => {
//         const keyValue = profile.keys[index];
//         // console.log({ key });
//         // if (!componentCache.has(key)) {
//         //   const Component = lazy(
//         //     loadModule(_scope, _name, (fn) => deck.bindOnPress(fn, parseInt(index)))
//         //   );
//         //   componentCache.set(key, Component);
//         // }
//       });
//     };

//     preload();
//   }, []);

//   useEffect(() => {
//     if (ready && !Component && scope) {
//       if (componentCache.has(key)) {
//         const Component = componentCache.get(key);
//         setComponent(Component);
//         return;
//       }
//       // why is this fired again?
//       // const Component = lazy(
//       //   loadModule(scope, name, (fn) => deck.bindOnPress(fn, deck.selectedKey!))
//       // );
//       // componentCache.set(key, Component);
//       // setComponent(Component);
//     }
//     // key includes all dependencies (scope/module)
//   }, [Component, ready, key]);

//   return { errorLoading, FederatedComponent: Component };
// };

// // const module = (await loadRemote(`${_scope}/${_name.slice(2)}`)) as Module;
// // moduleCache.set(moduleKey, module);
// // try {
// //   module.init();
// //   deck.bindOnPress(module.onPress, keyIndex);
// // } catch (e) {
// //   console.warn(
// //     `Webdeck: Failed to initalise: ${scope}. Have you added and exported init() & onPress() functions in you plugin?`,
// //     e
// //   );

// // export const useFederatedComponent = (
// //   remoteUrl: string,
// //   scope: string,
// //   name: string
// // ) => {
// //   const {
// //     deck,
// //     profiles: { profile },
// //   } = useAppContext();
// //   const key = `${remoteUrl}-${scope}-${name}`;
// //   const [Component, setComponent] = useState<null | FederatedComponentType>(
// //     null
// //   );
// //   const { ready, errorLoading } = useDynamicScript(remoteUrl);

// //   useEffect(() => {
// //     if (Component) setComponent(null);
// //     // Only recalculate when key changes
// //   }, [key]);

// //   // const preload = () => {
// //   // }

// //   const loadModule = async () => {
// //     const module = (await loadRemote(`${scope}/${name.slice(2)}`)) as Module;
// //     try {
// //       module.init();
// //       bindOnPress(module.onPress);
// //     } catch (e) {
// //       console.warn(
// //         `Webdeck: Failed to initalise: ${scope}. Have you added and exported init() & onPress() functions in you plugin?`,
// //         e
// //       );
// //     }
// //     return module;
// //   }

// //   // load all plugins and there config on start
// //   useEffect(() => {
// //     console.log("initing all the things", profile);
// //     Object.keys(profile.keys).forEach((index) => {
// //       const key = profile.keys[index];
// //       console.log({ key });

// //       // if ()
// //     });
// //     // basicly need to preload all plugins with diffrent binds
// //   }, []);

// //   useEffect(() => {
// //     if (ready && !Component && scope) {
// //       if (componentCache.has(key)) {
// //         const Component = componentCache.get(key);
// //         setComponent(Component);
// //         return;
// //       }
// //       // why is this fired again?
// //       const Component = lazy(
// //         loadModule(scope, name, (fn) => deck.bindOnPress(fn, deck.selectedKey))
// //       );
// //       componentCache.set(key, Component);
// //       setComponent(Component);
// //     }
// //     // key includes all dependencies (scope/module)
// //   }, [Component, ready, key]);

// //   return { errorLoading, FederatedComponent: Component };
// // };

// // export const useFederatedComponent = (
// //   remoteUrl: string,
// //   scope: string,
// //   module: string
// // ) => {
// //   const componentCache = new Map();
// //   const key = `${remoteUrl}-${scope}-${module}`;
// //   const [Component, setComponent] = useState<null | FC>(null);
// //   const { ready, errorLoading } = useDynamicScript(remoteUrl);

// //   useEffect(() => {
// //     if (Component) setComponent(null);
// //     // Only recalculate when key changes
// //   }, [key]);

// //   useEffect(() => {
// //     if (ready && !Component) {
// //       // @ts-expect-error
// //       const Comp = lazy(loadComponent(scope, module));

// //       componentCache.set(key, Comp);
// //       setComponent(Comp);
// //     }
// //     // key includes all dependencies (scope/module)
// //   }, [Component, ready, key]);

// //   return { errorLoading, FederatedComponent: Component };
// // };
