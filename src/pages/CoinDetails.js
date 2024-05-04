import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CoinDetails.module.css';

export default function CoinDetails() {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [coin, setCoin] = useState({});

  const getCoinDetail = async (id) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/coins/${id}`;
      const response = await axios.get(url);
      setCoin(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoinDetail(params.id);
  }, []);

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
          <select>
            <option>KRW 보기</option>
            <option>USD 보기</option>
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
              <div>2000000000만원</div>
              <div>0.8%</div>
            </div>
            <div className={styles.coinPrice}>
              <div>1.00000000000btc</div>
              <div>0.1%</div>
            </div>
          </div>
          <div>
            <div className={styles.marketCap}>
              <div>시가총액</div>
              <div>3842374827349</div>
            </div>
            <div className={styles.volume}>
              <div>24시간 거래대금</div>
              <div>9999999999999</div>
            </div>
          </div>
        </section>
        <section className={styles.calculator}>
          <h2>가격 계산</h2>
          <div className={styles.inputContainer}>
            <div>
              <label htmlFor="coinInput">BTC</label>
              <span>
                <input type="text" id="coinInput" />
              </span>
            </div>
            <div>↔</div>
            <div>
              <label htmlFor="textInput">KRW</label>
              <span>
                <input type="text" id="textInput" />
              </span>
            </div>
          </div>
        </section>

        <section className={styles.description}>
          <div>설명보기 </div>
          <p>{coin.description.ko}</p>
        </section>
      </div>
    </>
  );
}
