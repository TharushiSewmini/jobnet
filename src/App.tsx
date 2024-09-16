import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import JobProviderDashboard from "./pages/JobProviderDashboard";
import HomePageForJobProvider from "./pages/HomePageForJobProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/jobproviderdashboard"
            element={<JobProviderDashboard />}
          />
           <Route
            path="/homepageforjobprovider"
            element={<HomePageForJobProvider />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
