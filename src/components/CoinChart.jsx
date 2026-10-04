import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import Spinner from './Spinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
);

const COIN_API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch(
        `${COIN_API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`,
      );
      const data = await res.json();

      const prices = data.prices.map((pricesItem) => ({
        // x=> TimeStamp / y=> Price
        x: pricesItem[0],
        y: pricesItem[1],
      }));

      //   console.log(prices);

      setChartData({
        datasets: [
          {
            label: 'Price (USD)',
            data: prices,
            fill: true,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      });

      setLoading(false);
    };

    fetchPrices();
  }, [coinId]);

  return (
    <div className="pt-6 pb-6 w-full flex items-center justify-center">
      {loading ? (
        <Spinner />
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { mode: 'index', intersect: false },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 7,
                },
              },

              y: {
                ticks: {
                  callback: (value) => `$${value.toLocaleString()}`,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default CoinChart;
