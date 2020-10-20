import React from "react";
import Home from "./Views/CoffeeQueen";
import Enter from "./Views/Selection";
import Food from "./Views/Chef";
import Waiter from "./Views/FoodOrders";
import MenuOptions from "./Views/Menu";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [cooking, setCooking] = React.useState([]);
  const handleSetCooking = (cooking) => {
    setCooking(cooking);
  };

  const [waiter, setWaiter] = React.useState([]);
  const handleSetWaiter = (waiter) => {
    setWaiter(waiter);
  };

  return (
    <Router>
      <Switch>
        <Route path="/FoodOrders">
          <Waiter waiter={waiter} handleSetWaiter={handleSetWaiter} />{" "}
          {/* Cuando se quiere llamar de un componente a otro componente */}
        </Route>
        <Route path="/Chef">
          <Food cooking={cooking} handleSetCooking={handleSetCooking} />
        </Route>
        <Route path="/Menu">
          <MenuOptions cooking={cooking} handleSetCooking={handleSetCooking} />
        </Route>
        <Route path="/Selection">
          <Enter />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
