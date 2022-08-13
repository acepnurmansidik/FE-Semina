import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { listen } from "./redux/listener";
import AppRoutes from "./routes";

function App() {
  useEffect(() => {
    listen();
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
