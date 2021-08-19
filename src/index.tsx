import { render } from "react-dom";
import { App } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Nav } from "./Nav";
import { FoodForm } from "./FoodForm";
import { ToastContainer } from "react-toastify";
import { About } from "./About";

// first react component

// HTML vs JSX
// class - className
// for - htmlFor
// inline styles are strings - inline styles are objects
// <!-- comment --> - /* comment */

render(
  <>
    <ToastContainer />
    <BrowserRouter>
      <Nav />
      <Route path="/food" exact>
        <FoodForm />
      </Route>
      <Route path="/food/:foodId">
        <FoodForm />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/" exact>
        <App />
      </Route>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
