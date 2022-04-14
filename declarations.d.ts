declare module "*.css";
declare module "*.sass";
declare module "*.scss";

declare module "*.svg" {
  import React from "react";
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
