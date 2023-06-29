import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AboutUs from "./About";
import Admin from "./Admin";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Navigationbar from "./Navbar";
import Registration from "./Registration";
import { UserContext } from "../contexts/UserContext";

function App() {
  const storedUser = localStorage.getItem("currentUser");
  const [currentUser, setCurrentUser] = React.useState(JSON.parse(storedUser));

  // const { currentUser } = useContext(UserContext);

  console.log(currentUser);
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
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
