import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Add from "../pages/Add";
const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
    </Routes>
  );
};

export default Rotas;
