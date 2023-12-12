import { useRoutes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Header } from "./components/Header/Header";
import { SideBar } from "./components/SideBar/SideBar";
import { Users } from "./pages/Users";
import { Department } from "./pages/Department";
import { Responder } from "./pages/Responder";
import { Reporters } from "./pages/Reporters";
import { Reports } from "./pages/Reports";
import { ReportDetails } from "./pages/ReportDetails";
import { UserProfile } from "./pages/UserProfile";
import { Articles } from "./pages/Articles";


export const AuthorizedApp = () => {
  const routes = useRoutes([
    { path: "/", element: <Home roles={'salim'}/> },
    { path: "/users", element: <Users /> },
    { path: "/user/:userId", element: <UserProfile /> },
    { path: "/department", element: <Department /> },
    { path: "/responder", element: <Responder /> },
    { path: "/reporters", element: <Reporters /> },
    { path: "*", element: <Home /> },
    { path: "/reports", element: <Reports /> },
    { path: "/report/:reportSlug", element: <ReportDetails /> },
    { path: "/articles", element: <Articles /> }
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
