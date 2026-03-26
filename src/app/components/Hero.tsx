"use client";
import { motion } from "motion/react";
import { Button } from "./ui/button";

interface HeroProps {
  onClassicClick: () => void;
  onCustomClick: () => void;
}

export function Hero({ onClassicClick, onCustomClick }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1706011465964-7a226eea129a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwZmlyZWQlMjBwaXp6YSUyMG92ZW4lMjBmbGFtZXN8ZW58MXx8fHwxNzcyMDI4NDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Wood fired pizza oven"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="mb-6 text-background drop-shadow-2xl"
            style={{ 
              fontFamily: 'var(--font-family-serif)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 700
            }}
          >
            pizza gate
          </h1>
          <p 
            className="mb-10 opacity-90"
            style={{ 
              fontFamily: 'var(--font-family-sans)',
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: 400
            }}
          >
            Epstein files
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={onClassicClick}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full transition-all hover:scale-105 shadow-2xl"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            Zamów klasyczną pizzę
          </Button>
          <Button
            size="lg"
            onClick={onCustomClick}
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/50 px-8 py-6 rounded-full transition-all hover:scale-105 backdrop-blur-sm shadow-2xl"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            Stwórz własną pizzę
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 2 }
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}