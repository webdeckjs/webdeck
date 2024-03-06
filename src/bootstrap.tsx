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
      {window.location.search.includes("debug") && (
        <>
          <div>{!plugins.initalised && <>initialising plugins...</>}</div>
          <img
            id="prev"
            src=""
            style={{ margin: 10, border: "1px solid red" }}
          />
        </>
      )}

      <App />
    </AppContext.Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Container />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
