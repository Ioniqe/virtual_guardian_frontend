import React from 'react';
import { Switch, Route } from "react-router-dom";
import HomeSmart from "./login/HomeSmart";

// test

function Main() {
  return (
    <Switch>
      <Route exact path='/' component={HomeSmart} />
    </Switch>
  );
}
export default Main;