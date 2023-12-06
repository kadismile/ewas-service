import { useRoutes } from "react-router-dom";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { InvitedUser } from "./pages/InvitedUser";

export const UnauthorizedApp = () => {
  const routes = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password/:resetToken", element: <ResetPassword /> },
    { path: "/invited-user/:invitationalId/", element: <InvitedUser /> },
    { path: "*", element: <Login /> },
  ]);

  return (
    <>
      <>
          { routes }
      </>
    </>
  );
}