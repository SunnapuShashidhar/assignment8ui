import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "./context";
import Filter from "./Components/Filter/Filter";
import "./App.css"
import Home from "./Components/Home/Home";
import Detailes from "./Components/Home/Detailes";
import Navbar from "./Components/Home/Navbar";
import Login from "./Components/Authnticate/Login";
import SignUp from "./Components/Authnticate/SignUp";
import Payment from "./Components/Filter/Payment";
function App() {
  return (
    <Provider>
      <BrowserRouter basename="/">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/filter" component={Filter} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/filter/:_id" component={Filter} />
          <Route exact path="/details/:id" component={Detailes} />
          <Route exact path="/payments/:id" component={Payment} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
