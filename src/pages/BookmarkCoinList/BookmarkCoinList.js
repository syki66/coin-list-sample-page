import { useState, useEffect } from 'react';
import CoinTable from '../../components/CoinTable/CoinTable';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import Tab from '../../components/Tab/Tab';

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

  const getCoinList = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&price_change_percentage=1h,24h,7d`;
      const response = await axios.get(url);
      setCoinData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.code === 'ERR_NETWORK') {
        alert(
          '네트워크 오류가 발생했습니다. \n\n API를 빈번하게 호출할 경우 오류가 발생할 수 있습니다. \n 잠시 후 다시 이용해주세요.'
        );
      }
    }
  };

  useEffect(() => {
    getCoinList();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Tab />
      <CoinTable
        headLabel={headLabel}
        coinData={coinData}
        currency={currency}
        showStatus={'bookmark'}
      />
    </>
  );
}
