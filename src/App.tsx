import React from "react";
import { Content } from "./interface/structures/Content";
import { Footer } from "./interface/structures/Footer";
import { Header } from "./interface/structures/Header";

export const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};
