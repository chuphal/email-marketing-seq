import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ReactFlowProvider } from "reactflow";
import { AddContextProvider } from "./context/AddContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ReactFlowProvider>
          <AddContextProvider>
            <App />
          </AddContextProvider>
        </ReactFlowProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
