import { useMemo } from 'react';
import { Rocket } from 'lucide-react';

function fmt(n, d = 2) {
  if (n === undefined || n === null || Number.isNaN(n)) return '-';
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
}

export default function ProfitCalculator({ chain, gasCost, amount, pair, calc }) {
  const badge = useMemo(() => {
    const net = calc.net;
    if (net > gasCost * 2) return { label: 'Opportunity', className: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30' };
    if (net > 0) return { label: 'Marginal', className: 'bg-amber-400/20 text-amber-300 border-amber-400/30' };
    return { label: 'Not Profitable', className: 'bg-rose-400/20 text-rose-300 border-rose-400/30' };
  }, [calc.net, gasCost]);

  const direction = useMemo(() => {
    return calc.buyOn === 'A' ? 'Buy on A → Sell on B' : 'Buy on B → Sell on A';
  }, [calc.buyOn]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 sticky top-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Profit Estimator</h2>
        <span className={`text-xs px-2.5 py-1 rounded-full border ${badge.className}`}>{badge.label}</span>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <Row label="Trade Size">
          {fmt(amount, 4)} {pair.split('/')[0]}
        </Row>
        <Row label="Buy @ Lower Price">
          {fmt(calc.lower, 4)} USDC
        </Row>
        <Row label="Sell @ Higher Price">
          {fmt(calc.higher, 4)} USDC
        </Row>
        <Row label="Spread Capture">
          {fmt(calc.gross, 4)} USDC ({fmt(calc.spreadPct, 3)}%)
        </Row>
        <Row label="Slippage (2 legs)">
          -{fmt(calc.slippageCost, 4)} USDC
        </Row>
        <Row label={`Gas • ${chain}`}>
          -{fmt(gasCost, 2)} USDC
        </Row>
        <div className="h-px bg-white/10 my-2" />
        <Row label="Est. Net PnL" strong>
          <span className={calc.net >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{fmt(calc.net, 4)} USDC</span>
        </Row>
        <Row label="Route">
          {direction} • {calc.chosenPath}
        </Row>
      </div>

      <button
        className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-3 text-sm font-medium hover:bg-white/90 transition"
        onClick={() => alert('This is a simulation environment. No trades are executed.')}
      >
        <Rocket className="h-4 w-4" />
        Simulate Arbitrage
      </button>

      <p className="mt-3 text-xs text-white/60">
        Note: Prices are simulated for demonstration. Integration with on-chain pricing and routing can replace this module.
      </p>
    </div>
  );
}

function Row({ label, children, strong }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/60">{label}</span>
      <span className={strong ? 'font-semibold' : ''}>{children}</span>
    </div>
  );
}
