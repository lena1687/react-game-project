import { Route, Switch } from "react-router-dom";
import { mainRoutes } from "../../../routes/mainRoutes";
import React from "react";

export const Content = (): JSX.Element => {
  return (
    <main>
      <div>
        <Switch>
          {mainRoutes.map(({ path, component }) => (
            <Route exact key={path} path={path} component={component} />
          ))}
        </Switch>
      </div>
    </main>
  );
};
