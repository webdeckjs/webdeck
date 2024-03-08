import { useAppContext } from "../../../contexts/AppContext";

export const DeckFooterText = () => {
  const { deck } = useAppContext();
  if (!deck.isVirtual) return null;

  return (
    <small
      style={{
        color: "white",
        paddingTop: 20,
        opacity: 0.2,
        fontSize: 12,
      }}
    >
      You are currently in {deck.editMode ? "Edit Mode" : "Preview Mode"}.
      Switch to{" "}
      <a
        className="a"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          deck.setEditMode(!deck.editMode);
          if (!deck.editMode && !deck.selectedKey) {
            deck.setSelectedKey(0);
          }
        }}
      >
        {deck.editMode ? "Preview Mode" : "Edit Mode"}
      </a>{" "}
      to {deck.editMode ? "test" : "edit"} it.
    </small>
  );
};
