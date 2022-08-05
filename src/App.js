import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import PageSignin from "./pages/signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/signin" element={<PageSignin />} />
      </Routes>
    </Router>
  );
}

export default App;
