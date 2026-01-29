"use client";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useSpring as useSpringMotion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Quote } from "lucide-react";
import { useEffect, useState } from "react";

// Importar as fontes do Google
import { Pinyon_Script, Send_Flowers } from 'next/font/google';
import { Yellowtail } from 'next/font/google';

// Configurar as fontes
const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon',
});

const sendFlowers = Send_Flowers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-send-flowers',
});

// Configurar a fonte Yellowtail
const yellowtail = Yellowtail({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yellowtail',
});

// Classes CSS para as fontes
const pinyonFont = pinyonScript.className;
const sendFlowersFont = sendFlowers.className;
const yellowtailFont = yellowtail.className; // Nova classe para Yellowtail

// Componente de Cursor Customizado com Trail (só desktop)
const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpringMotion(cursorX, springConfig);
  const cursorYSpring = useSpringMotion(cursorY, springConfig);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 border-2 border-red-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ left: cursorXSpring, top: cursorYSpring }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-red-500 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: 13,
          y: 13
        }}
      />
    </>
  );
};

// Partículas Flutuantes
const FloatingParticles = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * (windowWidth || 1000),
            y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            opacity: 0,
          }}
          animate={{
            y: -50,
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <Heart size={Math.random() * 15 + 8} className="text-red-400/30" fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

// Explosão de Corações
const HeartExplosion = ({ show, onComplete }: { show: boolean; onComplete: () => void }) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-1/2 left-1/2 z-[100] pointer-events-none"
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * (typeof window !== 'undefined' && window.innerWidth < 768 ? 500 : 1000),
                y: (Math.random() - 0.5) * (typeof window !== 'undefined' && window.innerWidth < 768 ? 500 : 1000),
                scale: 0,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              onAnimationComplete={() => i === 29 && onComplete()}
            >
              <Heart size={typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 40} fill="#ef4444" color="#ef4444" />
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );
};

// Componente para animação de entrada
const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      delay
    }}
  >
    {children}
  </motion.div>
);

