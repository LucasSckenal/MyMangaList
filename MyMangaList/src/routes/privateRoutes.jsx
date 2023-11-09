import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const userLoggedIn = localStorage.getItem("userLoggedIn");

  if (!userLoggedIn) {
    return <Navigate to="/MyMangaList/login" />;
  }

  return children;
};

export default PrivateRoutes;
