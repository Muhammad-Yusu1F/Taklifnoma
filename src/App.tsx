import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  RefreshCw, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Clapperboard, 
  Clock, 
  ArrowRight, 
  Tv, 
  Skull, 
  HelpCircle, 
  Sofa, 
  Ban, 
  MessageCircleHeart,
  User,
  PartyPopper
} from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import ProposalTicket from './components/ProposalTicket';

export default function App() {
  // Navigation state: 'intro' | 'q1' | 'q2' | 'q3' | 'q4' | 'success'
  const [screen, setScreen] = useState<'intro' | 'q1' | 'q2' | 'q3' | 'q4' | 'success'>('intro');

  // Heart burst states for the interactive burst button
  const [burstHearts, setBurstHearts] = useState<{ id: number; left: number; delay: number; scale: number }[]>([]);

  // Track the position offsets of elusive buttons (independent for button 1 and button 2)
  const [elusiveOffsetQ1_1, setElusiveOffsetQ1_1] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [elusiveOffsetQ1_2, setElusiveOffsetQ1_2] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  const [elusiveOffsetQ2_1, setElusiveOffsetQ2_1] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [elusiveOffsetQ2_2, setElusiveOffsetQ2_2] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [elusiveOffsetQ3_1, setElusiveOffsetQ3_1] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [elusiveOffsetQ3_2, setElusiveOffsetQ3_2] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [elusiveOffsetQ4_1, setElusiveOffsetQ4_1] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [elusiveOffsetQ4_2, setElusiveOffsetQ4_2] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Track interaction attempts for elusive buttons
  const [q1Attempts, setQ1Attempts] = useState<number>(0);
  const [q2Attempts, setQ2Attempts] = useState<number>(0);
  const [q3Attempts, setQ3Attempts] = useState<number>(0);
  const [q4Attempts, setQ4Attempts] = useState<number>(0);

  // Trigger heart burst
  const handleHeartBurst = () => {
    const newHearts = Array.from({ length: 30 }).map((_, idx) => ({
      id: Date.now() + idx,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      scale: Math.random() * 0.8 + 0.6,
    }));
    setBurstHearts(newHearts);
    // Clear after animation is finished
    setTimeout(() => {
      setBurstHearts([]);
    }, 4000);
  };

  // Helpers to trigger fast left/right movement for elusive buttons
  const moveButtonLeft = (setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
    const randomX = -200 - Math.random() * 180; // Run away far to the left (-200px to -380px)
    const randomY = (Math.random() - 0.5) * 160;
    setOffset({ x: randomX, y: randomY });
  };

  const moveButtonRight = (setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
    const randomX = 200 + Math.random() * 180; // Run away far to the right (+200px to +380px)
    const randomY = (Math.random() - 0.5) * 160;
    setOffset({ x: randomX, y: randomY });
  };

  const handleElusiveInteraction = (
    attempts: number,
    setAttempts: React.Dispatch<React.SetStateAction<number>>,
    setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    direction: 'left' | 'right'
  ) => {
    if (attempts >= 6) return;
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    if (nextAttempts >= 6) {
      // Return to original layout position when disabled/faded after 6 times
      setOffset({ x: 0, y: 0 });
    } else {
      if (direction === 'left') {
        moveButtonLeft(setOffset);
      } else {
        moveButtonRight(setOffset);
      }
    }
  };

  const resetQuiz = () => {
    setScreen('intro');
    setElusiveOffsetQ1_1({ x: 0, y: 0 });
    setElusiveOffsetQ1_2({ x: 0, y: 0 });
    setElusiveOffsetQ2_1({ x: 0, y: 0 });
    setElusiveOffsetQ2_2({ x: 0, y: 0 });
    setElusiveOffsetQ3_1({ x: 0, y: 0 });
    setElusiveOffsetQ3_2({ x: 0, y: 0 });
    setElusiveOffsetQ4_1({ x: 0, y: 0 });
    setElusiveOffsetQ4_2({ x: 0, y: 0 });
    setQ1Attempts(0);
    setQ2Attempts(0);
    setQ3Attempts(0);
    setQ4Attempts(0);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between font-sans px-4 pt-16 pb-12 overflow-x-hidden select-none">
      {/* Background Hearts System */}
      <FloatingHearts />

      {/* Dynamic Celebration Heart Shower */}
      <AnimatePresence>
        {burstHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: '105vh', x: `${h.left}vw`, scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              y: '-10vh',
              scale: h.scale,
              opacity: [1, 0.9, 0.6, 0],
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: Math.random() * 2 + 2.5, ease: 'easeOut' }}
            className="fixed text-primary-brand pointer-events-none z-50 text-2xl"
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Fixed Romantic Top Banner */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/40 backdrop-blur-md border-b border-rose-100/50 py-3.5 px-6 flex justify-center items-center">
        <motion.div 
          onClick={resetQuiz}
          className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-all"
        >
          <Heart className="w-5.5 h-5.5 text-primary-brand fill-primary-brand animate-heartbeat" />
          <h1 className="font-display font-black text-lg text-primary-brand tracking-tight flex items-center gap-1">
            Nomalum qiz <Sparkles className="w-4 h-4 text-primary-brand" />
          </h1>
        </motion.div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center py-6">
        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: INTRO */}
          {screen === 'intro' && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, cubicBezier: [0.34, 1.56, 0.64, 1] }}
              className="flex flex-col items-center text-center space-y-8 py-4"
            >
              <div className="space-y-3.5">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-primary-brand bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 uppercase"
                >
                  sen uchun, Nomalum qiz <Heart className="w-3.5 h-3.5 text-primary-brand fill-primary-brand" />
                </motion.span>
                
                <h2 className="font-display text-4xl font-extrabold text-dark-plum tracking-tight leading-tight pt-1">
                  Aytishniklar <br />
                  <span className="text-primary-brand">
                    romantik bo’ladimi
                  </span>
                </h2>
                
                <p className="font-body text-sm text-rose-800/80 max-w-[280px] mx-auto leading-relaxed">
                  Bir nechta savolga javob ber... lekin ehtiyot bo'l — ba'zi tugmalar injiq
                </p>
              </div>

              {/* Graphic Icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="w-24 h-24 bg-white rounded-3xl shadow-[0_12px_30px_rgba(155,0,68,0.08)] flex items-center justify-center border border-rose-100/50"
              >
                <MessageCircleHeart className="w-12 h-12 text-primary-brand animate-pulse" />
              </motion.div>

              <button
                onClick={() => setScreen('q1')}
                className="group relative overflow-hidden bg-primary-brand hover:bg-primary-brand-hover text-white px-12 py-4 rounded-full font-display font-extrabold text-sm shadow-[0_10px_25px_rgba(155,0,68,0.25)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Boshladik <Sparkles className="w-4 h-4 text-white" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
              </button>
            </motion.section>
          )}

          {/* SCREEN 2: QUESTION 1 (TIME) */}
          {screen === 'q1' && (
            <motion.section
              key="q1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-xl font-bold text-primary-brand mx-auto border border-rose-100 shadow-sm">
                  1
                </div>
                <h2 className="font-display text-2xl font-black text-dark-plum tracking-tight">
                  Dushanba kuni vaqting bormi?
                </h2>
              </div>

              {/* Interaction Stack */}
              <div className="flex flex-col w-full gap-3 relative min-h-[300px] justify-center items-center">
                
                {/* Correct Choice */}
                <button
                  onClick={() => setScreen('q2')}
                  className="w-full bg-primary-brand hover:bg-primary-brand-hover text-white py-4 px-6 rounded-full font-display font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Ha, albatta <Heart className="w-4 h-4 text-white fill-white" />
                </button>

                {/* Elusive Button 1 */}
                <motion.button
                  animate={{ x: elusiveOffsetQ1_1.x, y: elusiveOffsetQ1_1.y }}
                  transition={{ type: 'tween', duration: 0.05, ease: 'easeOut' }}
                  onMouseEnter={() => {
                    handleElusiveInteraction(q1Attempts, setQ1Attempts, setElusiveOffsetQ1_1, 'left');
                  }}
                  onTouchStart={() => {
                    handleElusiveInteraction(q1Attempts, setQ1Attempts, setElusiveOffsetQ1_1, 'left');
                  }}
                  disabled={q1Attempts >= 6}
                  className={`w-11/12 bg-white/90 border border-rose-100 text-rose-700 py-3.5 px-6 rounded-full font-display font-medium text-sm shadow-sm select-none transition-all duration-300 ${
                    q1Attempts >= 6
                      ? 'opacity-30 pointer-events-none cursor-not-allowed'
                      : 'cursor-pointer hover:scale-[1.01]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    Yo'q <Ban className="w-4 h-4 text-rose-700" />
                  </span>
                </motion.button>

                {/* Elusive Button 2 */}
                <motion.button
                  animate={{ x: elusiveOffsetQ1_2.x, y: elusiveOffsetQ1_2.y }}
                  transition={{ type: 'tween', duration: 0.05, ease: 'easeOut' }}
                  onMouseEnter={() => {
                    handleElusiveInteraction(q1Attempts, setQ1Attempts, setElusiveOffsetQ1_2, 'right');
                  }}
                  onTouchStart={() => {
                    handleElusiveInteraction(q1Attempts, setQ1Attempts, setElusiveOffsetQ1_2, 'right');
                  }}
                  disabled={q1Attempts >= 6}
                  className={`w-11/12 bg-white/90 border border-rose-100 text-rose-700 py-3.5 px-6 rounded-full font-display font-medium text-sm shadow-sm select-none transition-all duration-300 ${
                    q1Attempts >= 6
                      ? 'opacity-30 pointer-events-none cursor-not-allowed'
                      : 'cursor-pointer hover:scale-[1.01]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    O'ylab ko'raman <HelpCircle className="w-4 h-4 text-rose-700" />
                  </span>
                </motion.button>
              </div>
            </motion.section>
          )}

          {/* SCREEN 3: QUESTION 2 (LOCATION) */}
          {screen === 'q2' && (
            <motion.section
              key="q2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-xl font-bold text-primary-brand mx-auto border border-rose-100 shadow-sm">
                  2
                </div>
                <h2 className="font-display text-2xl font-black text-dark-plum tracking-tight">
                  Birga qayerga boramiz?
                </h2>
              </div>

              {/* Interaction Stack */}
              <div className="flex flex-col w-full gap-3 relative min-h-[300px] justify-center items-center">
                
                {/* Correct Choice */}
                <button
                  onClick={() => setScreen('q3')}
                  className="w-full bg-primary-brand hover:bg-primary-brand-hover text-white py-4 px-6 rounded-full font-display font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Kinorom <Clapperboard className="w-4 h-4 text-white fill-white/20" />
                </button>

                {/* Elusive Button 1 */}
                <motion.button
                  animate={{ x: elusiveOffsetQ2_1.x, y: elusiveOffsetQ2_1.y }}
                  transition={{ type: 'tween', duration: 0.05, ease: 'easeOut' }}
                  onMouseEnter={() => {
                    handleElusiveInteraction(q2Attempts, setQ2Attempts, setElusiveOffsetQ2_1, 'left');
                  }}
                  onTouchStart={() => {
                    handleElusiveInteraction(q2Attempts, setQ2Attempts, setElusiveOffsetQ2_1, 'left');
                  }}
                  disabled={q2Attempts >= 6}
                  className={`w-11/12 bg-white/90 border border-rose-100 text-rose-700 py-3.5 px-6 rounded-full font-display font-medium text-sm shadow-sm select-none transition-all duration-300 ${
                    q2Attempts >= 6
                      ? 'opacity-30 pointer-events-none cursor-not-allowed'
                      : 'cursor-pointer hover:scale-[1.01]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    Hech qayerga <Sofa className="w-4 h-4 text-rose-700" />
                  </span>
                </motion.button>

                {/* Elusive Button 2 */}
                <motion.button
                  animate={{ x: elusiveOffsetQ2_2.x, y: elusiveOffsetQ2_2.y }}
                  transition={{ type: 'tween', duration: 0.05, ease: 'easeOut' }}
                  onMouseEnter={() => {
                    handleElusiveInteraction(q2Attempts, setQ2Attempts, setElusiveOffsetQ2_2, 'right');
                  }}
                  onTouchStart={() => {
                    handleElusiveInteraction(q2Attempts, setQ2Attempts, setElusiveOffsetQ2_2, 'right');
                  }}
                  disabled={q2Attempts >= 6}
                  className={`w-11/12 bg-white/90 border border-rose-100 text-rose-700 py-3.5 px-6 rounded-full font-display font-medium text-sm shadow-sm select-none transition-all duration-300 ${
                    q2Attempts >= 6
                      ? 'opacity-30 pointer-events-none cursor-not-allowed'
                      : 'cursor-pointer hover:scale-[1.01]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    Bormaylik <Ban className="w-4 h-4 text-rose-700" />
                  </span>
                </motion.button>
              </div>
            </motion.section>
          )}

          {/* SCREEN 4: QUESTION 3 (MOVIE) */}
          {screen === 'q3' && (
            <motion.section
              key="q3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-xl font-bold text-primary-brand mx-auto border border-rose-100 shadow-sm">
                  3
                </div>
                <h2 className="font-display text-2xl font-black text-dark-plum tracking-tight">
                  Qanday kino ko'ramiz?
                </h2>
              </div>

              {/* Interaction Stack */}
              <div className="flex flex-col w-full gap-3 relative min-h-[250px] justify-center items-center">
                
                {/* Correct Choice */}
                <button
                  onClick={() => setScreen('q4')}
                  className="w-full bg-primary-brand hover:bg-primary-brand-hover text-white py-4 px-6 rounded-full font-display font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Romantik <Heart className="w-4 h-4 text-white fill-white" />
                </button>

                {/* Elusive Button 1 */}
                <motion.button
                  animate={{ x: elusiveOffsetQ3_1.x, y: elusiveOffsetQ3_1.y }}
                  transition={{ type: 'tween', duration: 0.05, ease: 'easeOut' }}
                  onMouseEnter={() => {
                    handleElusiveInteraction(q3Attempts, setQ3Attempts, setElusiveOffsetQ3_1, 'left');
                  }}
                  onTouchStart={() => {
                    handleElusiveInteraction(q3Attempts, setQ3Attempts, setElusiveOffsetQ3_1, 'left');
                  }}
                  disabled={q3Attempts >= 6}
                  className={`w-11/12 bg-white/90 border border-rose-100 text-rose-700 py-3.5 px-6 rounded-full font-display font-medium text-sm shadow-sm select-none transition-all duration-300 ${
                    q3Attempts >= 6
                      ? 'opacity-30 pointer-events-none cursor-not-allowed'
                      : 'cursor-pointer hover:scale-[1.01]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    Qo'rqinchli kino <Skull className="w-4 h-4 text-rose-700" />
                  </span>
                </motion.button>

                {/* Elusive Button 2 */}
                <motion.button
                  animate={{ x: elusiveOffsetQ3_2.x, y: elusiveOffsetQ3_2.y }}
                  transition={{ type: 'tween', duration: 0.05, ease: 'easeOut' }}
                  onMouseEnter={() => {
                    handleElusiveInteraction(q3Attempts, setQ3Attempts, setElusiveOffsetQ3_2, 'right');
                  }}
                  onTouchStart={() => {
                    handleElusiveInteraction(q3Attempts, setQ3Attempts, setElusiveOffsetQ3_2, 'right');
                  }}
                  disabled={q3Attempts >= 6}
                  className={`w-11/12 bg-white/90 border border-rose-100 text-rose-700 py-3.5 px-6 rounded-full font-display font-medium text-sm shadow-sm select-none transition-all duration-300 ${
                    q3Attempts >= 6
                      ? 'opacity-30 pointer-events-none cursor-not-allowed'
                      : 'cursor-pointer hover:scale-[1.01]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    Seriallar <Tv className="w-4 h-4 text-rose-700" />
                  </span>
                </motion.button>
              </div>
            </motion.section>
          )}

          {/* SCREEN 5: QUESTION 4 (DATE INVITATION) */}
          {screen === 'q4' && (
            <motion.section
              key="q4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-xl font-bold text-primary-brand mx-auto border border-rose-100 shadow-sm animate-bounce">
                  <Heart className="w-6 h-6 text-primary-brand fill-primary-brand" />
                </div>
                <h2 className="font-display text-2xl font-black text-dark-plum tracking-tight leading-tight px-4">
                  Soat nechida boramiz?
                </h2>
              </div>

              {/* Interaction Stack */}
              <div className="flex flex-col w-full gap-4 relative min-h-[220px] justify-center items-center">
                
                {/* Correct Choice */}
                <button
                  onClick={() => {
                    setScreen('success');
                    handleHeartBurst();
                  }}
                  className="w-full bg-primary-brand hover:bg-primary-brand-hover text-white py-5 px-6 rounded-full font-display font-extrabold text-sm shadow-[0_8px_20px_rgba(155,0,68,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Soat 19:00 <Clock className="w-4 h-4 text-white" />
                </button>

                {/* Elusive Button 1 */}
                <motion.button
                  animate={{ x: elusiveOffsetQ4_1.x, y: elusiveOffsetQ4_1.y }}
                  transition={{ type: 'tween', duration: 0.05, ease: 'easeOut' }}
                  onMouseEnter={() => {
                    handleElusiveInteraction(q4Attempts, setQ4Attempts, setElusiveOffsetQ4_1, 'left');
                  }}
                  onTouchStart={() => {
                    handleElusiveInteraction(q4Attempts, setQ4Attempts, setElusiveOffsetQ4_1, 'left');
                  }}
                  disabled={q4Attempts >= 6}
                  className={`w-11/12 bg-white/90 border border-rose-100 text-rose-700 py-4 px-6 rounded-full font-display font-medium text-sm shadow-sm select-none transition-all duration-300 ${
                    q4Attempts >= 6
                      ? 'opacity-30 pointer-events-none cursor-not-allowed'
                      : 'cursor-pointer hover:scale-[1.01]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    14:00 <Clock className="w-4 h-4 text-rose-700" />
                  </span>
                </motion.button>

                {/* Elusive Button 2 */}
                <motion.button
                  animate={{ x: elusiveOffsetQ4_2.x, y: elusiveOffsetQ4_2.y }}
                  transition={{ type: 'tween', duration: 0.05, ease: 'easeOut' }}
                  onMouseEnter={() => {
                    handleElusiveInteraction(q4Attempts, setQ4Attempts, setElusiveOffsetQ4_2, 'right');
                  }}
                  onTouchStart={() => {
                    handleElusiveInteraction(q4Attempts, setQ4Attempts, setElusiveOffsetQ4_2, 'right');
                  }}
                  disabled={q4Attempts >= 6}
                  className={`w-11/12 bg-white/90 border border-rose-100 text-rose-700 py-4 px-6 rounded-full font-display font-medium text-sm shadow-sm select-none transition-all duration-300 ${
                    q4Attempts >= 6
                      ? 'opacity-30 pointer-events-none cursor-not-allowed'
                      : 'cursor-pointer hover:scale-[1.01]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    20:00 <Clock className="w-4 h-4 text-rose-700" />
                  </span>
                </motion.button>
              </div>
            </motion.section>
          )}

          {/* SCREEN 6: SUCCESS (TICKET SECTION) */}
          {screen === 'success' && (
            <motion.section
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center space-y-8"
            >
              {/* Confetti and Header */}
              <div className="text-center space-y-1">
                <span className="font-display font-extrabold italic text-primary-brand text-lg flex items-center justify-center gap-1.5 animate-pulse">
                  to'g'ri tanlading <PartyPopper className="w-4 h-4 text-primary-brand" />
                </span>
                <h2 className="font-display text-4xl font-extrabold text-dark-plum tracking-tight">
                  Bu — uchrashuv!
                </h2>
              </div>

              {/* Double Cinema Ticket */}
              <ProposalTicket />

              {/* Bottom Footer Info */}
              <div className="text-center space-y-4 pt-4 border-t border-rose-100/40 w-full">
                <p className="text-[11px] font-bold tracking-wide text-rose-500 flex items-center justify-center gap-1">
                  <User className="w-3.5 h-3.5 text-rose-500" /> Seni taklif qilyapti — Muhammadyusuf
                </p>

                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-brand hover:text-primary-brand-hover underline underline-offset-4 active:scale-95 transition-all pt-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  yana bir bor o'tish
                </button>
              </div>
            </motion.section>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Branding - Extremely clean and simple, keeping custom rules */}
      <footer className="w-full text-center py-4 select-none pointer-events-none">
        <p className="text-[10px] font-bold text-rose-300 uppercase tracking-widest">
          Sinfdoshlar muhabbati • Cheksiz hurmat bilan
        </p>
      </footer>
    </div>
  );
}
