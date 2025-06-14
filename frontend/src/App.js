import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ContactUs from "./components/common/ContactUs";
import Collections from "./components/common/Collections";
import Login from './components/customerLoginSignup/Login';
import Signup from './components/customerLoginSignup/Signup';
import ProtectedRoute from './components/customerLoginSignup/ProtectedRoute';
import Profile from "./components/consumer/pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </Router>
  );
};

export default App;