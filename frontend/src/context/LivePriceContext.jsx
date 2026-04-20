import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { cryptoData as BASE_DATA } from '../data/cryptoData';
import { apiRequest } from '../config/api';

const LivePricesContext = createContext([]);
const CryptoFeedsContext = createContext({
  gainers: [],
  newListings: [],
  refreshAllFeeds: async () => {},
});

function normalizeCoin(coin) {
  const bySymbol = BASE_DATA.find(
    c => String(c.symbol).toUpperCase() === String(coin?.symbol || '').toUpperCase()
  );
  const byName = BASE_DATA.find(
    c => String(c.name).toLowerCase() === String(coin?.name || '').toLowerCase()
  );
  const fallback = bySymbol || byName || {};

  const symbol = String(coin?.symbol || fallback.symbol || '').toUpperCase();
  const name = coin?.name || fallback.name || symbol || 'Unknown';
  const id =
    coin?.id ||
    fallback.id ||
    (name || symbol).toLowerCase().replace(/\s+/g, '-');

  const price = Number(coin?.price ?? fallback.price ?? 0);
  const change24h = Number(coin?.change24h ?? fallback.change24h ?? 0);

  return {
    ...fallback,
    ...coin,
    id,
    name,
    symbol,
    price: Number.isFinite(price) ? price : 0,
    change24h: Number.isFinite(change24h) ? change24h : 0,
    marketCap: Number(coin?.marketCap ?? fallback.marketCap ?? 0),
    volume24h: Number(coin?.volume24h ?? fallback.volume24h ?? 0),
    description: coin?.description || fallback.description || '',
  };
}

export function LivePricesProvider({ children }) {
  const [prices, setPrices] = useState(() => BASE_DATA.map(normalizeCoin));
  const [gainers, setGainers] = useState([]);
  const [newListings, setNewListings] = useState([]);

  const loadAll = async () => {
    const res = await apiRequest('/api/crypto');
    const items = (res?.data || []).map(normalizeCoin);
    if (items.length > 0) setPrices(items);
  };

  const loadGainers = async () => {
    const res = await apiRequest('/api/crypto/gainers');
    setGainers((res?.data || []).map(normalizeCoin));
  };

  const loadNewListings = async () => {
    const res = await apiRequest('/api/crypto/new');
    setNewListings((res?.data || []).map(normalizeCoin));
  };

  const refreshAllFeeds = async () => {
    await Promise.allSettled([loadAll(), loadGainers(), loadNewListings()]);
  };

  useEffect(() => {
    refreshAllFeeds();
    const id = setInterval(refreshAllFeeds, 15000);
    return () => clearInterval(id);
  }, []);

  const feedsValue = useMemo(
    () => ({
      gainers,
      newListings,
      refreshAllFeeds,
    }),
    [gainers, newListings]
  );

  return (
    <LivePricesContext.Provider value={prices}>
      <CryptoFeedsContext.Provider value={feedsValue}>
        {children}
      </CryptoFeedsContext.Provider>
    </LivePricesContext.Provider>
  );
}

export function useLivePrices() {
  return useContext(LivePricesContext);
}

export function useCryptoFeeds() {
  return useContext(CryptoFeedsContext);
}
