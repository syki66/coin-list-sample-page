import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoinList from './pages/CoinList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CoinList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
