import { render } from "react-dom";
import { App } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// first react component

// HTML vs JSX
// class - className
// for - htmlFor
// inline styles are strings - inline styles are objects
// <!-- comment --> - /* comment */

render(<App />, document.getElementById("root"));
