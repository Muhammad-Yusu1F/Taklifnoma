import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Film, Copy, Send, Check, Heart } from 'lucide-react';

export default function ProposalTicket() {
  const [copied, setCopied] = useState(false);

  // Build the RSVP text message to copy or send to Muhammadyusuf
  const buildRSVPText = () => {
    let text = `Muhammadyusuf, uchrashuv taklifingizni mamnuniyat bilan qabul qildim! 🥰💖\n\n`;
    text += `🎫 CHIPTA MA'LUMOTLARI:\n`;
    text += `📍 Joy: Kinorom 🎬\n`;
    text += `🎬 Film: Romantik 💖\n`;
    text += `📅 Kun: 24-iyul\n`;
    text += `⌚ Vaqt: 19:00\n`;
    text += `💺 Joyimiz: Sening yoningda ❤️\n\n`;
    text += `Chiroyli bo'lib tayyorlanib kutaman! 💞💋`;
    return text;
  };

  const handleCopy = () => {
    const text = buildRSVPText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTelegram = () => {
    const text = buildRSVPText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    window.open('https://t.me/Yusu1F_m1', '_blank');
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Visual Ticket */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, cubicBezier: [0.2, 0.8, 0.2, 1] }}
        className="w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(155,0,68,0.12)] border border-rose-100 overflow-hidden relative ticket-mask p-6 md:p-8"
      >
        {/* Top Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center text-3xl shrink-0 shadow-sm border border-rose-100 animate-pulse">
            <Film className="w-7 h-7 text-primary-brand" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
              IKKI KISHILIK CHIPTA
            </span>
            <h3 className="font-display text-2xl font-bold text-dark-plum mt-1">
              Kinorom
            </h3>
          </div>
        </div>

        {/* Dashed Separator */}
        <div className="relative my-6">
          <div className="border-t-2 border-dashed border-rose-200 w-full h-0"></div>
          {/* Edge cutouts */}
          <div className="absolute -left-[37px] -top-3 w-6 h-6 bg-[#fff8f8] rounded-full border border-rose-100/30"></div>
          <div className="absolute -right-[37px] -top-3 w-6 h-6 bg-[#fff8f8] rounded-full border border-rose-100/30"></div>
        </div>

        {/* Ticket Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-1 border-b border-rose-50">
            <span className="text-xs font-bold text-rose-400 tracking-wider flex items-center gap-1.5 uppercase">
              <Film className="w-3.5 h-3.5" /> Seans
            </span>
            <span className="text-sm font-semibold text-dark-plum flex items-center gap-1 text-right">
              Romantik <Heart className="w-3.5 h-3.5 text-primary-brand fill-primary-brand inline" />
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-rose-50">
            <span className="text-xs font-bold text-rose-400 tracking-wider flex items-center gap-1.5 uppercase">
              <Calendar className="w-3.5 h-3.5" /> Qachon
            </span>
            <span className="text-sm font-semibold text-dark-plum text-right">
              24-iyul
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-rose-50">
            <span className="text-xs font-bold text-rose-400 tracking-wider flex items-center gap-1.5 uppercase">
              <Clock className="w-3.5 h-3.5" /> Vaqt
            </span>
            <span className="text-lg font-extrabold text-primary-brand text-right">
              19:00
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-xs font-bold text-rose-400 tracking-wider flex items-center gap-1.5 uppercase">
              <MapPin className="w-3.5 h-3.5" /> Joy
            </span>
            <span className="text-sm font-bold text-rose-600 flex items-center gap-1 text-right">
              sening yoningda <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 inline" />
            </span>
          </div>
        </div>

        {/* Decorative Ticket Corners */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-rose-200/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-rose-200/10 rounded-full blur-xl pointer-events-none"></div>
      </motion.div>

      {/* RSVP Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-dark-plum hover:bg-dark-plum/95 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              Chipta nusxalandi!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-rose-300" />
              Nusxa olish
            </>
          )}
        </button>

        <button
          onClick={handleSendTelegram}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0088cc] hover:bg-[#0088cc]/90 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4 text-white" />
          Telegramda yuborish
        </button>
      </div>
    </div>
  );
}
