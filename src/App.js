import './App.css';
import Home from './components/UserPosted'
import Login from './components/Login'
import Register from './components/Register'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'

function App() {
  return (
    <div>
       <BrowserRouter>
      <Switch>
        <Route  path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
      </BrowserRouter>
   </div>
  );
}

export default App;
