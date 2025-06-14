import React from "react";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./components/common/ContactUs";
import Collections from "./components/common/Collections";
import Login from './components/customerLoginSignup/Login';
import Signup from './components/customerLoginSignup/Signup';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage></LandingPage>} />
      <Route path="/ContactUs" element={<ContactUs></ContactUs>}/>
      <Route path="/Collections" element={<Collections></Collections>}/>
      <Route path="/Login" element={<Login></Login>}/>
      <Route path="/Signup" element={<Signup></Signup>}/>
      </Routes>
    </Router>
  );
};
export default App;
