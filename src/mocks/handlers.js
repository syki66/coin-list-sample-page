import { http, HttpResponse } from 'msw';
import krwData from './krw.json';
import usdData from './usd.json';
import coinData from './coinData.json';

export const handlers = [
  http.get('https://api.coingecko.com/api/v3/coins/markets', ({ request }) => {
    const url = new URL(request.url);
    const currency = url.searchParams.get('vs_currency');
    const perPage = url.searchParams.get('per_page');

    if (currency === 'krw') {
      return HttpResponse.json(krwData.slice(0, perPage));
    } else {
      return HttpResponse.json(usdData.slice(0, perPage));
    }
  }),

  http.get('https://api.coingecko.com/api/v3/coins/:slug', ({ params }) => {
    const { slug } = params;
    return HttpResponse.json(coinData[slug]);
  }),
];
