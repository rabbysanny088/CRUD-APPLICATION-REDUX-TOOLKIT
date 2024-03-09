import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../layouts/Home";
import ErrorPage from "../pages/Error";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const PathRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/secondpages" element={<SecondPages />} query="preserve" /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PathRoute;
