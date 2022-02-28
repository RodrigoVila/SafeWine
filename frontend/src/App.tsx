import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import QRScanner from './components/Scan';
import AddToken from './components/Add';
import TransferToken from './components/Transfer';
import SellToken from './components/Sell';
import VerifyToken from './components/Verify';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/scan" element={<QRScanner />} /> */}
                <Route path="/add" element={<AddToken />} />
                <Route path="/transfer" element={<TransferToken />} />
                <Route path="/sell" element={<SellToken />} />
                <Route path="/token/:slug" element={<VerifyToken />} />
            </Routes>
        </Router>
    );
};

export default App;
