import Navbar from "./components/nav/Navbar";
import Home from "./components/Home";
import Trade from "./components/trade/Trade";
import SignUp from "./components/signup/SignUp";
import Login from "./components/signup/Login";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/profile/Profile";
// import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
