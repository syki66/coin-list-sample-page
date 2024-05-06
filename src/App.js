import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllCoinList from './pages/AllCoinList/AllCoinList';
import BookmarkCoinList from './pages/BookmarkCoinList/BookmarkCoinList';
import CoinDetails from './pages/CoinDetails/CoinDetails';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllCoinList />} />
          <Route path="/bookmark" element={<BookmarkCoinList />} />
          <Route path="/:id" element={<CoinDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
