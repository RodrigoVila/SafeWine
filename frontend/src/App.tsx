import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AddBottle from './components/Add';
import TransferBottle from './components/Transfer';
import SellBottle from './components/Sell';
import Scanner from './components/Scan';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add" element={<AddBottle />} />
                <Route path="/transfer" element={<TransferBottle />} />
                <Route path="/sell" element={<SellBottle />} />
                <Route path="/scan" element={<Scanner />} />
            </Routes>
        </Router>
    );
};

export default App;
