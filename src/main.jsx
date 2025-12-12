import { BrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { StrictMode } from "react";
import "./App.css";
import "./index.css";
import route from "./Router/Routes.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
        <RouterProvider router={route}></RouterProvider>
  </StrictMode>
);