// Efeito de Reveal nas Imagens
const ImageReveal = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: false }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className={`overflow-hidden ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

// Componente de transição estilo cortina Rockstar
const CinematicTransition = ({ isAnimating }: { isAnimating: boolean }) => {
  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div className="fixed inset-0 z-[100] flex flex-col pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="h-[20vh] w-full bg-red-600 border-y border-red-500/10 relative"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              {i === 2 && (
                <motion.span className={`absolute inset-0 flex items-center justify-center text-white text-4xl md:text-7xl italic tracking-tighter ${yellowtailFont}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  LOVE IS RAYSSA
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// COMPONENTE: BILHETE ROMÂNTICO - ELEGANTE E PROFISSIONAL
const MagicGiftBox = () => {
  const [stage, setStage] = useState(0);
  const [giftRevealed, setGiftRevealed] = useState(false);

  // Auto-progressão simples
  useEffect(() => {
    if (stage === 1) {
      setTimeout(() => setStage(2), 2500);
    } else if (stage === 2) {
      setTimeout(() => setStage(3), 2000);
    }
  }, [stage]);

  return (
    <section 
      id="gift-section" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 via-pink-50 to-white relative overflow-hidden px-4 py-20"
    >
      {/* Pétalas Sutis de Fundo */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart size={Math.random() * 20 + 10} className="text-rose-300" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* STAGE 0: Envelope Fechado */}
        {stage === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h2
              className={`text-4xl md:text-7xl ${yellowtailFont} mb-8 md:mb-12 px-4 text-slate-800`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Uma mensagem especial para você
            </motion.h2>

            {/* Envelope */}
            <motion.div
              className="relative w-full max-w-[320px] h-52 md:max-w-md md:h-64 mx-auto cursor-pointer group mt-8 md:mt-12"
              onClick={() => setStage(1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Corpo do Envelope */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-2xl border-2 border-red-200">
                {/* Linhas decorativas */}
                <div className="absolute top-4 left-4 right-4 h-px bg-red-200" />
                <div className="absolute bottom-4 left-4 right-4 h-px bg-red-200" />
              </div>

              {/* Aba do Envelope */}
              <motion.div
                className="absolute -top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-br from-red-200 to-red-300 origin-top shadow-lg"
                style={{
                  clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
                }}
                animate={{
                  rotateX: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Selo de Coração */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart size={32} className="text-white" fill="white" />
                </div>
              </motion.div>

              {/* Sombra */}
              <div className="absolute inset-0 top-full h-8 bg-black/10 blur-xl rounded-full scale-75" />
            </motion.div>

            <motion.p
              className={`mt-8 md:mt-12 text-2xl md:text-3xl text-slate-600 px-4 ${sendFlowersFont}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Clique para abrir
            </motion.p>
          </motion.div>
        )}

        {/* STAGE 1: Envelope Abrindo */}
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-[500px] md:h-[600px] flex items-center justify-center px-4"
          >
            {/* Envelope Base */}
            <motion.div
              className="absolute w-full max-w-[320px] h-52 md:max-w-md md:h-64 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-2xl border-2 border-red-200"
              initial={{ y: 0 }}
              animate={{ y: 20 }}
            />

            {/* Aba Abrindo */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[320px] h-40 md:max-w-md md:h-48 bg-gradient-to-br from-red-200 to-red-300 origin-bottom shadow-xl"
              style={{
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
              }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -180 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Carta Saindo */}
            <motion.div
              className="absolute w-full max-w-[280px] h-96 md:max-w-sm md:h-[450px] bg-white rounded-xl shadow-2xl border border-gray-200"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -50, opacity: 1 }}
              transition={{ delay: 1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Linhas decorativas na carta */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col gap-2 md:gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-0.5 md:h-1 bg-gray-100 rounded" />
                ))}
              </div>
            </motion.div>

            <motion.p
              className={`absolute bottom-10 text-2xl md:text-4xl ${sendFlowersFont} text-slate-700`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Abrindo...
            </motion.p>
          </motion.div>
        )}

        {/* STAGE 2: Carta Expandindo */}
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center px-4"
          >
            <motion.div
              className="w-full max-w-[320px] md:max-w-[600px] bg-white rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-12 border border-gray-200"
              initial={{ scale: 0.8, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 1.5, type: "spring" }}
            >
              {/* Linhas de texto aparecendo */}
              <div className="space-y-3 md:space-y-4">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 md:h-2 bg-gray-100 rounded"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 3: Bilhete Completo com Mensagem E PRESENTE */}
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full px-2 md:px-0"
          >
            {/* Bilhete Principal */}
            <motion.div
              className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 border-rose-100 w-full max-w-4xl mx-auto"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            >
              {/* Header do Bilhete */}
              <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 sm:p-6 md:p-8 border-b-2 border-rose-200">
                <motion.div
                  className="flex items-center justify-center gap-2 md:gap-3"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Heart size={24} className="text-rose-500 md:w-8 md:h-8" fill="currentColor" />
                  <h3 className={`text-4xl sm:text-5xl md:text-6xl ${yellowtailFont} text-rose-600`}>
                    Para Você
                  </h3>
                  <Heart size={24} className="text-rose-500 md:w-8 md:h-8" fill="currentColor" />
                </motion.div>
              </div>

              {/* Corpo do Bilhete */}
              <div className="p-4 sm:p-6 md:p-12 space-y-6 md:space-y-8">
                {/* Mensagem Principal */}
                <motion.div
                  className="space-y-6 text-slate-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className={`text-2xl md:text-3xl text-center text-rose-600 ${yellowtailFont}`}>
                    "Feliz aniversário meu amor!"
                  </p>

                  <div className={`space-y-4 md:space-y-5 text-lg md:text-2xl ${sendFlowersFont}`}>
                    <p>
                      Espero que com esse site você consiga ver o quanto você é especial para mim. 
                      Cada palavra aqui foi escrita pensando em você, em nós, e em tudo que vivemos juntos.
                    </p>

                    <p>
                      Estarei sempre ao seu lado não importa a ocasião, nos bons e nos melhores momentos. 
                      Você me completa de uma forma que eu nunca imaginei ser possível.
                    </p>

                    <p className="font-semibold text-rose-600">
                      Nunca perca esse seu brilho de cair o queixo. Você ilumina minha vida todos os dias.
                    </p>
                  </div>
                </motion.div>

                {/* Divisória Decorativa */}
                <motion.div
                  className="flex items-center justify-center gap-3 py-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                  <Sparkles size={20} className="text-rose-400" />
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                </motion.div>

                {/* SEÇÃO DE REVELAÇÃO DO PRESENTE */}
                <motion.div
                  className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-rose-200"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <AnimatePresence mode="wait">
                    {!giftRevealed ? (
                      // ANTES DE REVELAR - Card Interativo Elegante
                      <motion.div
                        key="question"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center space-y-8"
                      >
                        <motion.h4
                          className={`text-3xl md:text-4xl text-rose-600 leading-tight ${yellowtailFont}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Vamos descobrir o seu tão aguardado presente?
                        </motion.h4>

                        {/* Card Interativo ao invés de botão */}
                        <motion.div
                          onClick={() => setGiftRevealed(true)}
                          className="relative mx-auto w-full max-w-sm cursor-pointer group"
                          whileHover={{ scale: 1.02, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {/* Glow animado de fundo */}
                          <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 rounded-3xl blur-lg"
                            animate={{
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />

                          {/* Card Principal */}
                          <div className="relative bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
                            {/* Efeito de brilho passando */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                              animate={{
                                x: ['-200%', '200%'],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut",
                              }}
                            />

                            {/* Conteúdo do Card */}
                            <div className="relative z-10 space-y-4">
                              {/* Ícone de presente animado */}
                              <motion.div
                                className="flex justify-center"
                                animate={{
                                  y: [0, -10, 0],
                                  rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              >
                                <div className="relative">
                                  {/* Círculo de fundo pulsante */}
                                  <motion.div
                                    className="absolute inset-0 bg-white rounded-full blur-xl"
                                    animate={{
                                      scale: [1, 1.3, 1],
                                      opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                    }}
                                  />
                                  
                                  {/* Ícone */}
                                  <motion.div
                                    className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
                                    animate={{
                                      boxShadow: [
                                        "0 0 20px rgba(255,255,255,0.5)",
                                        "0 0 40px rgba(255,255,255,0.8)",
                                        "0 0 20px rgba(255,255,255,0.5)",
                                      ],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                    }}
                                  >
                                    <Sparkles size={24} className="text-rose-500 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                                  </motion.div>
                                </div>
                              </motion.div>

                              {/* Texto */}
                              <motion.p
                                className={`text-2xl md:text-3xl font-black text-white tracking-wide ${yellowtailFont}`}
                                animate={{
                                  opacity: [0.9, 1, 0.9],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              >
                                Toque para revelar
                              </motion.p>

                              {/* Indicador visual */}
                              <motion.div
                                className="flex justify-center gap-2"
                                animate={{
                                  y: [0, 5, 0],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                }}
                              >
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <div className="w-2 h-2 bg-white/70 rounded-full" />
                                <div className="w-2 h-2 bg-white/40 rounded-full" />
                              </motion.div>
                            </div>

                            {/* Partículas decorativas */}
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                style={{
                                  left: `${20 + i * 15}%`,
                                  top: '20%',
                                }}
                                animate={{
                                  y: [0, -30, 0],
                                  opacity: [0, 1, 0],
                                  scale: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.3,
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      // DEPOIS DE REVELAR - Animação Simples e Elegante
                      <motion.div
                        key="reveal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        {/* EXPLOSÃO DE CORAÇÕES */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(25)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute top-1/2 left-1/2"
                              initial={{ 
                                x: 0, 
                                y: 0,
                                scale: 0,
                                opacity: 1 
                              }}
                              animate={{
                                x: (Math.random() - 0.5) * (typeof window !== 'undefined' && window.innerWidth < 768 ? 250 : 400),
                                y: (Math.random() - 0.5) * (typeof window !== 'undefined' && window.innerWidth < 768 ? 250 : 400),
                                scale: [0, 1, 0],
                                opacity: [1, 1, 0],
                                rotate: Math.random() * 360,
                              }}
                              transition={{
                                duration: 1.5,
                                ease: "easeOut",
                              }}
                            >
                              <Heart 
                                size={Math.random() * 15 + 10} 
                                className="text-rose-500" 
                                fill="currentColor"
                              />
                            </motion.div>
                          ))}
                        </div>

                        <motion.h4
                          className={`text-3xl md:text-4xl text-center text-rose-600 mb-6 ${yellowtailFont}`}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Seu Presente!
                        </motion.h4>

                        {/* Imagem do Headset */}
                        <motion.div
                          className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto mb-4 md:mb-6"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.6, type: "spring", bounce: 0.3 }}
                        >
                          {/* Glow suave */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-rose-300 to-pink-300 rounded-full blur-3xl opacity-30"
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />

                          <motion.img
                            src="/heat.png"
                            alt="Headset Gamer"
                            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                            animate={{
                              y: [0, -10, 0],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </motion.div>

                        {/* Informações do Produto */}
                        <motion.div
                          className="text-center space-y-3 md:space-y-4 px-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <h5 className={`text-3xl md:text-4xl text-slate-800 ${yellowtailFont}`}>
                            Logitech G PRO X
                          </h5>
                          <p className={`text-xl md:text-2xl text-rose-600 ${yellowtailFont}`}>
                            Wireless Gaming Headset
                          </p>
                          <p className={`text-base md:text-lg text-slate-600 italic pt-2 md:pt-3 ${yellowtailFont}`}>
                            Para você curtir seus jogos com o melhor som! 🎮
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Divisória Decorativa */}
                <motion.div
                  className="flex items-center justify-center gap-3 py-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.3 }}
                >
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                  <Heart size={20} className="text-rose-400" fill="currentColor" />
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                </motion.div>

                {/* Assinatura */}
                <motion.div
                  className="text-center space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  <p className={`text-3xl md:text-4xl text-rose-600 ${yellowtailFont}`}>
                    Te amo S2
                  </p>
                  <p className={`text-lg md:text-xl text-slate-500 italic ${yellowtailFont}`}>
                    Com todo meu amor, hoje e sempre
                  </p>
                </motion.div>

                {/* Corações Decorativos Finais */}
                <motion.div
                  className="flex justify-center gap-3 md:gap-4 pt-4 md:pt-6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.7 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      <Heart 
                        size={20} 
                        className="text-rose-400 md:w-6 md:h-6" 
                        fill="currentColor"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Footer Decorativo */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 border-t-2 border-rose-100">
                <motion.p
                  className={`text-center text-base md:text-lg text-slate-500 italic ${yellowtailFont}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.9 }}
                >
                  Feito com amor especialmente para você
                </motion.p>
              </div>
            </motion.div>

            {/* Confetes Sutis */}
            <div className="fixed inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: -50,
                  }}
                  initial={{ y: -50, opacity: 1, rotate: 0 }}
                  animate={{
                    y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                    opacity: 0,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: Math.random() * 3 + 4,
                    delay: 2.5 + Math.random() * 2,
                    ease: "linear",
                  }}
                >
                  <Heart 
                    size={Math.random() * 8 + 6} 
                    className="text-rose-400" 
                    fill="currentColor"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default function LovePage() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [showExplosion, setShowExplosion] = useState(false);
  const [isCinematic, setIsCinematic] = useState(false);

  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [showYesMessage, setShowYesMessage] = useState(false);

  const handleNoInteraction = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Distâncias MÍNIMAS - suficientes para escapar do mouse/dedo
    const minJumpX = isMobile ? 100 : 120;
    const minJumpY = isMobile ? 80 : 100;

    // Distâncias MÁXIMAS - controladas para não mover demais
    const maxJumpX = isMobile ? 150 : 180;
    const maxJumpY = isMobile ? 120 : 150;

    // Gera uma direção aleatória em graus (0-360)
    const randomAngle = Math.random() * 2 * Math.PI; // 0 a 2π

    // Calcula a distância aleatória
    const distance = minJumpX + Math.random() * (maxJumpX - minJumpX);

    // Converte ângulo polar para coordenadas cartesianas
    let newX = Math.cos(randomAngle) * distance;
    let newY = Math.sin(randomAngle) * distance;

    // Ajusta os limites máximos
    const maxScreenOffset = isMobile ? 200 : 250;

    // Limita as coordenadas
    newX = Math.max(Math.min(newX, maxScreenOffset), -maxScreenOffset);
    newY = Math.max(Math.min(newY, maxScreenOffset), -maxScreenOffset);

    // Garante distância mínima da posição anterior
    const minDistanceFromPrevious = isMobile ? 50 : 70;
    const distanceFromPrevious = Math.sqrt(
      Math.pow(newX - noButtonPos.x, 2) + Math.pow(newY - noButtonPos.y, 2)
    );

    // Se estiver muito perto da posição anterior, gera nova posição
    if (distanceFromPrevious < minDistanceFromPrevious) {
      // Tenta mais 3 vezes encontrar uma posição boa
      for (let i = 0; i < 3; i++) {
        const newAngle = Math.random() * 2 * Math.PI;
        const newDistance = minJumpX + Math.random() * (maxJumpX - minJumpX);

        newX = Math.cos(newAngle) * newDistance;
        newY = Math.sin(newAngle) * newDistance;

        newX = Math.max(Math.min(newX, maxScreenOffset), -maxScreenOffset);
        newY = Math.max(Math.min(newY, maxScreenOffset), -maxScreenOffset);

        const newDistanceFromPrevious = Math.sqrt(
          Math.pow(newX - noButtonPos.x, 2) + Math.pow(newY - noButtonPos.y, 2)
        );

        if (newDistanceFromPrevious >= minDistanceFromPrevious) {
          break;
        }
      }
    }

    setNoButtonPos({
      x: newX,
      y: newY
    });
  };

  // NOVO COMPONENTE: Partículas APENAS para a seção SIM/NÃO
  const SectionParticles = () => {
    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{
              y: typeof window !== 'undefined' ? window.innerHeight : 1000,
              opacity: 0,
            }}
            animate={{
              y: -100,
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 10,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          >
            <Heart
              size={Math.random() * 12 + 6}
              className="text-red-300/40"
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  // Parallax para backgrounds
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);

  const triggerGrandTransition = () => {
    setIsCinematic(true);

    // Faz o scroll "escondido" atrás da cortina vermelha
    setTimeout(() => {
      const listSection = document.getElementById('list-section');
      listSection?.scrollIntoView({ behavior: 'auto' });
    }, 650);

    // Finaliza a animação e solta os corações no destino
    setTimeout(() => {
      setIsCinematic(false);
      setShowExplosion(true);
    }, 1400);
  };

  return (
    <div className={`overflow-x-hidden ${pinyonScript.variable} ${sendFlowers.variable} ${yellowtail.variable}`}>
      <CustomCursor />
      <CinematicTransition isAnimating={isCinematic} />
      <HeartExplosion show={showExplosion} onComplete={() => setShowExplosion(false)} />

      <main className="bg-white text-slate-900 overflow-x-hidden selection:bg-red-200">

        {/* SECTION 1: OLÁ MEU AMOR */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-4 md:p-6 bg-[#fafafa] relative overflow-hidden">
          {/* Background animado */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{ y: bgY }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: Math.random() * 3 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Heart size={typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 100} className="text-red-500" fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <motion.h1
              className={`text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-6 md:mb-8 ${yellowtailFont}`}
              style={{
                background: "linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Olá meu <br /> amor
            </motion.h1>

            <motion.div
              className="mt-8 md:mt-12 space-y-6 md:space-y-8 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.p
                className={`text-xl sm:text-2xl md:text-3xl text-red-500 italic px-2 ${yellowtailFont}`}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                De maluca que me xingou gratuitamente para amor da minha vida
              </motion.p>

              <motion.button
                onClick={triggerGrandTransition}
                className="mx-auto flex flex-col items-center justify-center gap-4 group mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Container do Coração com Brilho */}
                <div className="relative flex items-center justify-center">
                  {/* Efeito de Aura/Glow atrás do coração */}
                  <motion.div
                    className="absolute inset-0 bg-red-500/30 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* O Coração Principal */}
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <Heart
                      size={typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 80}
                      fill="#ef4444"
                      color="#ef4444"
                      className="drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    />
                  </motion.div>
                </div>

                {/* Texto centralizado e com interação */}
                <div className="flex flex-col items-center">
                  <span className={`text-xl md:text-3xl font-bold text-slate-700 tracking-tight flex items-center gap-2 ${yellowtailFont}`}>
                    Clique para ver a lista
                  </span>
                  {/* Linha decorativa que expande no hover */}
                  <motion.div
                    className="h-0.5 bg-red-500 mt-1"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-6 md:bottom-10 uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm font-bold text-gray-400 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={16} className="text-red-500 md:w-5 md:h-5" />
            <span className={yellowtailFont}>Scroll para baixo</span>
          </motion.div>
        </section>

        {/* SECTION 2: SEGURANÇA */}
        <section id="list-section" className="fixed inset-0 min-h-screen py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
          {/* Corações decorativos de fundo - COBRINDO A SECTION INTEIRA */}
          <div className="absolute inset-0 w-screen h-full pointer-events-none opacity-10">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: Math.random() * 4 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Heart size={Math.random() * 100 + 70} className="text-red-500" fill="currentColor" />
              </motion.div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto relative">
            <FadeInSection>
              <motion.div className="text-center mb-16 md:mb-24 relative z-10">
                <p className={`text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-gray-400 ${yellowtailFont}`}>
                  Aqui vai uma pequena lista do porquê amo você
                </p>
              </motion.div>
            </FadeInSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
              <FadeInSection>
                <motion.div
                  className="space-y-6 md:space-y-8"
                  whileHover={{ x: typeof window !== 'undefined' && window.innerWidth >= 768 ? 20 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h2
                    className={`text-5xl sm:text-6xl md:text-8xl font-black uppercase italic leading-none relative ${yellowtailFont}`}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="text-red-600">01.</span>
                    <br />
                    <span className="relative inline-block">
                      Segurança
                      <motion.span
                        className="absolute -bottom-1 md:-bottom-2 left-0 h-0.5 md:h-1 bg-red-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </span>
                    <br />
                    Absurda
                  </motion.h2>
                  <motion.p
                    className={`text-xl sm:text-2xl md:text-3xl leading-relaxed text-slate-700 border-l-4 border-red-600 pl-4 md:pl-6 ${yellowtailFont}`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    Queria que soubesse da segurança absurda que sinto quando estou com você,
                    meus problemas somem a partir do momento que estou com você.
                  </motion.p>
                </motion.div>
              </FadeInSection>

              <div className="grid grid-cols-2 gap-3 md:gap-4 h-[400px] md:h-[600px]">
                {/* FOTO 1 - SUAVE */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1, delay: 0.2 }}
                  whileHover={{
                    y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -15 : -5,
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full bg-slate-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative group"
                >
                  <ImageReveal src="/foto_1.jpg" alt="Foto 1" className="h-full" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                  />
                </motion.div>

                {/* FOTO 2 - SUAVE */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1, delay: 0.4 }}
                  whileHover={{
                    y: typeof window !== 'undefined' && window.innerWidth >= 768 ? 15 : 5,
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full bg-slate-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mt-8 md:mt-12 relative group"
                >
                  <ImageReveal src="/foto_2.jpg" alt="Foto 2" className="h-full" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTELIGÊNCIA */}
        <section className="min-h-screen bg-red-600 text-white py-16 md:py-32 flex items-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, #fff 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10">
            <FadeInSection>
              <motion.div
                className="mb-10 md:mb-16 overflow-hidden rounded-2xl md:rounded-[2rem] shadow-2xl h-[300px] md:h-[500px] bg-red-800 relative group"
                whileHover={{ scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <ImageReveal
                  src="/foto_horizontal_1.jpg"
                  alt="Inteligência"
                  className="h-full mix-blend-luminosity group-hover:mix-blend-normal group-active:mix-blend-normal transition-all duration-700"
                />
                <motion.div
                  className="absolute inset-0 border-2 md:border-4 border-white/0 group-hover:border-white/50 group-active:border-white/50 transition-all duration-500 rounded-2xl md:rounded-[2rem]"
                />
              </motion.div>

              <motion.h2
                className={`text-5xl sm:text-7xl md:text-9xl font-black uppercase italic mb-6 md:mb-8 tracking-tighter ${yellowtailFont}`}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}
              >
                <span className="inline-block" style={{ textShadow: "0 0 30px rgba(255,255,255,0.5)" }}>
                  02. Gênio da vida
                </span>
              </motion.h2>

              <motion.p
                className={`text-2xl sm:text-3xl md:text-5xl font-light leading-tight max-w-4xl ${yellowtailFont}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Muito inteligente, facilmente desbancaria Albert Einstein e Nikola Tesla
                nos seus auges. O esforço que você tem para tudo é algo lindo.
              </motion.p>
            </FadeInSection>
          </div>
        </section>

        {/* SECTION 4: LINDA MARAVILHOSA */}
        <section className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Sparkles size={typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 30} className="text-red-400" />
              </motion.div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <FadeInSection>
              <motion.h2
                className={`text-6xl sm:text-7xl md:text-[12rem] font-black text-center leading-[0.8] mb-12 md:mb-20 uppercase tracking-tighter px-4 ${yellowtailFont}`}
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                whileInView={{ scale: [0.8, 1.05, 1] }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              >
                03. Linda <br /> Gostosa
              </motion.h2>
            </FadeInSection>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
              {[
                "/foto_horizontal_2.jpg",
                "/foto_horizontal_3.jpg",
                "/foto_horizontal_4.jpg"
              ].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: false }}
                  whileHover={{
                    scale: 1.03,
                    rotate: 2,
                    zIndex: 10
                  }}
                  whileTap={{
                    scale: 0.98,
                    rotate: 0
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    opacity: { duration: 0.8 },
                    scale: { duration: 0.8 },
                    rotate: { duration: 0.8 }
                  }}
                  className="rounded-xl md:rounded-2xl overflow-hidden bg-slate-100 shadow-lg border-2 md:border-4 border-white relative group cursor-pointer break-inside-avoid"
                >
                  <ImageReveal src={src} alt={`Foto ${i + 3}`} className="" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-red-600/70 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4 md:pb-6"
                  >
                    <Heart size={typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 40} fill="white" color="white" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <FadeInSection delay={0.5}>
              <motion.div
                className="mt-16 md:mt-24 text-center space-y-6 md:space-y-8 px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
              >
                <motion.p
                  className={`text-2xl sm:text-3xl md:text-5xl italic text-slate-500 max-w-5xl mx-auto leading-relaxed ${yellowtailFont}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  "Queria que você se enxergasse do jeito que eu te enxergo, seu sorriso me acalma,
                  sua risada me deixa feliz, seus beijos me confortam."
                </motion.p>
                <div className="flex justify-center pt-6 md:pt-10">
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Heart size={typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 40} className="text-red-600" fill="currentColor" />
                  </motion.div>
                </div>
              </motion.div>
            </FadeInSection>
          </div>
        </section>

        {/* SECTION 04: DESIGN RENOVADO E MODERNO */}
        <section className="min-h-screen py-24 md:py-40 px-4 relative overflow-hidden bg-slate-50">
          {/* Corações de fundo */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart size={Math.random() * 60 + 40} className="text-red-600" fill="currentColor" />
              </motion.div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="relative">
              {/* Título de Fundo Decorativo (Parallax) */}
              <motion.h2
                className={`absolute -top-10 -left-10 text-[15vw] font-black text-red-500/5 uppercase pointer-events-none select-none ${yellowtailFont}`}
                style={{ x: useTransform(scrollYProgress, [0.6, 0.9], [0, 100]) }}
              >
                Partner
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Bloco de Imagens com Profundidade */}
                <div className="lg:col-span-7 relative h-[500px] md:h-[700px]">
                  <motion.div
                    className="absolute top-0 left-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10"
                    whileHover={{ scale: 1.02, zIndex: 30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <ImageReveal src="/foto_5.jpg" alt="Nossos Momentos" className="h-full" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl border-8 border-white z-20"
                    style={{ y: useTransform(scrollYProgress, [0.7, 1], [50, -50]) }}
                  >
                    <ImageReveal src="/foto_4.jpg" alt="Nossa Parceria" className="h-full" />
                  </motion.div>
                </div>

                {/* Bloco de Texto Focado na Mensagem */}
                <div className="lg:col-span-5 space-y-8 relative z-30">
                  <FadeInSection>
                    <div className="inline-block px-4 py-1 bg-red-600 text-white font-bold text-xs tracking-widest uppercase rounded-full mb-4">
                      <span className={yellowtailFont}>Motivo 04</span>
                    </div>
                    <h2 className={`text-5xl md:text-8xl font-black uppercase italic leading-[0.8] text-slate-900 ${yellowtailFont}`}>
                      Minha <br /> <span className="text-red-600">Companheira</span>
                    </h2>

                    <div className="mt-8 space-y-6">
                      <p className={`text-2xl md:text-3xl text-slate-700 leading-relaxed font-medium ${yellowtailFont}`}>
                        Fica junto comigo para qualquer coisa, mesmo que seja para ver uma serie na netflix comendo uma pringles de cebola esse momento se torna especial por ter você do meu lado.
                      </p>

                      <motion.div
                        className="p-6 bg-white rounded-2xl border-l-8 border-red-600 shadow-md"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <p className={`text-base md:text-lg text-gray-400 italic font-normal ${yellowtailFont}`}>
                          (a não ser que seja para ver o jogo do GIGANTE Palmeiras)
                        </p>
                      </motion.div>
                    </div>
                  </FadeInSection>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CITAÇÃO FERNANDO PESSOA */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50 px-4 md:px-6 py-16 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Quote size={typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 80} className="text-red-600" />
              </motion.div>
            ))}
          </div>

          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 md:mb-12"
              >
                <Quote size={typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 80} className="text-red-600 mx-auto" />
              </motion.div>

              <motion.blockquote
                className={`text-4xl sm:text-5xl md:text-7xl font-bold italic text-slate-800 mb-6 md:mb-8 leading-tight ${yellowtailFont}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                "Amar é pensar. <br className="hidden sm:block" />E pensar é amar."
              </motion.blockquote>

              <motion.cite
                className={`text-xl sm:text-2xl md:text-3xl text-red-600 font-semibold not-italic ${yellowtailFont}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                — Fernando Pessoa
              </motion.cite>

              <motion.p
                className={`mt-12 md:mt-16 text-3xl sm:text-4xl md:text-5xl font-light text-slate-700 ${yellowtailFont}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 1, 
                  delay: 0.8,
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
                whileTap={{ scale: 0.98 }}
              >
                Quando penso no amor, <br className="sm:hidden" />
                <span className="text-red-600 font-bold">penso em você</span>
              </motion.p>
            </div>
          </FadeInSection>
        </section>

        {/* SECTION: NOSSOS SONHOS */}
        <section className="min-h-screen py-24 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="flex flex-col items-start mb-16 md:mb-24">
                <h2 className={`text-7xl md:text-[10rem] font-black italic uppercase tracking-tighter leading-none text-slate-900 ${yellowtailFont}`}>
                  O QUE  <br /> <span className="text-red-600">QUERO?</span>
                </h2>
                <div className="h-1.5 w-32 bg-red-600 mt-4" />
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Tempo Juntos", text: "Quero passar meu tempo com você.", icon: "01", img: "/foto_7.jpg" },
                { title: "Nossa Família", text: "Quero formar uma família com você.", icon: "02", img: "/foto_8.jpg" },
                { title: "Amor Eterno", text: "Eu quero sempre amar você.", icon: "03", img: "/foto_6.jpg" }
              ].map((dream, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  whileHover={{ y: -10 }}
                  whileTap={{ y: -5 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    opacity: { duration: 0.8 },
                    y: { duration: 0.8 }
                  }}
                  className="relative group h-[500px] overflow-hidden rounded-2xl bg-slate-100 border border-slate-100 shadow-sm"
                >
                  {/* Imagem de Fundo */}
                  <div className="absolute inset-0 z-0">
                    <motion.img
                      src={dream.img}
                      alt={dream.title}
                      className="w-full h-full object-cover saturate-[0.8] group-hover:saturate-100 group-active:saturate-100 group-hover:scale-110 group-active:scale-110 transition-all duration-700"
                    />
                    {/* Overlay Gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 group-active:opacity-90 transition-opacity" />
                  </div>

                  {/* Conteúdo sobre a imagem */}
                  <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end text-white">
                    <span className={`text-red-500 font-black text-xl mb-2 italic tracking-widest ${yellowtailFont}`}>
                      STEP {dream.icon}
                    </span>
                    <h3 className={`text-4xl font-black uppercase italic tracking-tighter mb-3 leading-none ${yellowtailFont}`}>
                      {dream.title}
                    </h3>
                    <p className={`text-slate-200 font-medium leading-tight text-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 group-active:translate-y-0 ${yellowtailFont}`}>
                      {dream.text}
                    </p>
                  </div>

                  {/* Linha de progresso superior */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600/20">
                    <motion.div
                      className="h-full bg-red-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION FINAL: COM ANIMAÇÃO DIFERENTE NO SIM */}
        <section className="min-h-screen flex flex-col items-center justify-center bg-white relative px-4 overflow-hidden">
          {/* Partículas APENAS nesta seção */}
          <SectionParticles />

          {/* Animação DIFERENTE ao clicar em SIM - Zoom + Fade com SAÍDA */}
          <AnimatePresence>
            {showYesMessage && (
              <motion.div
                className="fixed inset-0 z-[100] bg-red-600 flex items-center justify-center"
                initial={{ scale: 0, borderRadius: "100%" }}
                animate={{ scale: 1, borderRadius: "0%" }}
                exit={{ scale: 0, opacity: 0, borderRadius: "100%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  // Após 1.5s mostrando a mensagem, começa a sair
                  setTimeout(() => {
                    setShowYesMessage(false);
                    // Após a animação de saída (0.5s), rola para a seção do presente
                    setTimeout(() => {
                      const giftSection = document.getElementById('gift-section');
                      giftSection?.scrollIntoView({ behavior: 'smooth' });
                    }, 800);
                  }, 1500);
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <h2 className={`text-6xl md:text-9xl font-black text-white italic uppercase tracking-tighter ${yellowtailFont}`}>
                    É BOM MESMO
                  </h2>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center space-y-12 relative z-10">
            <FadeInSection>
              <div className="space-y-4">
                <span className={`text-red-500 font-bold uppercase tracking-[0.3em] text-base ${yellowtailFont}`}>
                  E uma pergunta
                </span>

                <h2 className={`text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-slate-900 ${yellowtailFont}`}>
                  VOCÊ <br /> <span className="text-red-600">ME AMA?</span>
                </h2>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 relative min-h-[200px]">
                {!showYesMessage && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-8 relative"
                  >
                    <motion.button
                      onClick={() => {
                        setShowYesMessage(true);
                        // Explosão de corações durante a animação
                        setTimeout(() => {
                          setShowExplosion(true);
                        }, 800);
                      }}
                      whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(220, 38, 38, 0.6)" }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`px-12 py-4 bg-red-600 text-white font-black text-3xl rounded-full shadow-2xl z-20 w-48 ${yellowtailFont}`}
                    >
                      SIM!
                    </motion.button>

                    <motion.button
                      onMouseEnter={handleNoInteraction}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleNoInteraction();
                      }}
                      animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                      transition={{
                        type: "spring",
                        stiffness: typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 400,
                        damping: 25,
                        mass: 0.8
                      }}
                      className={`px-12 py-4 border-2 border-slate-200 text-slate-300 font-black text-3xl rounded-full w-48 z-10 ${yellowtailFont}`}
                    >
                      NÃO
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* SECTION: CAIXA MÁGICA INTERATIVA - PRESENTE */}
        <MagicGiftBox />

        {/* FOOTER - FINAL ÉPICO */}
        <footer className="min-h-screen flex flex-col items-center justify-center bg-[#111] text-white relative overflow-hidden px-4">
          {/* Corações flutuando no fundo - TELA TODA */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                }}
                initial={{
                  y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                }}
                animate={{
                  y: -100,
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              >
                <Heart size={Math.random() * 40 + 30} fill="white" color="white" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center"
          >
            <motion.h3
              className={`text-3xl sm:text-4xl md:text-5xl text-red-600 font-black uppercase tracking-widest mb-4 md:mb-6 ${yellowtailFont}`}
              animate={{
                textShadow: [
                  "0 0 20px rgba(220, 38, 38, 0.5)",
                  "0 0 40px rgba(220, 38, 38, 1)",
                  "0 0 20px rgba(220, 38, 38, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Para Sempre
            </motion.h3>
            <motion.p
              className={`text-gray-500 font-medium tracking-[0.3em] md:tracking-[0.5em] uppercase text-sm sm:text-base ${yellowtailFont}`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Amo-te infinitamente
            </motion.p>
          </motion.div>
        </footer>
      </main>
    </div>
  );
}