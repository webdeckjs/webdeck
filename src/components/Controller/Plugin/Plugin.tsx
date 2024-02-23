import { FC, lazy, useEffect, useState, Suspense } from "react";
import { useAppContext } from "../../../contexts/AppContext";

type FederatedComponent = FC<{
  config: unknown;
  setConfig: (config: Record<string | number | symbol, unknown>) => void;
}>;

export const Plugin: FC = () => {
  const { plugins, profiles, deck } = useAppContext();
  const [Plugin, setPlugin] = useState<FederatedComponent | null>(null);

  const key = deck.selectedKey!;
  const keyConfig = profiles.profile.keys[key];
  const module = plugins.getModule(
    plugins.pluginsById[keyConfig?.plugin]?.name
  );

  useEffect(() => {
    if (module) {
      const Component = lazy(() => {
        return Promise.resolve(module);
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
        height: "400px",
        outline: "none",
        margin: "8px 0",
        border: "2px solid black",
        position: "relative",
        textAlign: "left",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <Suspense fallback="Loading System">
        {Plugin && keyConfig?.config ? (
          <Plugin
            config={keyConfig.config}
            setConfig={(config: Record<string | number | symbol, unknown>) => {
              profiles.setConfig(key, config);
            }}
          />
        ) : (
          <div></div>
        )}
      </Suspense>
    </div>
  );
};
