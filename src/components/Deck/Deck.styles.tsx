import styled from "styled-components";
import Disconnect from "../../icons/disconnect.svg";

export const DeckWrapper = styled("div")({
  padding: "50px",
  paddingTop: "30px",
  border: "2px inset black",
  background: "rgb(21 21 21)",
  borderRadius: "20px",
  boxShadow:
    "-6px -20px 20px rgba(0,0,0,0.2), -6px -10px 15px rgba(0,0,0,0.2), -20px 0px 20px rgba(0,0,0,0.2), 6px 20px 20px rgba(0,0,0,0.2)",
  position: "relative",
});

export const DeckTitle = styled("h1")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  paddingBottom: 20,
  paddingTop: 0,
  margin: 0,
  color: "white",
  textTransform: "uppercase",
});

export const DeckLayout = styled("div")<{ $columns: number }>(
  ({ $columns }) => ({
    display: "grid",
    gap: "20px",
    gridTemplateColumns: `repeat(${$columns}, min-content)`,
  })
);

export const DeckButton = styled("button")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #888888",
  width: "77px",
  height: "77px",
  borderRadius: 10,
  // testing
  background: "red",
  position: "relative",
  padding: "0",
  backgroundColor: "rgb(37 37 37)",
  outline: "4px solid black",
  boxShadow:
    "-6px -20px 20px rgba(0,0,0,0.2), -6px -10px 15px rgba(0,0,0,0.2), -20px 0px 20px rgba(0,0,0,0.2), 6px 20px 20px rgba(0,0,0,0.2)",
  transition: ".13s ease-in-out",
  cursor: "pointer",
  // active
  "&:active:not(.editMode), &.active": {
    boxShadow: "none",
    border: "0px solid",
    backgroundColor: "rgb(35 35 35)",
    "& > div": {
      boxShadow: "none",
      border: "0px solid",
      "& > *": {
        transition: ".13s ease-in-out",
        transform: "translate3d(0px, 0px, 0px)",
      },
    },
  },
  "&.active": {
    //backgroundColor: "rgb(255 0 0)",
  },
  "&.selected": {
    outline: "2px dotted #ffffff9c",
    outlineOffset: "5px",
  },
});

export const DisconnectButton = styled(Disconnect)({
  marginLeft: 16,
  marginTop: 3,
  height: 18,
  width: 18,
  fill: "white",
  opacity: 0.5,
  cursor: "pointer",
  transition: "all 300ms",
  "&:hover": {
    opacity: 1,
    fill: "red",
  },
});

export const DeckButtonContent = styled("div")({
  position: "relative",
  width: "100%",
  height: "100%",
  boxShadow:
    "rgb(221, 221, 221) 0px 0px 0px inset, rgb(47 47 47) -2px -2px 0px",
  borderRadius: 10,
  transition: ".13s ease-in-out",
  zIndex: 1,
  "& > *": {
    height: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: ".13s ease-in-out",
    transform: "translate3d(0px, -4px, 0px)",
  },
});
