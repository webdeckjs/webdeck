import { FC } from "react";
import { useAppContext } from "../../../contexts/AppContext";

export const Plugins: FC = () => {
  const { profiles, deck, plugins } = useAppContext();
  const selectedPlugin = profiles.profile.keys[deck.selectedKey!]?.plugin;
  console.log({ selectedPlugin });
  return (
    <div>
      <select
        name="plugins"
        id="plugins"
        title="select plugin"
        value={selectedPlugin || ""}
        onChange={(e) => profiles.setPlugin(e.target.value, deck.selectedKey!)}
      >
        <option value="">select...</option>
        {plugins.plugins.map((plugin) => {
          return (
            <option key={plugin.name} value={plugin.name}>
              {plugin.name} {plugin.creator && `@${plugin.creator}`}
            </option>
          );
        })}
      </select>
      <button
        title="remove plugin"
        className="s"
        onClick={() =>
          plugins.promptRemovePlugin(selectedPlugin, () => {
            // once pluging removed remove bindings
            profiles.removePlugin(selectedPlugin);
          })
        }
        disabled={!selectedPlugin}
      >
        -
      </button>
      <button
        title="add plugin"
        className="s"
        onClick={plugins.promptAddPlugin}
      >
        +
      </button>
    </div>
  );
};
