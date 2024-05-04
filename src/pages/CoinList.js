import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatNumber } from '../utils/common';

export default function CoinList() {
  const [coinList, setCoinList] = useState([]);
  const [currency, setCurrency] = useState('krw');

  const getCoinList = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=30&page=1&price_change_percentage=1h,24h,7d`;
      const response = await axios.get(url);
      const sortedData = response.data.sort(
        (a, b) => a.market_cap_rank - b.market_cap_rank
      );
      setCoinList(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoinList();
  }, [currency]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>1H</th>
            <th>24H</th>
            <th>7D</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {coinList.map((coin) => (
            <tr key={coin.id}>
              <td>
                {coin.name}
                {'\n'}
                {coin.symbol}
              </td>
              <td>{formatNumber(coin.current_price, currency)}</td>
              <td>
                {formatNumber(coin.price_change_percentage_1h_in_currency, '%')}
              </td>
              <td>
                {formatNumber(
                  coin.price_change_percentage_24h_in_currency,
                  '%'
                )}
              </td>
              <td>
                {formatNumber(coin.price_change_percentage_7d_in_currency, '%')}
              </td>
              <td>{formatNumber(coin.total_volume, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
