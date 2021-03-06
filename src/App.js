import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout.js";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import Orders from "./Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
//testing
import TestNavBar from "./TestUI/TestNavBar";

const promise = loadStripe(
  "pk_test_51HwOCSFZHuOuFOVleVONiYc6JVId39R3vrjN0cd8Oqgz6ZGkzZrngao5goQDNm24YXwXv1QnU6SNh802RhFx4hoY00RStTwqT8"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is :", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            {/* <TestNavBar /> */}
            <Orders />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            {/* <TestNavBar /> */}

            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            {/* <TestNavBar /> */}

            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            {/* <TestNavBar /> */}
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
