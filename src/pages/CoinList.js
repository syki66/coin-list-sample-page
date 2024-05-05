import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatNumber, getPercentColor } from '../utils/common';
import { useNavigate } from 'react-router-dom';
import styles from './CoinList.module.css';
import Toast from '../components/Toast/Toast';

export default function CoinList() {
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [coinList, setCoinList] = useState([]);
  const [currency, setCurrency] = useState('krw');
  const [perPage, setPerPage] = useState(50);
  const [listNum, setListNum] = useState(50);
  const [bookmarkList, setBookmarkList] = useState([]);

  const navigate = useNavigate();

  const handleMoreClick = () => {
    setListNum(listNum + perPage);
  };

  const handleBookmarkChange = (event, id) => {
    event.stopPropagation();

    let updateBookmark = [];
    if (bookmarkList.includes(id)) {
      updateBookmark = bookmarkList.filter((item) => item !== id);
      setToastMessage('북마크가 해제되었습니다.');
    } else {
      updateBookmark = [...bookmarkList, id];
      setToastMessage('북마크가 등록되었습니다.');
    }
    setToast(true);
    setBookmarkList(updateBookmark);
    localStorage.setItem('bookmark', JSON.stringify(updateBookmark));
  };

  const getCoinList = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${listNum}&page=1&price_change_percentage=1h,24h,7d`;
      const response = await axios.get(url);
      setCoinList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.code === 'ERR_NETWORK') {
        alert(
          '네트워크 오류가 발생했습니다. API를 빈번하게 호출할 경우 오류가 발생할 수 있습니다. \n\n 잠시 후 다시 이용해주세요.'
        );
      }
    }
  };

  useEffect(() => {
    getCoinList();
  }, [currency, listNum]);

  useEffect(() => {
    if (localStorage.getItem('bookmark')) {
      setBookmarkList(JSON.parse(localStorage.getItem('bookmark')));
    }
  }, []);

  if (isLoading) {
    return <>로딩 중 ...</>;
  }

  return (
    <>
      {toast && <Toast setToast={setToast} message={toastMessage} />}
      <div className={styles.selectBox}>
        <select>
          <option>전체보기</option>
          <option>북마크 보기</option>
        </select>
        <select
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
        >
          <option selected value={'krw'}>
            KRW 보기
          </option>
          <option value={'usd'}>USD 보기</option>
        </select>
        <select
          onChange={(e) => {
            setPerPage(parseInt(e.target.value));
            setListNum(parseInt(e.target.value));
          }}
        >
          <option value={10}>10개 보기</option>
          <option value={30}>30개 보기</option>
          <option selected value={50}>
            50개 보기
          </option>
        </select>
      </div>

      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th></th>
            <th>자산</th>
            <th></th>
            <th>Price</th>
            <th>1H</th>
            <th>24H</th>
            <th>7D</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {coinList.map((coin) => (
            <tr
              key={coin.id}
              onClick={() => {
                navigate(`/${coin.id}`);
              }}
            >
              <td
                className={
                  bookmarkList.includes(coin.id)
                    ? 'bookmark-active'
                    : 'bookmark-inactive'
                }
                onClick={(event) => handleBookmarkChange(event, coin.id)}
              >
                ★
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{formatNumber(coin.current_price, currency)}</td>
              <td
                style={{
                  color: getPercentColor(
                    coin.price_change_percentage_1h_in_currency
                  ),
                }}
              >
                {formatNumber(coin.price_change_percentage_1h_in_currency, '%')}
              </td>
              <td
                style={{
                  color: getPercentColor(
                    coin.price_change_percentage_24h_in_currency
                  ),
                }}
              >
                {formatNumber(
                  coin.price_change_percentage_24h_in_currency,
                  '%'
                )}
              </td>
              <td
                style={{
                  color: getPercentColor(
                    coin.price_change_percentage_7d_in_currency
                  ),
                }}
              >
                {formatNumber(coin.price_change_percentage_7d_in_currency, '%')}
              </td>
              <td>{formatNumber(coin.total_volume, currency)}</td>
            </tr>
          ))}
          <tr onClick={handleMoreClick}>+ 더보기</tr>
        </tbody>
      </table>
    </>
  );
}
