import React from "react";
import { Content } from "Structures/Content";
import { Footer } from "Structures/Footer";
import { Header } from "Structures/Header";

export const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};
