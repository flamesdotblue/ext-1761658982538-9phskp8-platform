import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[520px]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black pointer-events-none" />

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="backdrop-blur-[2px] bg-black/20 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 text-white/90">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Rocket className="h-5 w-5" />
              </span>
              <span className="uppercase tracking-widest text-xs text-white/70">Real-time Arbitrage Simulator</span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-5xl font-semibold leading-tight">
              Capture Crypto DEX Volatility with Smart Arbitrage
            </h1>
            <p className="mt-3 sm:mt-4 text-white/80 max-w-2xl">
              Monitor multi-DEX spreads, model slippage and gas, and estimate PnL before executing. A sleek, fast interface designed for on-chain strategists.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#simulator" className="inline-flex items-center justify-center rounded-xl bg-white text-black px-5 py-3 text-sm font-medium hover:bg-white/90 transition">
                Open Simulator
              </a>
              <a href="#simulator" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
