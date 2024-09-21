import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import { useAuthContext } from "../contexts/AuthContext";
import HomePage from "../pages/HomePage";
import JobProviderDashboard from "../pages/JobProviderDashboard";
import HomePageForJobProvider from "../pages/HomePageForJobProvider";
import ProtectedRoute from "./protectedRoutes";
import HomePageJobSeeker from "../pages/HomePageJobSeeker";
import PostJob from "../pages/PostJob";

function AppRoutes() {
  const { authenticated, userType } = useAuthContext();

  // Public routes accessible to all
  const publicRoutes = (
    <>
      <Route path="/login" element={<SignInPage />} />
      <Route path="/createAccount" element={<CreateAccountPage />} />
      <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
      <Route path="/resetPassword" element={<ResetPasswordPage />} />
    </>
  );

  // Routes for authenticated users (non-admin)
  const userRoutes = (
    <>
      <Route path="/userHome" element={<HomePage />} />
      <Route path="/" element={<Navigate to="/userHome" replace />} />
      <Route path="*" element={<div>Loading</div>} />
      <Route path="/HomePageJobSeeker" element={<HomePageJobSeeker />} />
    </>
  );

  // Routes for authenticated admins
  const adminRoutes = (
    <>
      <Route
        path="/userHome"
        element={<Navigate to="/jobproviderdashboard" replace />}
      />
      <Route path="/jobproviderdashboard" element={<JobProviderDashboard />} />
      <Route
        path="/homepageforjobprovider"
        element={<HomePageForJobProvider />}
      />
      <Route
        path="/login"
        element={<Navigate to="/homepageforjobprovider" replace />}
      />
      <Route
        path="/"
        element={<Navigate to="/jobproviderdashboard" replace />}
      />
      <Route path="*" element={<div>Loading</div>} />
      <Route path="/postjob" element={<PostJob />} />
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
          {userType === "admin" ? adminRoutes : userRoutes}
        </Route>
      )}
    </Routes>
  );
}

export default AppRoutes;
