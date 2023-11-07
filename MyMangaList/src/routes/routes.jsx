import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Add from "../pages/Add";
import Fav from "../pages/favorites";
const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/fav" element={<Fav />} />
    </Routes>
  );
};

export default Rotas;
