import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { About } from "./About";
import { FoodForm } from "./FoodForm";
import { Home } from "./Home";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Nav } from "./Nav";
import { UserContextProvider } from "./UserContext";
import { UserContextType } from "./types";

const user: UserContextType = {
  email: "ptran@ihie.org",
  name: "Phong",
  role: "admin",
  token: "123",
};

export function App() {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <UserContextProvider value={user}>
      <QueryClientProvider client={queryClient}>
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
            <Home />
          </Route>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </UserContextProvider>
  );
}
