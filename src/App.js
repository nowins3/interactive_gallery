import Lumi from './pages/Lumi';
import './assets/css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lumi />} />
      </Routes>
    </Router>
  );
}

export default App;