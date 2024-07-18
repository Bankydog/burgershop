import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Authentication.jsx";
import { PostProvider } from "./hook/usePostsAPI.jsx";
import { NonUserProvider } from "./hook/nonUserAPI.jsx";
import jwtInterceptors from "./utils/jwtInterceptors.js";

jwtInterceptors();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <NonUserProvider>
            <App />
          </NonUserProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
