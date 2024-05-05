import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CoinDetails.module.css';
import {
  formatNumber,
  getPercentColor,
  addCommas,
  removeCommas,
} from '../utils/common';

export default function CoinDetails() {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [coin, setCoin] = useState({});
  const [currency, setCurrency] = useState('krw');
  const [description, setDescription] = useState('');
  const [descOpen, setDescOpen] = useState(false);
  const [inputs, setInputs] = useState({
    coin: '',
    currency: '',
  });

  const toggleDescOpen = () => {
    setDescOpen(!descOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const price = coin.market_data.current_price[currency];

    const numValue = removeCommas(value);

    const coinRegex = /^(?!0\d)\d{0,13}(?:\.\d{0,8})?$/g;
    const currencyRegex = /^(?!0\d)\d{0,13}(?:\.\d{0,2})?$/g;
    if (name === 'coin' && !coinRegex.test(numValue)) {
      return false;
    }
    if (name === 'currency' && !currencyRegex.test(numValue)) {
      return false;
    }

    if (name === 'coin') {
      const newCurrencyValue = Number.isInteger(numValue * price)
        ? (numValue * price).toString()
        : (numValue * price).toFixed(2);
      setInputs({ coin: numValue, currency: newCurrencyValue });
    }
    if (name === 'currency') {
      const newCoinValue = Number.isInteger(numValue * price)
        ? (numValue * price).toString()
        : (numValue * price).toFixed(8);
      setInputs({ currency: numValue, coin: newCoinValue });
    }
  };

  const getCoinDetail = async (id) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/coins/${id}`;
      const response = await axios.get(url);
      setCoin(response.data);
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
              <div
                style={{
                  color: getPercentColor(
                    coin.market_data.price_change_percentage_24h_in_currency[
                      currency
                    ]
                  ),
                }}
              >
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
              <div
                style={{
                  color: getPercentColor(
                    coin.market_data.price_change_percentage_24h
                  ),
                }}
              >
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
                <input
                  name="coin"
                  onChange={handleInputChange}
                  value={addCommas(inputs.coin)}
                  id="coinInput"
                />
              </span>
            </div>
            <div>↔</div>
            <div>
              <label htmlFor="textInput">{currency.toUpperCase()}</label>
              <span>
                <input
                  name="currency"
                  onChange={handleInputChange}
                  value={addCommas(inputs.currency)}
                  id="textInput"
                />
              </span>
            </div>
          </div>
        </section>

        {description && (
          <section className={styles.description}>
            <div onClick={toggleDescOpen}>설명보기 {descOpen ? '▲' : '▼'}</div>
            {descOpen && (
              <p dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </section>
        )}
      </div>
    </>
  );
}
