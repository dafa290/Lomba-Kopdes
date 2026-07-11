import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Cpu, Bell, Shield, Smartphone } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [parallelOrchestra, setParallelOrchestra] = useState(true);
  const [waNotif, setWaNotif] = useState(true);
  const [autoSync, setAutoSync] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 z-[100]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0C683B] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-[#EAF4EE]" />
                <div>
                  <h2 className="font-bold text-lg leading-tight">Pengaturan Sistem</h2>
                  <p className="text-emerald-100 text-xs">Konfigurasi admin KUD & integrasi AI</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Setting Item 1 */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                    <Cpu className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Parallel Orchestra (AI)</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Izinkan AI memproses data panen dan pencatatan utang secara paralel untuk performa maksimal.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setParallelOrchestra(!parallelOrchestra)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${parallelOrchestra ? 'bg-[#0C683B]' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${parallelOrchestra ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Setting Item 2 */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Notifikasi WhatsApp (Baileys)</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Kirim tagihan renteng secara otomatis ke WhatsApp anggota melalui integrasi Baileys.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setWaNotif(!waNotif)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${waNotif ? 'bg-[#0C683B]' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${waNotif ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Setting Item 3 */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Sinkronisasi Pusat</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Otomatis sinkronkan laporan kas KUD ke server SPPG pusat setiap jam 12 malam.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setAutoSync(!autoSync)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoSync ? 'bg-[#0C683B]' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoSync ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0C683B] text-white hover:bg-[#074e2a] transition-colors shadow-lg"
              >
                Simpan Pengaturan
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
