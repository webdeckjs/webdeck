import { HeaderWrapper } from "./Header.styles";
import { SubTitle } from "../../SubTitle/SubTitle";
import { FC } from "react";
import { useAppContext } from "../../../contexts/AppContext";

export const Header: FC = () => {
  const { deck } = useAppContext();
  return (
    <HeaderWrapper>
      <SubTitle>Settings</SubTitle>
      <button
        title="close"
        className="s"
        onClick={() => deck.setSelectedKey(undefined)}
      >
        ×
      </button>
    </HeaderWrapper>
  );
};
