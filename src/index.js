import React from "react";
import ReactDOM from "react-dom/client";

// provider
import { AuthProvider } from "context/AuthContext";

// Application component
import App from "./App";
// styling
import "./index.css";
import { ViewportProvider } from "context/ViewportContext";
import { WrapperProvider } from "context/WrapperContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ViewportProvider>
        <WrapperProvider>
          <App />
        </WrapperProvider>
      </ViewportProvider>
    </AuthProvider>
  </React.StrictMode>
);
