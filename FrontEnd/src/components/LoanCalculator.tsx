import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
import { LoanSimResult } from '../types';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // Default Rp 5.000.000
  const [tenure, setTenure] = useState<number>(6); // Default 6 months
  const [loanType, setLoanType] = useState<'yarnen' | 'umkm'>('yarnen'); // Yarnen is local favorite
  const [result, setResult] = useState<LoanSimResult | null>(null);

  // Formatting helpers
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  useEffect(() => {
    let monthlyInstallment = 0;
    let totalInterest = 0;
    let totalRepayment = 0;

    if (loanType === 'yarnen') {
      // Yarnen: Pay after harvest (usually 6 months). Interest is flat 6% annual (0.5% monthly).
      // Zero monthly installments; everything is paid in lump sum at the end.
      const interestRate = 0.06 * (tenure / 12); // Proportional flat annual interest
      totalInterest = Math.round(loanAmount * interestRate);
      totalRepayment = loanAmount + totalInterest;
      monthlyInstallment = 0; // No monthly installment
    } else {
      // UMKM: Standard monthly installment. Interest is low 0.5% flat per month (6% flat annual).
      const monthlyRate = 0.005; // 0.5% per month
      totalInterest = Math.round(loanAmount * monthlyRate * tenure);
      totalRepayment = loanAmount + totalInterest;
      monthlyInstallment = Math.round(totalRepayment / tenure);
    }

    setResult({
      loanAmount,
      tenureMonths: tenure,
      monthlyInstallment,
      totalInterest,
      totalRepayment
    });
  }, [loanAmount, tenure, loanType]);

  return (
    <div className="bg-[#F3F1EA] border border-art-charcoal/10 rounded-3xl p-6 md:p-8 shadow-sm relative" id="kalkulator-koperasi">
      


      <div className="flex items-center gap-3 mb-8 border-b border-art-charcoal/10 pb-4">
        <div className="w-12 h-12 bg-art-sage rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-inner">
          %
        </div>
        <div>
          <h3 className="font-serif italic text-2xl text-art-charcoal">Simulasi Pembiayaan Rakyat</h3>
          <p className="text-xs uppercase tracking-widest text-art-charcoal/60 mt-0.5">Rencanakan permodalan tani & UMKM secara mandiri</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Panel */}
        <div className="lg:col-span-7 space-y-8">
          {/* Loan Type Selector */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-art-charcoal/60 mb-3">
              Jenis Pembiayaan Desa
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                id="btn-yarnen"
                onClick={() => { setLoanType('yarnen'); if (tenure > 12) setTenure(6); }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  loanType === 'yarnen'
                    ? 'bg-art-sage border-art-sage text-white shadow-md'
                    : 'bg-white border-art-charcoal/10 text-art-charcoal/70 hover:border-art-charcoal/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif italic text-base">Sistem Yarnen</span>
                  {loanType === 'yarnen' && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <p className="text-[11px] leading-relaxed opacity-80">Bayar Setelah Panen. Sangat selaras dengan musim tanam padi/cabai.</p>
              </button>

              <button
                type="button"
                id="btn-umkm"
                onClick={() => setLoanType('umkm')}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  loanType === 'umkm'
                    ? 'bg-art-sage border-art-sage text-white shadow-md'
                    : 'bg-white border-art-charcoal/10 text-art-charcoal/70 hover:border-art-charcoal/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif italic text-base">Modal UMKM</span>
                  {loanType === 'umkm' && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <p className="text-[11px] leading-relaxed opacity-80">Angsuran Bulanan. Sangat pas untuk usaha kelontong, kuliner & warung.</p>
              </button>
            </div>
          </div>

          {/* Loan Amount Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="range-loan" className="text-[10px] uppercase tracking-[0.2em] font-bold text-art-charcoal/60">
                Jumlah Permodalan
              </label>
              <span className="font-mono text-art-charcoal font-bold bg-[#E6E3D8] px-3 py-1 rounded-lg border border-art-charcoal/10">
                {formatRupiah(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              id="range-loan"
              min="1000000"
              max="30000000"
              step="500000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-art-warm-1 rounded-lg appearance-none cursor-pointer accent-art-sage"
            />
            <div className="flex justify-between text-[10px] text-art-charcoal/40 font-mono mt-1.5">
              <span>Rp 1 Juta</span>
              <span>Rp 15 Juta</span>
              <span>Rp 30 Juta</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="range-tenure" className="text-[10px] uppercase tracking-[0.2em] font-bold text-art-charcoal/60">
                Tenor / Jangka Waktu
              </label>
              <span className="font-mono text-art-charcoal font-bold bg-[#E6E3D8] px-3 py-1 rounded-lg border border-art-charcoal/10">
                {tenure} Bulan
              </span>
            </div>
            <input
              type="range"
              id="range-tenure"
              min={3}
              max={loanType === 'yarnen' ? 12 : 24}
              step={3}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-1.5 bg-art-warm-1 rounded-lg appearance-none cursor-pointer accent-art-sage"
            />
            <div className="flex justify-between text-[10px] text-art-charcoal/40 font-mono mt-1.5">
              <span>3 Bln</span>
              {loanType === 'yarnen' ? (
                <>
                  <span>6 Bln (Rata-rata panen)</span>
                  <span>12 Bln</span>
                </>
              ) : (
                <>
                  <span>12 Bln</span>
                  <span>24 Bln</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/50 border border-art-charcoal/5 p-4 rounded-xl text-xs text-art-charcoal/80 leading-relaxed">
            <Info className="w-4 h-4 shrink-0 text-art-sage mt-0.5" />
            <p>
              {loanType === 'yarnen' 
                ? "Sistem Yarnen mengizinkan Bapak/Ibu membayar seluruh nominal pinjaman beserta bunga setelah hasil panen terjual. Tidak ada kewajiban cicilan bulanan yang memberatkan."
                : "Bagi hasil flat 0.5% per bulan merupakan bentuk gotong royong warga desa demi permodalan usaha mandiri yang produktif dan bebas beban bunga riba komersial."
              }
            </p>
          </div>
        </div>

        {/* Right Output Display Card */}
        <div className="lg:col-span-5 bg-art-sage text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
          {/* Subtle design element */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

          {result && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Rencana Angsuran</span>
                <div className="mt-2">
                  {loanType === 'yarnen' ? (
                    <div>
                      <p className="text-4xl font-serif italic text-white tracking-tight">Rp 0</p>
                      <p className="text-xs text-white/70 mt-1">Selesai sekali bayar pasca-panen</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-4xl font-mono font-bold text-white tracking-tight">{formatRupiah(result.monthlyInstallment)}</p>
                      <p className="text-xs text-white/70 mt-1">angsuran flat per bulan</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-[1px] bg-white/20 w-full" />

              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs font-mono">
                <div>
                  <p className="text-white/60 uppercase text-[9px] tracking-wider mb-0.5">Jumlah Pokok</p>
                  <p className="text-white font-bold">{formatRupiah(result.loanAmount)}</p>
                </div>
                <div>
                  <p className="text-white/60 uppercase text-[9px] tracking-wider mb-0.5">Bunga Bagi Hasil</p>
                  <p className="text-white font-bold">
                    {formatRupiah(result.totalInterest)}
                    <span className="text-[10px] text-white/60 font-normal ml-1">({loanType === 'yarnen' ? `${(0.5 * tenure).toFixed(1)}%` : `${0.5}%/bln`})</span>
                  </p>
                </div>
                <div>
                  <p className="text-white/60 uppercase text-[9px] tracking-wider mb-0.5">Jangka Waktu</p>
                  <p className="text-white font-bold">{result.tenureMonths} Bulan</p>
                </div>
                <div>
                  <p className="text-white/60 uppercase text-[9px] tracking-wider mb-0.5">Total Pengembalian</p>
                  <p className="text-white font-bold text-sm underline decoration-white/30 underline-offset-4">{formatRupiah(result.totalRepayment)}</p>
                </div>
              </div>

              <div className="h-[1px] bg-white/20 w-full" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Calendar className="w-4 h-4 text-white/60 shrink-0" />
                  <span>Estimasi Pelunasan: <strong className="text-white font-serif italic">Panen {new Date(Date.now() + tenure * 30 * 24 * 60 * 60 * 1000).toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <TrendingUp className="w-4 h-4 text-white/60 shrink-0" />
                  <span>Suku Bunga Koperasi: <strong className="text-white font-serif italic">Transparan & Berkah</strong></span>
                </div>
              </div>

              <a
                href={`https://wa.me/6281234567890?text=Halo%20Koperasi%20Renteng,%20saya%20tertarik%20mengajukan%20pembiayaan%20${loanType === 'yarnen' ? 'Yarnen' : 'UMKM'}%20sebesar%20${formatRupiah(loanAmount)}%20dengan%20tenor%20${tenure}%20Bulan.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-[#F9F7F2] hover:bg-white text-art-charcoal font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-center text-[10px] uppercase tracking-[0.25em] cursor-pointer mt-4"
              >
                Ajukan Pembiayaan via WA
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
