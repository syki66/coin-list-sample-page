import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CoinDetails.module.css';
import { formatNumber } from '../utils/common';

export default function CoinDetails() {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [coin, setCoin] = useState({});
  const [currency, setCurrency] = useState('krw');
  const [description, setDescription] = useState('');
  const [descOpen, setDescOpen] = useState(false);

  const toggleDescOpen = () => {
    setDescOpen(!descOpen);
  };

  const getCoinDetail = async (id) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/coins/${id}`;
      const response = await axios.get(url);
      setCoin(response.data);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getCoinDetail(params.id);
  }, []);

  useEffect(() => {
    if (coin.description) {
      let _description = '';
      if (coin.description.en) {
        _description = coin.description.en;
      }
      if (coin.description.ko) {
        _description = coin.description.ko;
      }

      setDescription(_description.replace(/\r\n/g, '<br>'));
    }
  }, [coin]);

  if (isLoading) {
    return <>로딩중</>;
  }

  return (
    <>
      <div className={styles.container}>
        <section className={styles.title}>
          <span className={styles.bookmarkInactive}>★</span>
          <img src={coin.image.small} />
          <h1>
            {coin.localization.ko} ({coin.symbol.toUpperCase()})
          </h1>
        </section>

        <section className={styles.currency}>
          <select
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
          >
            <option value="krw">KRW 보기</option>
            <option value="usd">USD 보기</option>
          </select>
        </section>

        <section className={styles.info}>
          <div>
            <div>시가총액 Rank</div>
            <div>Rank #{coin.market_cap_rank}</div>
          </div>
          <div>
            <div>웹사이트</div>
            <div>{coin.links.homepage[0]}</div>
          </div>
        </section>

        <section className={styles.priceContainer}>
          <div>
            <div className={styles.currencyPrice}>
              <div>
                {formatNumber(
                  coin.market_data.current_price[currency],
                  currency
                )}
              </div>
              <div>
                {formatNumber(
                  coin.market_data.price_change_percentage_24h_in_currency[
                    currency
                  ],
                  '%'
                )}
              </div>
            </div>
            <div className={styles.coinPrice}>
              <div>1.00000000 {coin.symbol.toUpperCase()}</div>
              <div>
                {formatNumber(
                  coin.market_data.price_change_percentage_24h,
                  '%'
                )}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.marketCap}>
              <div>시가총액</div>
              <div>
                {formatNumber(coin.market_data.market_cap[currency], currency)}
              </div>
            </div>
            <div className={styles.volume}>
              <div>총 거래대금</div>
              <div>
                {formatNumber(
                  coin.market_data.total_volume[currency],
                  currency
                )}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.calculator}>
          <h2>가격 계산</h2>
          <div className={styles.inputContainer}>
            <div>
              <label htmlFor="coinInput">{coin.symbol.toUpperCase()}</label>
              <span>
                <input type="text" id="coinInput" />
              </span>
            </div>
            <div>↔</div>
            <div>
              <label htmlFor="textInput">{currency.toUpperCase()}</label>
              <span>
                <input type="text" id="textInput" />
              </span>
            </div>
          </div>
        </section>

        {description && (
          <section className={styles.description}>
            <div onClick={toggleDescOpen}>설명보기 ▼</div>
            {descOpen && (
              <p dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </section>
        )}
      </div>
    </>
  );
}
