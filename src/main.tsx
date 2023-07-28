import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Header from "./components/Header";
import { ThemeProvider } from "./utils/context/ThemeProvider";
import GlobalStyle from "./utils/context/GlobalStyle";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <Header />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);