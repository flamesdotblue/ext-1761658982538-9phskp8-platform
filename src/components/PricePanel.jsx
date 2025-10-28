import { Activity } from 'lucide-react';

function fmt(n, d = 2) {
  if (n === undefined || n === null || Number.isNaN(n)) return '-';
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
}

export default function PricePanel({ dexA, dexB, prices, baseToken, pair, spreadPct }) {
  const { A, B } = prices;
  const updatedAt = new Date().toLocaleTimeString();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <Activity className="h-4 w-4" />
        </span>
        <h2 className="text-lg font-medium">Live Quotes</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-sm text-white/60">{dexA}</div>
          <div className="mt-1 text-2xl font-semibold">{fmt(A, 4)} USDC</div>
          <div className="text-xs text-white/50">Quote: 1 {baseToken} → USDC</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-sm text-white/60">{dexB}</div>
          <div className="mt-1 text-2xl font-semibold">{fmt(B, 4)} USDC</div>
          <div className="text-xs text-white/50">Quote: 1 {baseToken} → USDC</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-white/70">Pair: {pair}</span>
        <span className="text-white/70">Spread: <span className={spreadPct > 0 ? 'text-emerald-400' : 'text-white/70'}>{fmt(spreadPct, 3)}%</span></span>
        <span className="text-white/50">Updated: {updatedAt}</span>
      </div>
    </div>
  );
}
