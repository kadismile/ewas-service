import { useRoutes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Header } from "./components/Header/Header";
import { SideBar } from "./components/SideBar/SideBar";
import { Users } from "./pages/Users";
import { Department } from "./pages/Department";
import { Agency } from "./pages/Agency";
import { Reporters } from "./pages/Reporters";
import { Reports } from "./pages/Reports";
import { ReportDetails } from "./pages/ReportDetails";
import { UserProfile } from "./pages/UserProfile";


export const AuthorizedApp = () => {
  const routes = useRoutes([
    { path: "/", element: <Home roles={'salim'}/> },
    { path: "/users", element: <Users /> },
    { path: "/user/:userId", element: <UserProfile /> },
    { path: "/department", element: <Department /> },
    { path: "/agency", element: <Agency /> },
    { path: "/reporters", element: <Reporters /> },
    { path: "*", element: <Home /> },
    { path: "/reports", element: <Reports /> },
    { path: "/report/:reportSlug", element: <ReportDetails /> }
  ]);

  return (
    <>
      <Header />
      <main className="main">
        <SideBar />
          {routes}
      </main>
    </>
  );
}
