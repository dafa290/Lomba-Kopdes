import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MessageSquare, Sparkles, User, RefreshCw, ChevronRight } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiConsultantProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  "SETUJU",
  "Berapa HPP & harga jual ideal tempe ke SPPG?",
  "Bagaimana skema permodalan Yarnen hilirisasi?",
  "Apa itu sistem Kimi Thinking order split?"
];

export default function AiConsultant({ isOpen, onClose }: AiConsultantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Selamat datang di WhatsApp Koperasi **Renteng**! 🌾 
      
Saya **Asisten AI**, asisten virtual Koperasi Desa Anda. Saya siap membantu Bapak/Ibu menghubungkan produk pangan olahan (*hilirisasi*) dengan program **Dapur Makan Bergizi Gratis (SPPG)**.

Demi kenyamanan dan kepatuhan **Undang-Undang Pelindungan Data Pribadi (UU PDP No. 27/2022)**, mohon kirim pesan **SETUJU** terlebih dahulu agar saya dapat membuka info kapasitas produksi dan saldo simpanan Bapak/Ibu.`,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Map history to server schema
      const history = messages.slice(1).map(msg => ({
        role: msg.role,
        text: msg.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: history
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi asisten');
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Aduh maaf, Bapak/Ibu, sepertinya jaringan Asisten AI sedang sedikit terganggu di pusat desa. Silakan coba kirim ulang pertanyaan Bapak/Ibu, nggih?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const resetChat = () => {
    if (window.confirm("Bapak/Ibu ingin mengulang kembali sesi konsultasi dari awal?")) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: `Selamat datang kembali di Koperasi **Renteng**, Bapak/Ibu! 🌾 
          
Saya **Asisten AI**, siap membantu menghubungkan produk tani Bapak/Ibu langsung ke Dapur SPPG. Mohon ketik **SETUJU** di bawah untuk persetujuan privasi data (UU PDP).`,
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/70 z-50"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-emerald-950 border-l border-emerald-800 text-emerald-100 z-50 flex flex-col shadow-2xl"
            id="drawer-konsultasi"
          >
            {/* Drawer Header */}
            <div className="p-5 bg-emerald-900/60 border-b border-emerald-800/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border border-amber-400/50 shadow-md bg-emerald-950 flex items-center justify-center text-amber-400">
                    <Bot className="w-5 h-5 animate-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-950 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-white">Asisten AI</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-emerald-400 font-mono tracking-wider">RENTENG VIRTUAL OFFICER</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-reset-chat"
                  onClick={resetChat}
                  title="Ulang Konsultasi"
                  className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-200 hover:bg-emerald-900/40 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  id="btn-close-drawer"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-200 hover:bg-emerald-900/40 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable messages zone */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar bg-gradient-to-b from-emerald-950/60 to-emerald-950">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-end ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role !== 'user' && (
                    <div className="w-8 h-8 rounded-full shrink-0 border border-emerald-850 bg-emerald-950 flex items-center justify-center text-amber-400 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-900/10'
                        : 'bg-emerald-900/40 border border-emerald-800/40 text-emerald-100 rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5 opacity-60 text-[10px] uppercase tracking-wider font-semibold font-mono">
                      {msg.role === 'user' ? (
                        <>
                          <User className="w-3 h-3" /> Anda
                        </>
                      ) : (
                        <>
                          <Bot className="w-3 h-3 text-amber-400 animate-pulse" /> Asisten AI
                        </>
                      )}
                    </div>
                    
                    {/* Render message formatting properly */}
                    <div className="whitespace-pre-wrap font-sans text-emerald-100/95">
                      {msg.text}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center shrink-0 border border-emerald-700 shadow-sm text-xs font-bold text-emerald-100">
                      U
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-end justify-start">
                  <div className="w-8 h-8 rounded-full shrink-0 border border-emerald-850 bg-emerald-950 flex items-center justify-center text-amber-400 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-emerald-900/40 border border-emerald-800/40 rounded-2xl rounded-bl-none p-4 max-w-[78%]">
                    <div className="flex items-center gap-1 text-xs text-emerald-400">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="ml-1.5 font-mono text-[10px]">Asisten AI sedang merangkum jawaban...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat bottom action panel */}
            <div className="p-4 bg-emerald-900/30 border-t border-emerald-800/40 space-y-3">
              {/* Quick prompts chips (Only show if history is short or at the beginning for comfort) */}
              {messages.length < 5 && !isTyping && (
                <div className="space-y-1.5">
                  <p className="text-[10px] text-emerald-500 uppercase font-mono font-semibold">Tanya langsung ke Asisten AI:</p>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        type="button"
                        key={idx}
                        id={`btn-quick-prompt-${idx}`}
                        onClick={() => handleQuickPromptClick(prompt)}
                        className="text-left text-xs bg-emerald-900/40 hover:bg-emerald-800/40 text-emerald-300 hover:text-emerald-100 px-3 py-2 rounded-xl border border-emerald-800/30 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="truncate">{prompt}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-300 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  id="input-chat-message"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ketik pesan konsultasi Anda di sini..."
                  className="flex-1 bg-emerald-950 border border-emerald-900/50 rounded-xl px-4 py-3 text-sm text-emerald-100 placeholder-emerald-600/70 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 transition-all"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  id="btn-send-message"
                  disabled={!inputText.trim() || isTyping}
                  className="p-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900/20 disabled:text-emerald-700 text-white rounded-xl shadow-lg transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <p className="text-[10px] text-emerald-600 text-center leading-normal">
                Konsultasi ini dijamin aman, rahasia, dan dirancang khusus untuk gotong royong ekonomi desa.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
