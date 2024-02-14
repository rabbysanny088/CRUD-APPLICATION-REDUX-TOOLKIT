import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../layouts/Home";
import SecondPages from "./SecondPages";

const PathRoute = () => {
  return (
      <BrowserRouter>
      <Routes>
      <Route path="/secondpages" element={<SecondPages />} query="preserve" />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PathRoute;
