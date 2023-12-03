import { useRoutes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Report } from "./pages/Report";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";


export const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/report", element: <Report /> },
    { path: "/report", element: <Report /> },
    { path: "*", element: <Home /> },
  ]);
  
  return (
    <>
      <Header />
        { routes }
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      <Footer />
    </>
  );
}