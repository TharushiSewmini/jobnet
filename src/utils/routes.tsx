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

function AppRoutes() {
  const { authenticated, userType, isLoading } = useAuthContext();

  // Public routes accessible to all
  const publicRoutes = (
    <>
      <Route path="/" element={<SignInPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/createAccount" element={<CreateAccountPage />} />
      <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
      <Route path="/resetPassword" element={<ResetPasswordPage />} />
    </>
  );

  // Routes for authenticated users (non-admin)
  const userRoutes = (
    <>
      <Route path="/userHome" element={<HomePageJobSeeker />} />
      {/* <Route path="/login" element={<Navigate to={"/userHome"} replace />} /> */}
      <Route
        path="/jobProviderDashboard"
        element={<Navigate to={"/userHome"} replace />}
      />
      <Route path="/" element={<HomePageJobSeeker />} />
      <Route path="*" element={<HomePageJobSeeker />} />
    </>
  );

  // Routes for authenticated admins
  const adminRoutes = (
    <>
      <Route
        path="/login"
        element={<Navigate to={"/jobProviderDashboard"} replace />}
      />

      <Route
        path="/homepageforjobprovider"
        element={<HomePageForJobProvider />}
      />

      <Route path="/postjob" element={<PostJob />} />

      <Route path="/jobProviderDashboard" element={<JobProviderDashboard />} />
      <Route
        path="/userHome"
        element={<Navigate to={"/jobProviderDashboard"} replace />}
      />

      <Route path="/" element={<JobProviderDashboard />} />
      <Route path="*" element={<JobProviderDashboard />} />
    </>
  );

  return (
    <Routes>
      {!authenticated && (
        <>
          {publicRoutes}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}

      {authenticated && (
        <Route element={<ProtectedRoute />}>
          {userType === "undefined"
            ? publicRoutes
            : userType !== "admin"
            ? userRoutes
            : adminRoutes}
        </Route>
      )}
    </Routes>
  );
}

export default AppRoutes;
