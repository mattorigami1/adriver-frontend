import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RootContext from "./context/RootContext";
import Login from "./containers/Login";
import Home from "./containers/Home";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./containers/Register";
import ProtectedRoute from "./hoc/ProtectedRoute";

const App = () => {
  return (
    <RootContext>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <ProtectedRoute path="/">
            <Home />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </RootContext>
  );
};

export default App;
