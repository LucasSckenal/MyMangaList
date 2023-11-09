import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Add from "../pages/Add";
import Fav from "../pages/favorites";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoutes from "./privateRoutes";
import Profile from "../pages/Profile";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/MyMangaList/login" element={<Login />} />

      <Route path="/MyMangaList/register" element={<Register />} />

      <Route
        path="/MyMangaList"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
      <Route
        path="/MyMangaList/profile"
        element={
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        }
      />

      <Route
        path="/MyMangaList/add"
        element={
          <PrivateRoutes>
            <Add />
          </PrivateRoutes>
        }
      />
      <Route
        path="/MyMangaList/fav"
        element={
          <PrivateRoutes>
            <Fav />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default Rotas;
