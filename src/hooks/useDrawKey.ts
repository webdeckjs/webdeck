import { getKeyImage } from "../utils/getKeyImage";
import { useAppContext } from "../contexts/AppContext";

export const useDrawKey = () => {
  const { deck, profiles, plugins } = useAppContext();
  const getContext = (
    keyIndex: number,
    // injectable.
    _deck = deck.current,
    _profiles = profiles,
    _plugins = plugins
  ) => {
    const config = _profiles.profile.keys[keyIndex];
    const plugin = _profiles.profile.keys[keyIndex]?.plugin;
    const icon =
      _plugins.manifests[plugin]?.icons?.[
        _profiles.profile.keys[keyIndex]?.icon
      ]?.icon || _plugins.manifests[plugin]?.icons?.["default"]?.icon;

    const width = _deck?.ICON_SIZE || 72;
    const height = _deck?.ICON_SIZE || 72;
    const module = plugins?.modules[plugin];

    const context = getKeyImage({
      width,
      height,
      key: keyIndex,
      config,
      icon,
      module,
    });

    return {
      getSrc: () => context.canvas.toDataURL(),
      getData: () =>
        context.ctx.getImageData(0, 0, width, height, {
          colorSpace: "srgb",
        }),
      context,
    };
  };

  return {
    getContext,
  };
};
