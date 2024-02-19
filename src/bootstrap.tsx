import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AppContext } from "./contexts/AppContext";
import { usePlugins } from "./hooks/usePlugins";
import { useProfiles } from "./hooks/useProfiles";
import { useDeck } from "./hooks/useDeck";

export type AppContainerType = {
  deck: ReturnType<typeof useDeck>;
  profiles: ReturnType<typeof useProfiles>;
  plugins: ReturnType<typeof usePlugins>;
};

export const Container = () => {
  const profiles = useProfiles();
  const plugins = usePlugins();
  const deck = useDeck(profiles, plugins);

  return (
    <AppContext.Provider value={{ deck, profiles, plugins }}>
      <div>{!plugins.initalised && <>initialising plugins...</>}</div>
      <App />
    </AppContext.Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// useEffect(() => {
//   if (plugins.initalised && deck.initalised) {
//     // once all plugins are loade, try initalise the modules.
//     // console.log("plugins", plugins);
//     // const modules: Promise<unknown>[] = [];
//     // Object.keys(profiles.profile.keys).forEach((keyIndex) => {
//     //   const { plugin } = profiles.profile.keys[keyIndex];
//     //   if (plugin) modules.push(plugins.loadModule(plugin));
//     // });
//     // Promise.all(modules).then((resp) => {
//     //   console.log("!!! Modules Loaded", resp);
//     //   console.log("MODULE_CATCHE", plugins.getModules());
//     //   // setInitalised(true);
//     // });
//   }
// }, [plugins.initalised, deck.initalised]);

// if (!plugins.initalised) {
//   return <>initialising plugin...</>;
// }
