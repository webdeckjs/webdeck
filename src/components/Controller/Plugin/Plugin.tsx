import { FC, lazy, useEffect, useState, Suspense } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import { EXTENSION_ID } from "../../../hooks/useExtension";

type FederatedComponent = FC<{
  key: string;
  config: unknown;
  setConfig: (config: Record<string | number | symbol, unknown>) => void;
  icon?: string;
  setIcon?: (icon: string) => void;
}>;

export const Plugin: FC = () => {
  const { plugins, profiles, deck, extension } = useAppContext();
  const [Plugin, setPlugin] = useState<FederatedComponent | null>(null);

  const key = deck.selectedKey!;
  const keyConfig = profiles.profile.keys[key];
  const module = plugins.modules[keyConfig?.plugin];
  const manifest = plugins.manifests?.[keyConfig?.plugin];
  const loaded = module?.loaded;

  useEffect(() => {
    if (module?.module) {
      const Component = lazy(() => {
        return Promise.resolve(module.module!);
      });
      setPlugin(Component);
    } else {
      setPlugin(null);
    }
  }, [module]);

  return (
    <div
      style={{
        width: "100%",
        maxHeight: "400px",
        minHeight: "100px",
        outline: "none",
        margin: "8px 0",
        border: "2px solid black",
        position: "relative",
        textAlign: "left",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      {manifest?.extension_required === true &&
      extension.installed === false ? (
        <div
          style={{
            marginBottom: 8,
            padding: 8,
            border: "1px solid black",
            background: "orange",
            borderRadius: 8,
          }}
        >
          <span>This plugin required the </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://chrome.google.com/webstore/detail/${EXTENSION_ID}`}
          >
            Webdeck Extension
          </a>{" "}
        </div>
      ) : null}
      <Suspense fallback="Loading System">
        {Plugin && keyConfig?.config && module ? (
          <Plugin
            key={keyConfig.plugin + key}
            config={keyConfig.config}
            setConfig={(config: Record<string | number | symbol, unknown>) => {
              profiles.setConfig(key, config);
            }}
          />
        ) : loaded === false ? (
          <div
            style={{
              display: "flex",
              textAlign: "center",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              color: "#cb0000",
              background: "#f7a5a5",
            }}
          >
            Failed to load {keyConfig?.plugin} plugin!
          </div>
        ) : (
          <div></div>
        )}
      </Suspense>
    </div>
  );
};
