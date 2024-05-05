const addCommasAndDecimal = (number) => {
  const numStr = number.toString();
  const regex = /\B(?=(\d{3})+(?!\d))/g;

  if (numStr.indexOf('.') !== -1) {
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(regex, ',');
    parts[1] = parts[1] ? parts[1].slice(0, 2) : '00';

    return parts.join('.');
  } else {
    return numStr.replace(regex, ',');
  }
};

const formatNumber = (number, currency) => {
  const currencyObject = {
    krw: '₩',
    usd: '$',
    percent: '%',
    undefined: '',
  };

  if (currency === '%') {
    return addCommasAndDecimal(number) + '%';
  } else {
    return currencyObject[currency] + addCommasAndDecimal(number);
  }
};

const getPercentColor = (number) => {
  const _number = addCommasAndDecimal(number).replace(/[%\,]/g, '');

  if (_number > 0) {
    return 'red';
  } else if (_number < 0) {
    return 'blue';
  } else {
    return 'black';
  }
};

const addCommas = (number) => {
  const numStr = number.toString();
  const parts = numStr.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
};

const removeCommas = (str) => {
  return str.replace(/,/g, '');
};

export {
  addCommasAndDecimal,
  formatNumber,
  getPercentColor,
  addCommas,
  removeCommas,
};
