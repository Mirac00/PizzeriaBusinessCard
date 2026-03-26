"use client";
import * as React from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-6 z-50 hidden md:block">
        <div className="bg-card/90 backdrop-blur-lg rounded-full shadow-xl px-6 py-3 flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">🍕</span>
            <span
              className="text-foreground"
              style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.5rem', fontWeight: 600 }}
            >
              pizza gate
            </span>
          </button>
          <div className="h-6 w-px bg-border" />
          <NavLink onClick={() => scrollToSection("menu")}>Menu</NavLink>
          <NavLink onClick={() => scrollToSection("creator")}>Kreator</NavLink>
        </div>
      </nav>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 md:hidden bg-card rounded-full p-3 shadow-xl"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-card z-40 md:hidden shadow-2xl"
            >
              <div className="p-8">
                <h2
                  className="mb-8 mt-12 text-primary"
                  style={{ fontFamily: 'var(--font-family-serif)', fontSize: '2rem', fontWeight: 600 }}
                >
                  pizza gate
                </h2>
                <nav className="space-y-4">
                  <MobileNavLink onClick={() => scrollToSection("menu")}>
                    Menu
                  </MobileNavLink>
                  <MobileNavLink onClick={() => scrollToSection("creator")}>
                    Kreator pizzy
                  </MobileNavLink>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-sm hover:text-primary transition-colors"
      style={{ fontFamily: 'var(--font-family-sans)' }}
    >
      {children}
    </button>
  );
}

function MobileNavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left py-3 hover:text-primary transition-colors"
      style={{ fontFamily: 'var(--font-family-sans)', fontSize: '1.125rem' }}
    >
      {children}
    </button>
  );
}