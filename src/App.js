import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookmarkList from './pages/BookmarkList/BookmarkList';
import CoinDetails from './pages/CoinDetails';
import AllList from './pages/AllList/AllList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllList />} />
          <Route path="/bookmark" element={<BookmarkList />} />
          <Route path="/:id" element={<CoinDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
