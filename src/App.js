import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoinList from './pages/CoinList';
import CoinDetails from './pages/CoinDetails';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CoinList />} />
          <Route path="/:id" element={<CoinDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
