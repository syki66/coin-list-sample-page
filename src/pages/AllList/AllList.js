import { useState, useEffect } from 'react';
import CoinTable from '../../components/CoinTable/CoinTable';
import Loader from '../../components/Loader/Loader';
import styles from './AllList.module.css';
import axios from 'axios';
import Tab from '../../components/Tab/Tab';

export default function AllList() {
  const [currency, setCurrency] = useState('krw');
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
  const [showStatus, setShowStatus] = useState('all');
  const [perPage, setPerPage] = useState(50);
  const [listNum, setListNum] = useState(50);

  const handleMoreClick = () => {
    setListNum(listNum + perPage);
  };

  const getCoinList = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${listNum}&page=1&price_change_percentage=1h,24h,7d`;
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
  }, [currency, listNum]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Tab />
      <div className={styles.selectBox}>
        <select
          value={showStatus}
          onChange={(e) => {
            setShowStatus(e.target.value);
          }}
        >
          <option value={'all'}>전체보기</option>
          <option value={'bookmark'}>북마크 보기</option>
        </select>
        <select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
        >
          <option value={'krw'}>KRW 보기</option>
          <option value={'usd'}>USD 보기</option>
        </select>
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(parseInt(e.target.value));
            setListNum(parseInt(e.target.value));
          }}
        >
          <option value={10}>10개 보기</option>
          <option value={30}>30개 보기</option>
          <option value={50}>50개 보기</option>
        </select>
      </div>

      <CoinTable
        headLabel={headLabel}
        coinData={coinData}
        currency={currency}
        showStatus={showStatus}
      />
      <div className={styles.more} onClick={handleMoreClick}>
        + 더보기
      </div>
    </>
  );
}
