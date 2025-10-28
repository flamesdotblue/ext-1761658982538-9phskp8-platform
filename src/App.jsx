import { useEffect, useMemo, useRef, useState } from 'react';
import Hero from './components/Hero';
import StrategyForm from './components/StrategyForm';
import PricePanel from './components/PricePanel';
import ProfitCalculator from './components/ProfitCalculator';

const CHAINS = ['Ethereum', 'Arbitrum', 'Polygon'];
const DEXES = ['Uniswap v3', 'SushiSwap', 'Balancer'];
const PAIRS = ['ETH/USDC', 'WBTC/USDC', 'ARB/USDC', 'MATIC/USDC'];

const GAS_USDC_ESTIMATE = {
  Ethereum: 15,
  Arbitrum: 0.35,
  Polygon: 0.05,
};

export default function App() {
  const [chain, setChain] = useState('Ethereum');
  const [pair, setPair] = useState('ETH/USDC');
  const [amount, setAmount] = useState(1);
  const [dexA, setDexA] = useState('Uniswap v3');
  const [dexB, setDexB] = useState('SushiSwap');
  const [slippage, setSlippage] = useState(0.2); // percent per leg
  const [prices, setPrices] = useState({ A: 3500, B: 3492 }); // quote: USDC per base asset
  const basePriceRef = useRef(3500);

  // Derive which token is base from pair like "ETH/USDC"
  const baseToken = useMemo(() => pair.split('/')[0], [pair]);

  useEffect(() => {
    // Reset base price when pair changes
    const seed = {
      'ETH/USDC': 3500,
      'WBTC/USDC': 65000,
      'ARB/USDC': 0.9,
      'MATIC/USDC': 0.7,
    }[pair] || 100;
    basePriceRef.current = seed;
    setPrices({ A: seed * 1.001, B: seed * 0.999 });
  }, [pair]);

  useEffect(() => {
    const id = setInterval(() => {
      // Simulate independent price jitter per DEX around a drifting base
      const drift = (Math.random() - 0.5) * 0.002; // +-0.2%
      basePriceRef.current = Math.max(0.0001, basePriceRef.current * (1 + drift));
      const spreadBps = 0.0005 + Math.random() * 0.002; // 5-20 bps
      const mid = basePriceRef.current;
      const a = mid * (1 + (Math.random() - 0.5) * spreadBps * 2);
      const b = mid * (1 + (Math.random() - 0.5) * spreadBps * 2);
      setPrices({ A: a, B: b });
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const gasCost = GAS_USDC_ESTIMATE[chain] ?? 5;

  // Compute best direction and profit
  const calc = useMemo(() => {
    const { A, B } = prices;
    const lower = Math.min(A, B);
    const higher = Math.max(A, B);
    const buyOn = A < B ? 'A' : 'B';
    const sellOn = A < B ? 'B' : 'A';

    const tradeValueUSDC = lower * amount; // value of buying baseToken at lower dex
    const gross = (higher - lower) * amount; // gross spread capture in USDC

    const slippageCost = tradeValueUSDC * (slippage / 100) * 2; // two legs
    const net = gross - slippageCost - gasCost;

    const chosenPath = `${buyOn === 'A' ? dexA : dexB} → ${sellOn === 'A' ? dexA : dexB}`;

    const spreadPct = lower > 0 ? ((higher - lower) / lower) * 100 : 0;

    return {
      buyOn,
      sellOn,
      chosenPath,
      gross,
      net,
      slippageCost,
      spreadPct,
      tradeValueUSDC,
      lower,
      higher,
    };
  }, [prices, amount, slippage, gasCost, dexA, dexB]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />

      <main id="simulator" className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StrategyForm
              chains={CHAINS}
              dexes={DEXES}
              pairs={PAIRS}
              chain={chain}
              setChain={setChain}
              pair={pair}
              setPair={setPair}
              amount={amount}
              setAmount={setAmount}
              dexA={dexA}
              setDexA={setDexA}
              dexB={dexB}
              setDexB={setDexB}
              slippage={slippage}
              setSlippage={setSlippage}
            />

            <PricePanel
              dexA={dexA}
              dexB={dexB}
              prices={prices}
              baseToken={baseToken}
              pair={pair}
              spreadPct={calc.spreadPct}
            />
          </div>

          <div className="lg:col-span-1">
            <ProfitCalculator
              chain={chain}
              gasCost={gasCost}
              amount={amount}
              pair={pair}
              calc={calc}
            />
          </div>
        </div>

        <p className="mt-10 text-xs text-white/60">
          This interface is for educational and simulation purposes only. Crypto trading is risky. Always do your own research and comply with applicable laws and exchange terms.
        </p>
      </main>
    </div>
  );
}
