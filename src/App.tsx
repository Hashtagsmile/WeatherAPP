import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { WeatherDetailPage } from "./pages/WeatherDetailsPage";

function App() {
  return (
    <Router>
      <nav className="navbar sticky-top bg-light border-bottom">
        <div className="container-fluid">
          <a className="navbar-brand " href="/">
            <p className="h3">
              Temp<span className="text-primary">Teller</span>
            </p>
          </a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/weather/:city" element={<WeatherDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
