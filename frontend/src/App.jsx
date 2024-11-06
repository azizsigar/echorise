import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Home from "../src/pages/Home";
import Login from "./pages/Login";
import Register from "../src/pages/Register";
import axios from "axios";
import Logo from "./components/Logo";
import Services from "./components/Services.jsx";
import Market from "./components/Market.jsx";
import Solutions from "./components/Solutions.jsx";
import PeoplesProfile from "./components/PeoplesProfile.jsx";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="app">
      <Logo />
      <Navbar />
      <PeoplesProfile />
      <Routes>
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/market" element={<Market />} />
        <Route path="/echorise" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
