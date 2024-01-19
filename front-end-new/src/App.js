import { useRoutes } from "react-router-dom";
import { store } from './redux/store';
import { Home } from "./pages/Home";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Report } from "./pages/Report";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'react-notifications/lib/notifications.css';
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { UserProfile } from "./pages/User-profile";
import { Resources } from "./pages/Resources";
import { ResourceDetils } from "./pages/ResourcesDetails";
import { VolunteerReport } from "./pages/VolunteerReport";

export const App = () => {
  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }

  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/report", element: <VolunteerReport /> },
    { path: "/user-profile", element: <UserProfile /> },
    { path: "/resources", element:  <Resources /> },
    { path: "/article/:articleId", element: <ResourceDetils /> },
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