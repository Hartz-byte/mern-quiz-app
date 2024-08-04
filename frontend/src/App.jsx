import React from "react";
import { BrowserRouter } from "react-router-dom";

import Navigation from "./navigation/Navigation";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div style={{ padding: "40px" }}>
          <Navigation />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
