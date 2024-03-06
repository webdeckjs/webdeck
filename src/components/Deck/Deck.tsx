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
import { DeckButtonView } from "./DeckButtonView/DeckButtonView";

export const Deck: FC = () => {
  const { deck } = useAppContext();

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
                onMouseDown={() => deck.onMouseDown(keyIndex)}
                onMouseUp={() => deck.onMouseUp(keyIndex)}
                onClick={() => {
                  if (deck.editMode) {
                    deck.setSelectedKey(keyIndex);
                  }
                }}
                className={classNames({
                  active: deck.pressedMap[keyIndex],
                  selected: deck.editMode && deck.selectedKey === keyIndex,
                  editMode: deck.editMode,
                })}
              >
                <DeckButtonContent>
                  <DeckButtonView keyIndex={keyIndex} />
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
