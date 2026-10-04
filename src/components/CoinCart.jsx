import { Link } from 'react-router';

const CoinCart = ({ coinItems }) => {
  return (
    <Link to={`/coin/${coinItems.id}`}>
      <div className="coin-card">
        <div className="coin-header">
          <img
            className="coin-image"
            src={coinItems.image}
            alt={coinItems.className}
          />
          <div>
            <h2>{coinItems.name}</h2>
            <p className="symbol">{coinItems.symbol.toUpperCase()}</p>
          </div>
        </div>
        <p>Price: ${coinItems.current_price.toLocaleString()}</p>
        <p
          className={
            coinItems.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
          }
        >
          {/* {coinItems.price_change_percentage_24h.toFixed(2)}% */}
          {coinItems.price_change_percentage_24h !== null
            ? `${coinItems.price_change_percentage_24h.toFixed(2)}%`
            : 'N/A'}
        </p>

        <p>Market Cap: {coinItems.market_cap.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default CoinCart;
