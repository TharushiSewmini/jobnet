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
import firebaseConfig from "./utils/firebaseConfig"
import {initializeApp} from "firebase/app"


function App() {
  const app = initializeApp(firebaseConfig);
  const isLoggedIn: Boolean = false;
  const userType: string = "user";

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* unautorized routes */}

          {isLoggedIn == false && (
            <>
              <Route path="/" element={<SignInPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/createAccount" element={<CreateAccountPage />} />
              <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
              <Route path="/resetPassword" element={<ResetPasswordPage />} />
            </>
          )}

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            {userType == "admin" ? (
              <>
                <Route
                  path="/jobproviderdashboard"
                  element={<JobProviderDashboard />}
                />
                <Route
                  path="/homepageforjobprovider"
                  element={<HomePageForJobProvider />}
                />
                <Route
                  path="/login"
                  element={<Navigate to={"/jobproviderdashboard"} />}
                />
                <Route
                  path="/createAccount"
                  element={<Navigate to={"/jobproviderdashboard"} />}
                />
                <Route
                  path="/forgetPassword"
                  element={<Navigate to={"/jobproviderdashboard"} />}
                />
                <Route
                  path="/resetPassword"
                  element={<Navigate to={"/jobproviderdashboard"} />}
                />
                <Route
                  path="/"
                  element={<Navigate to={"/jobproviderdashboard"} />}
                />
              </>
            ) : (
              <>
                <Route path="/userHome" element={<HomePage />} />
                <Route path="/login" element={<Navigate to={"/userhome"} />} />
                <Route
                  path="/createAccount"
                  element={<Navigate to={"/userhome"} />}
                />
                <Route
                  path="/forgetPassword"
                  element={<Navigate to={"/userhome"} />}
                />
                <Route
                  path="/resetPassword"
                  element={<Navigate to={"/userhome"} />}
                />
                <Route path="/" element={<Navigate to={"/userhome"} />} />
              </>
            )}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
