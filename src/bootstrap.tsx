import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import packageJSON from "../package.json";

import { AppContext } from "./contexts/AppContext";
import { usePlugins } from "./hooks/usePlugins";
import { useProfiles } from "./hooks/useProfiles";
import { useDeck } from "./hooks/useDeck";
import { useExtension } from "./hooks/useExtension";

export type AppContainerType = {
  deck: ReturnType<typeof useDeck>;
  profiles: ReturnType<typeof useProfiles>;
  plugins: ReturnType<typeof usePlugins>;
  extension: ReturnType<typeof useExtension>;
};

export const Container = () => {
  const extension = useExtension();
  const profiles = useProfiles();
  const plugins = usePlugins();
  const deck = useDeck(profiles, plugins, extension);

  return (
    <AppContext.Provider value={{ deck, profiles, plugins, extension }}>
      {window.location.search.includes("debug") && (
        <>
          <div>version: {packageJSON.version}</div>
          <div>{!plugins.initalised && <>initialising plugins...</>}</div>
          <img
            id="prev"
            src=""
            style={{ margin: 10, border: "1px solid red" }}
          />
        </>
      )}

      <App />

      {window.location.search.includes("debug") && (
        <div style={{ position: "absolute", opacity: 0.5 }}>
          <button
            onClick={async () => {
              const set = await extension.setData({
                rand: Math.random() * 1000,
              });
              console.log({ set });
            }}
          >
            set
          </button>
          <button
            onClick={async () => {
              const get = await extension.getData();
              console.log({ get });
            }}
          >
            get
          </button>
        </div>
      )}
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
