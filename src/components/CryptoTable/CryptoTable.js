import styles from './CryptoTable.module.css';
import { formatNumber, getPercentColor } from '../../utils/common';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Toast from '../Toast/Toast';

export default function CryptoTable({
  headLabel,
  coinList,
  currency,
  showStatus,
}) {
  const navigate = useNavigate();

  const [bookmarkList, setBookmarkList] = useState([]);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  useEffect(() => {
    if (localStorage.getItem('bookmark')) {
      setBookmarkList(JSON.parse(localStorage.getItem('bookmark')));
    }
  }, []);

  return (
    <>
      {toast && <Toast setToast={setToast} message={toastMessage} />}

      <table className={styles.tableContainer}>
        <thead>
          <tr>
            {headLabel.map((label) => (
              <td>{label}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {coinList.map((coin) => {
            if (showStatus === 'bookmark' && !bookmarkList.includes(coin.id)) {
              return null;
            }

            return (
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
                  {formatNumber(
                    coin.price_change_percentage_1h_in_currency,
                    '%'
                  )}
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
                  {formatNumber(
                    coin.price_change_percentage_7d_in_currency,
                    '%'
                  )}
                </td>
                <td>{formatNumber(coin.total_volume, currency)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
