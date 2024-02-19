declare module "styled-jss" {
  const styled = require("styled-jss");
  export default styled;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
