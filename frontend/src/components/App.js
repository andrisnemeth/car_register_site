import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Navigationbar from "./Navbar";
import Registration from "./Registration";

function App() {
  return (
    <>
    <Navigationbar />
    <Routes>
        <Route path="/" element={<Home />} >
        </Route>
        <Route path="/registration"
        element={<Registration />} >
        </Route>
        <Route path="/login"
        element={<Login />} >
        </Route>
        <Route path="/admin"
        element={<Admin  />} >
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
