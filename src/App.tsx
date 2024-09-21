import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import JobProviderDashboard from "./pages/JobProviderDashboard";
import HomePageForJobProvider from "./pages/HomePageForJobProvider";
import CreateAccountPage from "./pages/CreateAccountPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./utils/protectedRoutes";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import AppRoutes from "./utils/routes";
import HomePageJobSeeker from "./pages/HomePageJobSeeker";
import PostJob from "./pages/PostJob";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
