declare module "*.css";
declare module "*.sass";
declare module "*.scss";
declare module "*.png";
declare module "*.json";
declare module "*.jpg";

declare module "*.svg" {
  import React from "react";
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
