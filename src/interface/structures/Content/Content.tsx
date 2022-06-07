import { Route, Routes } from "react-router-dom";
import { mainRoutes } from "../../../routes/mainRoutes";
import React from "react";
import styles from "./Content.sass";

export const Content = (): JSX.Element => {
  return (
    <main>
      <div className={styles.content}>
        <div className={styles.container}>
          <Routes>
            {mainRoutes.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
          </Routes>
        </div>
      </div>
    </main>
  );
};
