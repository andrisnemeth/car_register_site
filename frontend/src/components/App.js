import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AboutUs from "./About";
import Admin from "./Admin";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Navigationbar from "./Navbar";
import Registration from "./Registration";
import CarManagement from "./CarManagement"
import LoginAdmin from "./LoginAdmin";

function App() {
  const storedUser = localStorage.getItem("currentUser");
  const [currentUser, setCurrentUser] = React.useState(JSON.parse(storedUser));

  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={currentUser ? <Admin /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/car-page"
          element={currentUser ? <CarManagement /> : <Navigate to="/login" replace />}
        />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
