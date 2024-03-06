import { useEffect, useRef } from "react";
import { useAppContext } from "../../../contexts/AppContext";

export const DeckButtonView = ({ keyIndex }: { keyIndex: number }) => {
  const {
    profiles: { profile },
    plugins,
  } = useAppContext();

  const ref = useRef<SVGSVGElement>(null);
  const plugin = profile.keys[keyIndex]?.plugin;
  const icon =
    plugins.manifest[plugin]?.icons?.[profile.keys[keyIndex]?.icon].icon;
  const title = profile.keys[keyIndex]?.title;
  const loading = profile.keys[keyIndex]?.loading;
  const status = plugins.status[plugin];

  // fix height of svgs
  useEffect(() => {
    if (ref.current && !ref.current.getAttribute("viewBox")) {
      const bb = ref.current?.querySelector("path")?.getBoundingClientRect();
      ref.current.setAttribute("viewBox", `0 0 ${bb?.width} ${bb?.height}`);
    }
  }, [ref, icon]);

  return (
    <div
      key={icon}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 4,
          display: "flex",
          width: "calc(100% - 8px)",
          justifyContent: "space-between",
          color: "gray",
        }}
      >
        {plugin && (
          <div style={{ width: "100%" }}>
            {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={16}
                viewBox="0 0 200 200"
              >
                <circle
                  fill="#FFF"
                  stroke="#FFF"
                  strokeWidth="2"
                  r="15"
                  cx="35"
                  cy="100"
                >
                  <animate
                    attributeName="cx"
                    calcMode="spline"
                    dur="1.4"
                    values="35;165;165;35;35"
                    keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                    repeatCount="indefinite"
                    begin="0"
                  />
                </circle>
                <circle
                  fill="#FFF"
                  stroke="#FFF"
                  strokeWidth="2"
                  opacity=".8"
                  r="15"
                  cx="35"
                  cy="100"
                >
                  <animate
                    attributeName="cx"
                    calcMode="spline"
                    dur="1.4"
                    values="35;165;165;35;35"
                    keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                    repeatCount="indefinite"
                    begin="0.05"
                  />
                </circle>
                <circle
                  fill="#FFF"
                  stroke="#FFF"
                  strokeWidth="2"
                  opacity=".6"
                  r="15"
                  cx="35"
                  cy="100"
                >
                  <animate
                    attributeName="cx"
                    calcMode="spline"
                    dur="1.4"
                    values="35;165;165;35;35"
                    keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                    repeatCount="indefinite"
                    begin=".1"
                  />
                </circle>
                <circle
                  fill="#FFF"
                  stroke="#FFF"
                  strokeWidth="2"
                  opacity=".4"
                  r="15"
                  cx="35"
                  cy="100"
                >
                  <animate
                    attributeName="cx"
                    calcMode="spline"
                    dur="1.4"
                    values="35;165;165;35;35"
                    keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                    repeatCount="indefinite"
                    begin=".15"
                  />
                </circle>
                <circle
                  fill="#FFF"
                  stroke="#FFF"
                  strokeWidth="2"
                  opacity=".2"
                  r="15"
                  cx="35"
                  cy="100"
                >
                  <animate
                    attributeName="cx"
                    calcMode="spline"
                    dur="1.4"
                    values="35;165;165;35;35"
                    keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                    repeatCount="indefinite"
                    begin=".2"
                  />
                </circle>
              </svg>
            ) : (
              <span
                style={{
                  color: status?.loaded ? "#04df04" : !status ? "gray" : "red",
                }}
                title={`${keyIndex + 1}`}
              >
                •
              </span>
            )}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          height: title ? 36 : 44,
          width: title ? 36 : 44,
          marginBottom: icon ? 4 : 0,
        }}
      >
        {icon ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            ref={ref}
            key={icon}
          >
            <path d={icon} />
          </svg>
        ) : plugin ? (
          plugin
        ) : (
          keyIndex + 1
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 4,
          left: 4,
          width: "calc(100% - 8px)",
          fontSize: 10,
        }}
      >
        {title ? <small>{title}</small> : null}
      </div>
    </div>
  );
};
