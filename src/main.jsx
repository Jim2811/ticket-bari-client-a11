import { BrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { StrictMode } from "react";
import "./App.css";
import "./index.css";
import route from "./Router/Routes.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={route}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
