import { FC, useState } from "react";
import { SubSubTitle } from "../../SubSubTitle/SubSubTitle";
import { useAppContext } from "../../../contexts/AppContext";

// TODO: remove depedancy for subtitle
export const Debugger: FC = () => {
  const { profiles, plugins } = useAppContext();
  const [open, setIsOpen] = useState(false);
  return (
    <div>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          padding: "0 0 8px 0",
        }}
      >
        <SubSubTitle>debugging</SubSubTitle>
        <button className="s" onClick={() => setIsOpen(!open)}>
          {open ? " close" : "open"}
        </button>
      </div>
      <div style={{ display: open ? "block" : "none", textAlign: "left" }}>
        <span>Profiles:</span>
        <pre style={{ width: 350, textAlign: "left", background: "black" }}>
          {JSON.stringify(profiles.profiles, null, 4)}
        </pre>
        <span>Plugins:</span>
        <pre style={{ width: 350, textAlign: "left", background: "black" }}>
          {JSON.stringify(plugins.plugins, null, 4)}
        </pre>
        <span>Manifest:</span>
        <pre style={{ width: 350, textAlign: "left", background: "black" }}>
          {JSON.stringify(plugins.manifest, null, 4)}
        </pre>
      </div>
    </div>
  );
};
