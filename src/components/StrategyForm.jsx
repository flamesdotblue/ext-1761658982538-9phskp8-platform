import { Settings, Wallet } from 'lucide-react';

export default function StrategyForm({
  chains,
  dexes,
  pairs,
  chain,
  setChain,
  pair,
  setPair,
  amount,
  setAmount,
  dexA,
  setDexA,
  dexB,
  setDexB,
  slippage,
  setSlippage,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <Settings className="h-4 w-4" />
        </span>
        <h2 className="text-lg font-medium">Strategy Setup</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm text-white/70">Network</label>
          <select value={chain} onChange={(e) => setChain(e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20">
            {chains.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-white/70">Pair</label>
          <select value={pair} onChange={(e) => setPair(e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20">
            {pairs.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-white/70">Trade Size ({pair.split('/')[0]})</label>
          <div className="mt-1 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                min="0"
                step="0.0001"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60">{pair.split('/')[0]}</span>
            </div>
            <button
              onClick={() => setAmount((prev) => Number(((prev || 0) * 2).toFixed(4))) }
              className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition text-sm"
            >
              x2
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-white/70">Buy on</label>
          <select value={dexA} onChange={(e) => setDexA(e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20">
            {dexes.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-white/70">Sell on</label>
          <select value={dexB} onChange={(e) => setDexB(e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20">
            {dexes.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-white/70">Max Slippage per leg</label>
          <div className="mt-1 relative">
            <input
              type="number"
              min="0"
              step="0.01"
              value={slippage}
              onChange={(e) => setSlippage(Math.max(0, Number(e.target.value) || 0))}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60">%</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-white/70">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          <span>Simulated mode • No wallet connected</span>
        </div>
        <span>Adjust parameters to explore profitability.</span>
      </div>
    </div>
  );
}
