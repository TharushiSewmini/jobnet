import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import { useAuthContext } from "../contexts/AuthContext";

import JobProviderDashboard from "../pages/JobProviderDashboard";
import HomePageForJobProvider from "../pages/HomePageForJobProvider";
import ProtectedRoute from "./protectedRoutes";
import HomePageJobSeeker from "../pages/HomePageJobSeeker";
import PostJob from "../pages/PostJob";
import BlankPage from "../pages/BlankPage";

function AppRoutes() {
  const { authenticated, userType, isLoading } = useAuthContext();

  // Public routes accessible to all
  const publicRoutes = (
    <>
      <Route path="/" element={<SignInPage />} />
      <Route path="/waiting" element={<BlankPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/createAccount" element={<CreateAccountPage />} />
      <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
      <Route path="/resetPassword" element={<ResetPasswordPage />} />
    </>
  );

  // Routes for authenticated users (non-admin)
  const userRoutes = (
    <>
      <Route path="/JobViewPage" element={<HomePageForJobProvider />} />
      <Route path="/userHome" element={<HomePageJobSeeker />} />
      <Route path="/waiting" element={<Navigate to={"/userHome"} replace />} />
      <Route path="/" element={<HomePageJobSeeker />} />
      <Route path="*" element={<HomePageJobSeeker />} />
    </>
  );

  // Routes for authenticated admins
  const adminRoutes = (
    <>
      <Route path="/postjob" element={<PostJob />} />

      <Route path="/jobProviderDashboard" element={<JobProviderDashboard />} />

      <Route
        path="/"
        element={<Navigate to={"/jobProviderDashboard"} replace />}
      />
      <Route
        path="*"
        element={<Navigate to={"/jobProviderDashboard"} replace />}
      />
    </>
  );

  return (
    <Routes>
      {!authenticated && <>{publicRoutes}</>}

      {authenticated ? (
        <Route element={<ProtectedRoute />}>
          {userType == "admin" ? adminRoutes : userRoutes}
        </Route>
      ) : (
        <Route>{publicRoutes}</Route>
      )}
    </Routes>
  );
}

export default AppRoutes;
