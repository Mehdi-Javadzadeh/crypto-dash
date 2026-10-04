import CoinCart from '../components/CoinCart';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';
import Spinner from '../components/Spinner';

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) => {
  const filteredCoins = coins
    .filter((coinItems) => {
      return (
        coinItems.name.toLowerCase().includes(filter.toLowerCase()) ||
        coinItems.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      /* a= small item
         b= big item

         - for Desc equation has to be positive ==> b - a = positive placing at first
         - for Asc equation has to be negative ==> a - b = negative placint at first
      */
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <Spinner color="white" />}
      {error && <div className="error">{error}</div>}

      <div className="top-controls">
        <FilterInput filter={filter} setFilter={setFilter} />
        <LimitSelector limit={limit} setLimit={setLimit} />
        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coinItems) => (
              <CoinCart key={coinItems.id} coinItems={coinItems} />
            ))
          ) : (
            <p>No Matching Coins!</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
