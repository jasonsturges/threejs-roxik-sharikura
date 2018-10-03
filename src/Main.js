import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './container/Home';

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
  </Switch>
);

export default Main;