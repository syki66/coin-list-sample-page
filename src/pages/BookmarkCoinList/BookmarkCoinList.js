import { useState, useEffect } from 'react';
import CoinTable from '../../components/CoinTable/CoinTable';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import GNB from '../../components/GNB/GNB';
import Toast from '../../components/Toast/Toast';
import { networkErrorMessage } from '../../constants/errorMessage';

export default function BookmarkCoinList() {
  const [currency] = useState('krw');
  const [isLoading, setIsLoading] = useState(true);
  const [headLabel] = useState([
    '',
    '자산',
    '',
    'Price',
    '1H',
    '24H',
    '7D',
    'Total Volume',
  ]);
  const [coinData, setCoinData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const getCoinList = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&price_change_percentage=1h,24h,7d`;
      const response = await axios.get(url);
      setCoinData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.code === 'ERR_NETWORK') {
        setShowToast(true);
        setToastMessage(networkErrorMessage);
      }
    }
  };

  useEffect(() => {
    getCoinList();
  }, []);

  if (isLoading) {
    return (
      <>
        {showToast && <Toast setToast={setShowToast} message={toastMessage} />}
        <Loader />
      </>
    );
  }
  return (
    <>
      {showToast && <Toast setToast={setShowToast} message={toastMessage} />}
      <GNB />
      <CoinTable
        headLabel={headLabel}
        coinData={coinData}
        currency={currency}
        showStatus={'bookmark'}
      />
    </>
  );
}
