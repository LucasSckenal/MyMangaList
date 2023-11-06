import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Rotas from "./routes/routes";
import "./index.css";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <React.StrictMode>
      <ToastContainer
        autoClose={1200}
        closeButton={false}
        transition={Slide}
        theme="dark"
      />
      <Rotas />
    </React.StrictMode>
  </Router>
);
