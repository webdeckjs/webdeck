import { useEffect } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import { useDrawKey } from "../../../hooks/useDrawKey";

export const DeckButtonView = ({
  getContext,
  keyIndex,
}: {
  getContext: ReturnType<typeof useDrawKey>["getContext"];
  keyIndex: number;
}) => {
  const { deck, plugins, profiles } = useAppContext();
  const context = getContext(keyIndex);
  const key = profiles.profile.keys[keyIndex];
  const bespoke = plugins.manifests[key?.plugin]?.bespoke;

  // @optimal way to update the deckkey screen
  useEffect(() => {
    if (deck.isPhysical && !bespoke) {
      deck.physicalDeck?.fillKeyBuffer(
        keyIndex,
        Buffer.from(context.getData().data),
        {
          format: "rgba",
        }
      );
    }
  }, [deck.isPhysical, key?.title, key?.icon, key?.plugin, key?.loading]);

  return (
    <img
      id={`keyid-${keyIndex}`}
      {...(!bespoke ? { src: context.getSrc() } : {})}
    />
  );
};
