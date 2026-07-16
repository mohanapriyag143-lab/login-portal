import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Executive from './pages/Executive/Executive';
import ThreatMap from './pages/ThreatMap/ThreatMap';
import AIAnalysis from './pages/AIAnalysis/AIAnalysis';
import DigitalTwin from './pages/DigitalTwin/DigitalTwin';
import Reports from './pages/Reports/Reports';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/executive" element={<Executive />} />
            <Route path="/threat-map" element={<ThreatMap />} />
            <Route path="/analysis" element={<AIAnalysis />} />
            <Route path="/digital-twin" element={<DigitalTwin />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
