// backend/src/utils/alphavantage.js
const axios = require('axios');
const KEY = process.env.ALPHA_VANTAGE_KEY;

const fetchQuote = async (symbol) => {
  if (!KEY) throw new Error('No AlphaVantage key in env');
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${KEY}`;
  const res = await axios.get(url);
  const data = res.data?.['Global Quote'] || {};
  
  // Extract all available fields
  const price = parseFloat(data['05. price'] || data['05. price'] === 0 ? data['05. price'] : NaN);
  const change = parseFloat(data['09. change'] || data['09. change'] === 0 ? data['09. change'] : NaN);
  const changePercent = data['10. change percent'] || null;
  const open = parseFloat(data['02. open'] || data['02. open'] === 0 ? data['02. open'] : NaN);
  const high = parseFloat(data['03. high'] || data['03. high'] === 0 ? data['03. high'] : NaN);
  const low = parseFloat(data['04. low'] || data['04. low'] === 0 ? data['04. low'] : NaN);
  const volume = parseInt(data['06. volume'] || 0);
  
  return { 
    price: Number.isFinite(price) ? price : null, 
    change: Number.isFinite(change) ? change : null,
    changePercent: changePercent ? parseFloat(changePercent.replace('%', '')) : null,
    open: Number.isFinite(open) ? open : null,
    high: Number.isFinite(high) ? high : null,
    low: Number.isFinite(low) ? low : null,
    volume: Number.isFinite(volume) ? volume : null
  };
};

const fetchDailyHistory = async (symbol) => {
  if (!KEY) throw new Error('No AlphaVantage key in env');
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${encodeURIComponent(symbol)}&outputsize=compact&apikey=${KEY}`;
  const res = await axios.get(url);
  const raw = res.data?.['Time Series (Daily)'] || {};
  // convert to array of { date, close }
  const series = Object.keys(raw).map(date => ({ date, close: parseFloat(raw[date]['5. adjusted close']) }));
  series.sort((a,b)=> new Date(a.date) - new Date(b.date));
  return series;
};

module.exports = { fetchQuote, fetchDailyHistory };
