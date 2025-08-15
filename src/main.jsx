import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import AuthContextProvider from "./Context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
