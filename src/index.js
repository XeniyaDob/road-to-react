import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
//Remove the strict mode. Explanation: In development mode, React’s StrictMode renders a
//component twice to detect problems with your implementation in order to warn you about these.
reportWebVitals();
