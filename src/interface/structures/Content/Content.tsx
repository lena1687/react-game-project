import { Route, Switch } from "react-router-dom";
import { mainRoutes } from "../../../routes/mainRoutes";
import React from "react";
import styles from "./Content.sass";

export const Content = (): JSX.Element => {
  return (
    <main>
      <div className={styles.default}>
        <div className={styles.container}>
          <Switch>
            {mainRoutes.map(({ path, component }) => (
              <Route exact key={path} path={path} component={component} />
            ))}
          </Switch>
        </div>
      </div>
    </main>
  );
};
