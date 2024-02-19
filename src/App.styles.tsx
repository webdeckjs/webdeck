import styled from "styled-components";

export const Wrapper = styled("div")(({ $hasDeck }) => ({
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  // transition: "all 500ms",
  // background: $hasDeck
  //   ? "radial-gradient(circle, rgba(164,164,164,1) 0%, rgba(0,0,0,1) 100%)"
  //   : "radial-gradient(circle, rgba(5,5,5,1) 0%, rgba(0,0,0,1) 100%)",
}));

//@ts-expect-error styled ignore
export const Controller = styled("div")<{ $isOpen: boolean }>({
  display: ({ $isOpen }: { $isOpen: boolean }) => ($isOpen ? "block" : "none"),
  marginLeft: 50,
  padding: "50px",
  paddingTop: "30px",
  border: "2px inset black",
  background: "rgb(21 21 21)",
  borderRadius: "20px",
  color: "white",
  // minHeight: "80vh",
  maxHeight: "80vh",
  overflow: "auto",
  boxShadow:
    "-6px -20px 20px rgba(0,0,0,0.2), -6px -10px 15px rgba(0,0,0,0.2), -20px 0px 20px rgba(0,0,0,0.2), 6px 20px 20px rgba(0,0,0,0.2)",
});

export const Settings = styled("div")({
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "2px 0px",
});
