import { FC } from "react";
import classNames from "classnames";
import {
  DeckButton,
  DeckButtonContent,
  DeckLayout,
  DeckTitle,
  DeckWrapper,
  DisconnectButton,
} from "./Deck.styles";
import { useAppContext } from "../../contexts/AppContext";
import { DeckFooterText } from "./DeckFooterText/DeckFooterText";
import { useDrawKey } from "../../hooks/useDrawKey";
import { DeckButtonView } from "./DeckButtonView/DeckButtonView";

export const Deck: FC = () => {
  const { deck } = useAppContext();
  const { getContext } = useDrawKey();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DeckWrapper>
        <DeckTitle>
          {deck.current?.PRODUCT_NAME}{" "}
          <span title="Disconect device">
            <DisconnectButton onClick={() => deck.disconect()} />
          </span>
        </DeckTitle>
        <DeckLayout $columns={deck.current?.KEY_COLUMNS || 0}>
          {Array.from({ length: deck.current?.NUM_KEYS || 0 }).map(
            (_, keyIndex) => (
              <DeckButton
                key={keyIndex}
                onMouseDown={() => {
                  if (deck.isVirtual && !deck.editMode) {
                    deck.onMouseDown(keyIndex);
                  }
                }}
                onMouseUp={() => {
                  if (deck.isVirtual && !deck.editMode) {
                    deck.onMouseUp(keyIndex);
                  }
                }}
                onClick={() => {
                  if (deck.editMode) {
                    deck.setSelectedKey(keyIndex);
                  }
                }}
                className={classNames({
                  // active: deck.pressedMap[keyIndex],
                  selected: deck.editMode && deck.selectedKey === keyIndex,
                  editMode: deck.editMode,
                })}
              >
                <DeckButtonContent>
                  <DeckButtonView getContext={getContext} keyIndex={keyIndex} />
                </DeckButtonContent>
              </DeckButton>
            )
          )}
        </DeckLayout>
      </DeckWrapper>
      <DeckFooterText />
    </div>
  );
};
