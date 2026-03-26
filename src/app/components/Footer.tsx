"use client";
import * as React from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="mb-4"
              style={{ 
                fontFamily: 'var(--font-family-serif)',
                fontSize: '1.5rem',
                fontWeight: 600
              }}
            >
              pizza gate
            </h3>
            <p className="text-background/80 leading-relaxed" style={{ fontFamily: 'var(--font-family-sans)' }}>
              Autentyczna włoska pizza prosto z pieca opalanego drewnem. 
              Każda pizza to małe arcydzieło kulinarne.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.25rem' }}>
              Kontakt
            </h4>
            <div className="space-y-3 text-background/80" style={{ fontFamily: 'var(--font-family-sans)' }}>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>ul. Włoska 42, 00-001 Warszawa</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+48 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>zamowienia@fornorosso.pl</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.25rem' }}>
              Godziny otwarcia
            </h4>
            <div className="space-y-2 text-background/80" style={{ fontFamily: 'var(--font-family-sans)' }}>
              <div className="flex justify-between">
                <span>Poniedziałek - Piątek</span>
                <span>11:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sobota - Niedziela</span>
                <span>12:00 - 23:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/20 text-center text-background/60 text-sm">
          <p style={{ fontFamily: 'var(--font-family-sans)' }}>
            © 2026 pizza gate. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}