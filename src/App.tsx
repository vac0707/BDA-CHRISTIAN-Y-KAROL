/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Calendar, Clock, MapPin, Gift, Music, Volume2, VolumeX, 
  Send, CheckCircle2, Users, Sparkles, Mail, MessageSquare, ChevronDown, 
  ExternalLink, Phone, Maximize2, X, ChevronLeft, ChevronRight, Copy, Check, Baby, Award
} from 'lucide-react';
import { CKMonogram } from './components/CKMonogram.tsx';

const galleryPhotos = [
  { url: 'https://res.cloudinary.com/vsgbhmey/image/upload/v1793415231/IMG-20261030-WA0006.jpg', title: 'Christian & Karol' },
  { url: 'https://res.cloudinary.com/vsgbhmey/image/upload/v1793415231/IMG-20261030-WA0002.jpg', title: 'Momentos Especiales' },
  { url: 'https://res.cloudinary.com/vsgbhmey/image/upload/v1793415230/IMG-20261030-WA0007.jpg', title: 'Nuestro Amor' },
  { url: 'https://res.cloudinary.com/vsgbhmey/image/upload/v1793415230/IMG-20261030-WA0005.jpg', title: 'Compañeros de Vida' },
  { url: 'https://res.cloudinary.com/vsgbhmey/image/upload/v1793415229/IMG-20261030-WA0004.jpg', title: 'Felicidad Eterna' },
  { url: 'https://res.cloudinary.com/vsgbhmey/image/upload/v1793415207/IMG-20261030-WA0003.jpg', title: 'Promesa de Amor' }
];

// Scroll Reveal Wrapper Component for smooth cinematic entrance
function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 filter blur-0' : 'opacity-0 translate-y-10 filter blur-[2px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lightbox State
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no'>('yes');
  const [rsvpMessage, setRsvpMessage] = useState('');

  // Copy to clipboard state for Yape and Bank Accounts
  const [copiedYape, setCopiedYape] = useState(false);
  const [copiedBcp, setCopiedBcp] = useState(false);
  const [copiedCci, setCopiedCci] = useState(false);

  // Countdown timer state for November 28, 2026 at 14:30
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-28T14:30:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.error("Audio playback prevented:", err);
      });
    }
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(() => {
        // Autoplay policy restriction fallback
      });
    }
  };

  const handleCopyYape = () => {
    navigator.clipboard.writeText('993039616');
    setCopiedYape(true);
    setTimeout(() => setCopiedYape(false), 2500);
  };

  const handleCopyBcp = () => {
    navigator.clipboard.writeText('20012101675095');
    setCopiedBcp(true);
    setTimeout(() => setCopiedBcp(false), 2500);
  };

  const handleCopyCci = () => {
    navigator.clipboard.writeText('00220011210167509545');
    setCopiedCci(true);
    setTimeout(() => setCopiedCci(false), 2500);
  };

  const handleWhatsAppRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    const attendanceText = rsvpStatus === 'yes' ? '¡Sí, asistiré con mucha emoción! 🎉' : 'No podré asistir, pero les envío un fuerte abrazo y bendiciones ✨';
    let message = `Hola Christian y Karol, soy *${rsvpName.trim()}*.\n\nConfirmo mi respuesta para su boda:\n- ¿Asistirás?: ${attendanceText}`;
    
    if (rsvpStatus === 'yes') {
      message += `\n- Número de pases: ${rsvpGuests}`;
    }
    if (rsvpMessage.trim()) {
      message += `\n- Mensaje: "${rsvpMessage.trim()}"`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/51993039616?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Calendar for November 2026: 30 days. Nov 1, 2026 is Sunday -> 6 empty days in Mon-Sun format
  const novemberDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const emptyStartDays = 6; // Sunday is the 7th column

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#352017] selection:bg-[#965C3B]/20 relative">
      
      {/* Background Audio Element */}
      <audio 
        ref={audioRef} 
        src="https://res.cloudinary.com/inawqhes/video/upload/v1793067269/Ed_Sheeran_-_Photograph_Official_Music_Video_-_Ed_Sheeran_128k.flac" 
        loop 
        preload="auto" 
      />

      {/* Floating Audio Controller */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-[#965C3B] hover:bg-[#7F4C2F] text-white p-3.5 rounded-full shadow-xl transition-all duration-300 flex items-center gap-2 group border border-[#C7AB93]/60 focus:outline-none cursor-pointer"
        title={isPlayingMusic ? "Silenciar música de fondo" : "Reproducir música de fondo"}
        aria-label="Música ambiental"
      >
        {isPlayingMusic ? <Volume2 className="w-5 h-5 animate-pulse text-[#F5ECE1]" /> : <VolumeX className="w-5 h-5" />}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-medium px-0 group-hover:px-1 text-[#F5ECE1]">
          {isPlayingMusic ? 'Photograph - Ed Sheeran' : 'Reproducir Música'}
        </span>
      </button>

      {/* 1. PANTALLA INICIAL / SOBRE VIRTUAL DE BIENVENIDA */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-[#F5ECE1] flex items-center justify-center p-4 transition-all duration-1000">
          <div className="absolute inset-0 bg-[radial-gradient(#965C3B_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
          
          <div className="relative max-w-lg w-full bg-[#FFFEFB] rounded-2xl shadow-2xl border border-[#C7AB93]/50 p-8 sm:p-12 text-center overflow-hidden transform transition-all duration-700 animate-float">
            
            {/* Elegant Ornamental Borders */}
            <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-[#965C3B]/60 rounded-tl-lg"></div>
            <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-[#965C3B]/60 rounded-tr-lg"></div>
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-[#965C3B]/60 rounded-bl-lg"></div>
            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-[#965C3B]/60 rounded-br-lg"></div>

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#965C3B]/10 text-[#965C3B] mb-5 border border-[#965C3B]/25">
              <Mail className="w-8 h-8" />
            </div>

            <p className="text-xs uppercase tracking-[0.35em] text-[#965C3B] font-semibold mb-2">
              Estás Invitado A Nuestra Boda
            </p>

            <div className="my-4 flex items-center justify-center">
              <CKMonogram className="w-28 sm:w-36 h-auto text-[#352017] transition-transform duration-500 hover:scale-105" />
            </div>

            <div className="w-24 h-[1px] bg-[#965C3B]/60 mx-auto my-3"></div>

            <p className="font-serif-wedding text-2xl sm:text-3xl text-[#352017] italic mb-6">
              Christian &amp; Karol
            </p>

            <p className="text-sm text-stone-600 mb-8 font-sans-wedding max-w-xs mx-auto leading-relaxed">
              Con la bendición de Dios y de nuestros padres, te invitamos a ser testigo de nuestra unión eterna.
            </p>

            <button
              onClick={handleOpenInvitation}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#965C3B] hover:bg-[#7F4C2F] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-[#C7AB93]/60 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F5ECE1] group-hover:rotate-12 transition-transform" />
              <span className="tracking-widest text-sm uppercase font-semibold">Abrir Invitación</span>
              <Heart className="w-4 h-4 text-[#F5ECE1] group-hover:scale-125 transition-transform" />
            </button>

            <div className="mt-7 text-xs text-[#965C3B]/80 font-sans-wedding font-medium tracking-widest uppercase">
              28 de Noviembre, 2026 · 2:30 PM
            </div>
          </div>
        </div>
      )}

      {/* INVITACIÓN PRINCIPAL */}
      <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* 2. PORTADA HERO CINEMATOGRÁFICA (Texto ubicado abajo para no tapar los novios) */}
        <section className="relative min-h-screen flex flex-col justify-end text-center px-4 pb-6 sm:pb-8 md:pb-6 pt-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://res.cloudinary.com/inawqhes/image/upload/v1793066101/DSC00531.jpg.jpg" 
              alt="Boda Christian y Karol" 
              className="w-full h-full object-cover object-[center_20%] sm:object-[center_25%] md:object-[center_36%] lg:object-[center_40%]"
            />
            {/* Top delicate vignette so natural light remains on the couple */}
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/40 to-transparent"></div>
            
            {/* Bottom smooth dark gradient only where the text rests */}
            <div className="absolute inset-x-0 bottom-0 h-3/5 sm:h-1/2 md:h-[45%] bg-gradient-to-t from-[#25150E] via-[#25150E]/85 via-55% to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto w-full flex flex-col items-center">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#F5ECE1] font-semibold mb-2 bg-[#25150E]/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#C7AB93]/40 shadow-sm">
              Nuestra Boda
            </span>

            <h2 className="font-serif-wedding text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-[#FAF7F2] drop-shadow-md leading-tight mb-2">
              Christian <span className="font-script text-3xl sm:text-5xl text-[#C7AB93] mx-1 font-normal">&amp;</span> Karol
            </h2>

            <div className="w-24 h-[1px] bg-[#C7AB93]/70 my-2"></div>

            <p className="font-serif-wedding italic text-lg sm:text-2xl text-[#F5ECE1] tracking-wider mb-1 drop-shadow-sm">
              “Sábado, 28 de Noviembre del 2026”
            </p>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C7AB93] font-medium mb-4">
              2:30 PM · Capilla del Convento San Miguel
            </p>

            <a 
              href="#padres"
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#F5ECE1]/90 hover:text-white transition-colors animate-bounce"
            >
              <span>Desliza para ver la invitación</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* BARRA DE NAVEGACIÓN */}
        <nav className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#C7AB93]/30 shadow-xs">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <CKMonogram className="w-9 sm:w-10 h-auto text-[#965C3B]" />
              <span className="font-serif-wedding text-xl text-[#352017] tracking-wider font-light hidden sm:inline">
                Christian &amp; Karol
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-[#352017]">
              <a href="#padres" className="hover:text-[#965C3B] transition-colors">Nuestros Padres</a>
              <a href="#calendario" className="hover:text-[#965C3B] transition-colors">Fecha</a>
              <a href="#ubicaciones" className="hover:text-[#965C3B] transition-colors">Ubicaciones</a>
              <a href="#dress-code" className="hover:text-[#965C3B] transition-colors">Dress Code</a>
              <a href="#regalos" className="hover:text-[#965C3B] transition-colors">Regalos / Cuentas</a>
              <a href="#asistencia" className="hover:text-[#965C3B] transition-colors">Confirmar</a>
            </div>

            <a 
              href="#asistencia"
              className="px-4 py-2 bg-[#965C3B] hover:bg-[#7F4C2F] text-white text-xs uppercase tracking-wider rounded-full transition-colors font-semibold shadow-xs"
            >
              Confirmar
            </a>
          </div>
        </nav>

        {/* 3. NUESTROS PADRES (SECCIÓN OBLIGATORIA SOLICITADA) */}
        <RevealSection>
          <section id="padres" className="py-24 px-4 bg-[#FAF7F2] text-center relative">
            <div className="max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-[0.35em] text-[#965C3B] font-bold block mb-3">
                Con La Bendición De Dios Y
              </span>
              <h3 className="font-serif-wedding text-4xl sm:text-5xl text-[#352017] mb-4">
                Nuestros Padres
              </h3>
              <p className="text-stone-600 text-sm sm:text-base font-sans-wedding max-w-xl mx-auto mb-14 leading-relaxed">
                Quienes nos dieron la vida, guiaron nuestros pasos con amor y hoy nos acompañan con su bendición en este nuevo camino.
              </p>

              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-10">
                {/* Padres del Novio */}
                <div className="bg-[#FFFEFB] rounded-2xl p-8 sm:p-10 shadow-sm border border-[#C7AB93]/40 relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#965C3B]"></div>
                  
                  <span className="text-xs uppercase tracking-[0.25em] text-[#965C3B] font-semibold block mb-4">
                    Padres del Novio
                  </span>

                  <div className="space-y-3 font-serif-wedding text-2xl text-[#352017]">
                    <div className="flex items-center justify-center gap-2">
                      <span>Fernando Elias Espinoza León</span>
                      <span className="text-xs bg-[#F5ECE1] text-[#965C3B] px-2 py-0.5 rounded-full font-sans-wedding font-semibold" title="En memoria y bendición eterna">
                        (+)
                      </span>
                    </div>
                    <div className="text-stone-400 font-sans-wedding text-xs italic">
                      (Siempre en nuestros corazones)
                    </div>
                    <div className="w-12 h-[1px] bg-[#C7AB93]/50 mx-auto my-2"></div>
                    <p>
                      Sosima Rosa Arguedas Flores
                    </p>
                  </div>
                </div>

                {/* Padres de la Novia */}
                <div className="bg-[#FFFEFB] rounded-2xl p-8 sm:p-10 shadow-sm border border-[#C7AB93]/40 relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C7AB93]"></div>
                  
                  <span className="text-xs uppercase tracking-[0.25em] text-[#965C3B] font-semibold block mb-4">
                    Padres de la Novia
                  </span>

                  <div className="space-y-3 font-serif-wedding text-2xl text-[#352017]">
                    <p>
                      Martin Ortiz Izquierdo
                    </p>
                    <div className="w-12 h-[1px] bg-[#C7AB93]/50 mx-auto my-2"></div>
                    <p>
                      Silvia Taipe Chipa
                    </p>
                  </div>
                </div>
              </div>

              {/* Padrinos & Testigos */}
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {/* Padrinos Boda Religiosa */}
                <div className="bg-[#FFFEFB] rounded-2xl p-8 sm:p-10 shadow-sm border border-[#C7AB93]/40 relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#965C3B]"></div>
                  
                  <span className="text-xs uppercase tracking-[0.25em] text-[#965C3B] font-semibold block mb-4">
                    Padrinos de Boda Religiosa
                  </span>

                  <div className="space-y-3 font-serif-wedding text-2xl text-[#352017]">
                    <p>
                      Marco Cárdenas Valdivia
                    </p>
                    <div className="w-12 h-[1px] bg-[#C7AB93]/50 mx-auto my-2"></div>
                    <p>
                      Rosa Yaritza Pinto Hinojosa
                    </p>
                  </div>
                </div>

                {/* Testigos */}
                <div className="bg-[#FFFEFB] rounded-2xl p-8 sm:p-10 shadow-sm border border-[#C7AB93]/40 relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C7AB93]"></div>
                  
                  <span className="text-xs uppercase tracking-[0.25em] text-[#965C3B] font-semibold block mb-4">
                    Testigos
                  </span>

                  <div className="space-y-3 font-serif-wedding text-2xl text-[#352017]">
                    <p>
                      Darwin Torres Peña
                    </p>
                    <div className="w-12 h-[1px] bg-[#C7AB93]/50 mx-auto my-2"></div>
                    <p>
                      Shirley Carrasco Almandroz
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="font-serif-wedding text-xl text-[#965C3B] italic">
                  “El amor nunca deja de ser.” — 1 Corintios 13:8
                </p>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* 4. CUENTA REGRESIVA */}
        <RevealSection>
          <section id="cuenta-regresiva" className="py-20 px-4 bg-[#F5ECE1] text-center relative border-y border-[#C7AB93]/30">
            <div className="max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-[0.3em] text-[#965C3B] font-bold block mb-3">
                Cuenta Regresiva
              </span>
              <h3 className="font-serif-wedding text-3xl sm:text-5xl text-[#352017] mb-3">
                Cada vez más cerca del gran día
              </h3>
              <p className="text-stone-600 text-sm sm:text-base font-sans-wedding max-w-lg mx-auto mb-10">
                Sábado 28 de Noviembre de 2026 – 2:30 PM (14:30 hrs)
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
                <div className="bg-[#FFFEFB] p-6 rounded-2xl shadow-sm border border-[#C7AB93]/50">
                  <span className="font-serif-wedding text-4xl sm:text-5xl font-semibold text-[#965C3B] block mb-1">
                    {timeLeft.days}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#352017]/70 font-semibold">Días</span>
                </div>
                <div className="bg-[#FFFEFB] p-6 rounded-2xl shadow-sm border border-[#C7AB93]/50">
                  <span className="font-serif-wedding text-4xl sm:text-5xl font-semibold text-[#965C3B] block mb-1">
                    {timeLeft.hours}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#352017]/70 font-semibold">Horas</span>
                </div>
                <div className="bg-[#FFFEFB] p-6 rounded-2xl shadow-sm border border-[#C7AB93]/50">
                  <span className="font-serif-wedding text-4xl sm:text-5xl font-semibold text-[#965C3B] block mb-1">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#352017]/70 font-semibold">Minutos</span>
                </div>
                <div className="bg-[#FFFEFB] p-6 rounded-2xl shadow-sm border border-[#C7AB93]/50">
                  <span className="font-serif-wedding text-4xl sm:text-5xl font-semibold text-[#965C3B] block mb-1">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#352017]/70 font-semibold">Segundos</span>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* 5. CALENDARIO NOVIEMBRE 2026 */}
        <RevealSection>
          <section id="calendario" className="py-24 px-4 bg-[#FAF7F2] text-center">
            <div className="max-w-xl mx-auto bg-[#FFFEFB] rounded-2xl shadow-xl border border-[#C7AB93]/40 p-8 sm:p-12 relative overflow-hidden">
              
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#965C3B] via-[#C7AB93] to-[#965C3B]"></div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#965C3B] font-bold block mb-2">
                Reserva La Fecha
              </span>
              <h3 className="font-serif-wedding text-3xl sm:text-4xl text-[#352017] mb-2">
                Noviembre 2026
              </h3>
              <p className="text-stone-500 text-sm mb-8 font-sans-wedding">
                Sábado, 28 de Noviembre del 2026 · 2:30 PM
              </p>

              <div className="grid grid-cols-7 gap-2 mb-4 text-xs uppercase font-bold text-[#965C3B]">
                <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
              </div>

              <div className="grid grid-cols-7 gap-2 text-sm">
                {Array.from({ length: emptyStartDays }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-10"></div>
                ))}

                {novemberDays.map((day) => {
                  const isWeddingDay = day === 28;
                  return (
                    <div
                      key={day}
                      className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                        isWeddingDay
                          ? 'bg-[#965C3B] text-white font-bold ring-4 ring-[#C7AB93]/50 shadow-md scale-110'
                          : 'text-[#352017] hover:bg-[#F5ECE1]'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-[#C7AB93]/30 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-2 text-[#965C3B]">
                  <Sparkles className="w-4 h-4 text-[#965C3B]" />
                  <span>Sábado 28 de Noviembre · Nuestro Gran Día</span>
                </div>

                <a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+Christian+y+Karol&dates=20261128T193000Z/20261129T030000Z&details=Acompáñanos+a+celebrar+el+matrimonio+de+Christian+y+Karol.+Ceremonia:+Capilla+del+convento+San+Miguel.+Recepción:+Pachachaca+Inn,+Puente+colonial.&location=Capilla+del+convento+San+Miguel,+Urb.+Asuncion,+Prolongacion+Huancavelica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5ECE1] hover:bg-[#EDE1D3] text-[#352017] transition-colors border border-[#C7AB93]/40"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#965C3B]" />
                  <span>Añadir a Google Calendar</span>
                </a>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* 6. UBICACIONES: CEREMONIA RELIGIOSA & MATRIMONIO CIVIL / RECEPCIÓN */}
        <RevealSection>
          <section id="ubicaciones" className="py-24 px-4 bg-[#F5ECE1]/60">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-[0.3em] text-[#965C3B] font-bold block mb-3">
                  Itinerario &amp; Direcciones
                </span>
                <h3 className="font-serif-wedding text-4xl sm:text-5xl text-[#352017]">
                  Dónde &amp; Cuándo
                </h3>
                <p className="text-stone-600 text-sm sm:text-base font-sans-wedding max-w-lg mx-auto mt-2">
                  Los lugares donde celebraremos este momento inolvidable.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* 1. Ceremonia Religiosa */}
                <div className="bg-[#FFFEFB] rounded-2xl shadow-md border border-[#C7AB93]/40 p-8 sm:p-10 flex flex-col justify-between text-center relative overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-[#965C3B]"></div>
                  
                  <div>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#965C3B]/10 text-[#965C3B] mb-5 border border-[#965C3B]/20">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.25em] text-[#965C3B] font-bold block mb-2">
                      Ceremonia Religiosa
                    </span>
                    <h4 className="font-serif-wedding text-3xl text-[#352017] mb-3">
                      Capilla del convento San Miguel
                    </h4>
                    <p className="text-stone-600 text-sm font-sans-wedding mb-4">
                      Urb. Asunción – Prolongación Huancavelica
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF7F2] rounded-full text-sm font-medium text-[#352017] border border-[#C7AB93]/30 mb-6">
                      <Clock className="w-4 h-4 text-[#965C3B]" />
                      <span>Hora: 2:30 PM (Puntual)</span>
                    </div>
                  </div>

                  <a
                    href="https://maps.app.goo.gl/Rb1TnTpkk14tiQKJ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#965C3B] hover:bg-[#7F4C2F] text-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-xs transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Ver Ubicación en Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 2. Matrimonio Civil y Recepción */}
                <div className="bg-[#FFFEFB] rounded-2xl shadow-md border border-[#C7AB93]/40 p-8 sm:p-10 flex flex-col justify-between text-center relative overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-[#C7AB93]"></div>
                  
                  <div>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C7AB93]/20 text-[#965C3B] mb-5 border border-[#C7AB93]/40">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.25em] text-[#965C3B] font-bold block mb-2">
                      Matrimonio Civil &amp; Recepción
                    </span>
                    <h4 className="font-serif-wedding text-3xl text-[#352017] mb-3">
                      Pachachaca Inn
                    </h4>
                    <p className="text-stone-600 text-sm font-sans-wedding mb-4">
                      En Puente Colonial
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF7F2] rounded-full text-sm font-medium text-[#352017] border border-[#C7AB93]/30">
                      <Clock className="w-4 h-4 text-[#965C3B]" />
                      <span>Al culminar la ceremonia religiosa</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </RevealSection>

        {/* 7. REGLA OBLIGATORIA: SIN NIÑOS (ADULTS ONLY) */}
        <RevealSection>
          <section className="py-16 px-4 bg-[#FAF7F2]">
            <div className="max-w-2xl mx-auto bg-[#FFFEFB] border-2 border-dashed border-[#965C3B]/40 rounded-2xl p-8 sm:p-10 text-center shadow-xs">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F5ECE1] text-[#965C3B] mb-4">
                <Users className="w-7 h-7" />
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#965C3B] font-bold block mb-2">
                Nota Especial
              </span>

              <h4 className="font-serif-wedding text-3xl sm:text-4xl text-[#352017] mb-3">
                Celebración Solo para Adultos (Sin Niños)
              </h4>

              <div className="w-16 h-[1px] bg-[#C7AB93] mx-auto my-3"></div>

              <p className="text-stone-600 text-sm sm:text-base font-sans-wedding max-w-lg mx-auto leading-relaxed">
                Adoramos a los pequeños de la familia, pero deseamos que este día puedas disfrutar al máximo, relajarte y celebrar junto a nosotros sin preocupaciones. Por ello, tanto la ceremonia como la recepción serán <strong>exclusivamente para adultos</strong>.
              </p>

              <div className="mt-5 text-xs text-[#965C3B] font-medium tracking-wide">
                ¡Agradecemos de corazón tu comprensión y apoyo!
              </div>
            </div>
          </section>
        </RevealSection>

        {/* 8. CÓDIGO DE VESTIMENTA (DRESS CODE) */}
        <RevealSection>
          <section id="dress-code" className="py-20 px-4 bg-[#F5ECE1]/40 border-t border-[#C7AB93]/30">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-[#965C3B] font-bold block mb-2">
                Etiqueta
              </span>
              <h3 className="font-serif-wedding text-3xl sm:text-4xl text-[#352017] mb-3">
                Código de Vestimenta (Dress Code)
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto mb-10 font-sans-wedding">
                Deseamos que este día sea inolvidable y celebremos todos de gala este gran momento.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto mb-8">
                {/* Caballeros */}
                <div className="bg-[#FFFEFB] p-8 rounded-2xl shadow-xs border border-[#C7AB93]/40 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#965C3B]/10 text-[#965C3B] flex items-center justify-center mb-4">
                    <Award className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif-wedding text-2xl text-[#352017] font-semibold mb-2">
                    Caballeros
                  </h4>
                  <div className="w-10 h-[1px] bg-[#C7AB93]/60 mb-3"></div>
                  <p className="text-sm font-semibold text-[#965C3B] uppercase tracking-wider mb-1">
                    Con Terno
                  </p>
                  <p className="text-xs text-stone-500 font-sans-wedding">
                    Traje formal / terno
                  </p>
                </div>

                {/* Mujeres */}
                <div className="bg-[#FFFEFB] p-8 rounded-2xl shadow-xs border border-[#C7AB93]/40 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#965C3B]/10 text-[#965C3B] flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif-wedding text-2xl text-[#352017] font-semibold mb-2">
                    Mujeres
                  </h4>
                  <div className="w-10 h-[1px] bg-[#C7AB93]/60 mb-3"></div>
                  <p className="text-sm font-semibold text-[#965C3B] uppercase tracking-wider mb-1">
                    Vestido
                  </p>
                  <p className="text-xs text-stone-500 font-sans-wedding">
                    Vestido de fiesta elegante
                  </p>
                </div>
              </div>

              {/* Reserva de color blanco */}
              <div className="bg-[#FFFEFB] border border-[#965C3B]/40 rounded-2xl p-5 max-w-lg mx-auto flex items-center justify-center gap-3 text-center shadow-xs">
                <Heart className="w-5 h-5 text-[#965C3B] shrink-0" />
                <p className="text-sm text-[#352017] font-sans-wedding leading-relaxed">
                  Por favor, <strong className="text-[#965C3B]">reserva el color blanco</strong> exclusivamente para la novia.
                </p>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* 9. REGALOS / LLUVIA DE SOBRES & YAPE */}
        <RevealSection>
          <section id="regalos" className="py-24 px-4 bg-[#FAF7F2]">
            <div className="max-w-2xl mx-auto bg-[#FFFEFB] rounded-2xl shadow-xl border border-[#C7AB93]/40 p-8 sm:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#965C3B]/10 text-[#965C3B] mb-5 border border-[#965C3B]/20">
                <Gift className="w-8 h-8" />
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-[#965C3B] font-bold block mb-2">
                Muestra de Cariño
              </span>

              <h3 className="font-serif-wedding text-3xl sm:text-4xl text-[#352017] mb-3">
                Lluvia de Sobres &amp; Regalos
              </h3>

              <p className="text-stone-600 text-sm sm:text-base font-sans-wedding mb-8 max-w-lg mx-auto leading-relaxed">
                Tu presencia es nuestro mejor y más valioso regalo. Cualquier obsequio será con mucho cariño bien recibido, o si deseas hacernos llegar tu presente por transferencia bancaria o Yape, ponemos a tu disposición nuestras cuentas:
              </p>

              <div className="space-y-4 max-w-lg mx-auto">
                {/* Yape Card */}
                <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#C7AB93]/50 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <span className="bg-[#742284] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Yape
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">
                        Christian &amp; Karol
                      </span>
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#352017] tracking-wider">
                      +51 993 039 616
                    </div>
                  </div>

                  <button
                    onClick={handleCopyYape}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#965C3B] hover:bg-[#7F4C2F] text-white text-xs uppercase tracking-wider font-semibold rounded-full shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    {copiedYape ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#F5ECE1]" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* BCP Soles Card */}
                <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#C7AB93]/50 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <span className="bg-[#002A8F] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        BCP Soles
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">
                        Número de Cuenta
                      </span>
                    </div>
                    <div className="font-mono text-lg sm:text-xl font-bold text-[#352017] tracking-wider select-all">
                      20012101675095
                    </div>
                  </div>

                  <button
                    onClick={handleCopyBcp}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#965C3B] hover:bg-[#7F4C2F] text-white text-xs uppercase tracking-wider font-semibold rounded-full shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    {copiedBcp ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#F5ECE1]" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* CCI Interbancaria Card */}
                <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#C7AB93]/50 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <span className="bg-[#556B52] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        CCI
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">
                        Cuenta Interbancaria
                      </span>
                    </div>
                    <div className="font-mono text-base sm:text-lg font-bold text-[#352017] tracking-wide select-all break-all">
                      00220011210167509545
                    </div>
                  </div>

                  <button
                    onClick={handleCopyCci}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#965C3B] hover:bg-[#7F4C2F] text-white text-xs uppercase tracking-wider font-semibold rounded-full shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    {copiedCci ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#F5ECE1]" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 text-xs text-stone-400 font-sans-wedding">
                El día del evento también contaremos con buzón para lluvia de sobres.
              </div>
            </div>
          </section>
        </RevealSection>

        {/* 10. GALERÍA DE FOTOS */}
        <RevealSection>
          <section id="galeria" className="py-24 px-4 bg-[#F5ECE1]/50 border-t border-[#C7AB93]/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-[0.3em] text-[#965C3B] font-bold block mb-3">
                  Nuestra Historia de Amor
                </span>
                <h3 className="font-serif-wedding text-4xl sm:text-5xl text-[#352017] mb-3">
                  Galería de Momentos
                </h3>
                <p className="text-stone-600 text-sm sm:text-base font-sans-wedding max-w-lg mx-auto">
                  Instantes que atesoramos en el corazón. Haz clic en cualquier fotografía para verla en pantalla completa.
                </p>
              </div>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {galleryPhotos.map((photo, index) => (
                  <div 
                    key={index} 
                    onClick={() => setActiveImageIndex(index)}
                    className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md cursor-pointer bg-white border border-[#C7AB93]/40 transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#352017]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#C7AB93] mb-1">
                        Christian &amp; Karol
                      </span>
                      <h4 className="font-serif-wedding text-white text-xl font-light">
                        {photo.title}
                      </h4>
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* LIGHTBOX MODAL */}
        {activeImageIndex !== null && (
          <div className="fixed inset-0 z-50 bg-[#25150E]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors cursor-pointer"
              aria-label="Cerrar galería"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((activeImageIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
              }}
              className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors z-50 cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((activeImageIndex + 1) % galleryPhotos.length);
              }}
              className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors z-50 cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center relative">
              <img
                src={galleryPhotos[activeImageIndex].url}
                alt={galleryPhotos[activeImageIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center">
                <p className="font-serif-wedding text-2xl text-white font-light">
                  {galleryPhotos[activeImageIndex].title}
                </p>
                <p className="text-xs uppercase tracking-widest text-[#C7AB93] mt-1">
                  {activeImageIndex + 1} de {galleryPhotos.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 11. CONFIRMACIÓN DE ASISTENCIA (WHATSAPP +51 993 039 616) */}
        <RevealSection>
          <section id="asistencia" className="py-24 px-4 bg-[#FAF7F2]">
            <div className="max-w-2xl mx-auto bg-[#FFFEFB] rounded-2xl shadow-xl border border-[#C7AB93]/40 p-8 sm:p-12">
              <div className="text-center mb-10">
                <span className="text-xs uppercase tracking-[0.3em] text-[#965C3B] font-bold block mb-2">
                  RSVP
                </span>
                <h3 className="font-serif-wedding text-3xl sm:text-4xl text-[#352017] mb-3">
                  Confirmación de Asistencia
                </h3>
                <p className="text-stone-600 text-sm font-sans-wedding">
                  Tu presencia es indispensable. Por favor confirma tu asistencia al WhatsApp{' '}
                  <a 
                    href="https://wa.me/51993039616" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold text-[#965C3B] hover:underline"
                  >
                    +51 993 039 616
                  </a>
                </p>
              </div>

              <form onSubmit={handleWhatsAppRsvp} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#352017] font-bold mb-2">
                    Tu nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-3 rounded-xl border border-[#C7AB93]/60 focus:ring-2 focus:ring-[#965C3B] focus:outline-none text-sm bg-[#FAF7F2]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#352017] font-bold mb-2">
                      ¿Asistirás? *
                    </label>
                    <select
                      value={rsvpStatus}
                      onChange={(e) => setRsvpStatus(e.target.value as 'yes' | 'no')}
                      className="w-full px-4 py-3 rounded-xl border border-[#C7AB93]/60 focus:ring-2 focus:ring-[#965C3B] focus:outline-none text-sm bg-[#FAF7F2]"
                    >
                      <option value="yes">Sí, ahí estaré con alegría</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>

                  {rsvpStatus === 'yes' && (
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#352017] font-bold mb-2">
                        Pases de adultos
                      </label>
                      <select
                        value={rsvpGuests}
                        onChange={(e) => setRsvpGuests(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#C7AB93]/60 focus:ring-2 focus:ring-[#965C3B] focus:outline-none text-sm bg-[#FAF7F2]"
                      >
                        <option value="1">1 persona (Solo yo)</option>
                        <option value="2">2 personas (Mi pareja y yo)</option>
                        <option value="3">3 personas</option>
                        <option value="4">4 personas</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#352017] font-bold mb-2">
                    Mensaje o dedicatoria para los novios (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="¡Que viva el amor! Felicitaciones..."
                    className="w-full px-4 py-3 rounded-xl border border-[#C7AB93]/60 focus:ring-2 focus:ring-[#965C3B] focus:outline-none text-sm bg-[#FAF7F2]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-widest font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Confirmar vía WhatsApp (+51 993 039 616)</span>
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-[#C7AB93]/20 text-center">
                <a
                  href="https://wa.me/51993039616?text=Hola%20Christian%20y%20Karol%2C%20quisiera%20hacerles%20una%20consulta%20sobre%20su%20boda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-500 hover:text-[#965C3B] transition-colors"
                >
                  ¿Tienes dudas? Escríbenos directamente a WhatsApp
                </a>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* 12. CIERRE ELEGANTE & FOOTER */}
        <RevealSection>
          <footer className="py-20 px-4 bg-[#352017] text-[#FAF7F2] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#C7AB93_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
            
            <div className="relative max-w-xl mx-auto flex flex-col items-center">
              <CKMonogram className="w-24 sm:w-28 h-auto text-[#C7AB93] mb-4" />
              
              <div className="w-16 h-[1px] bg-[#C7AB93]/80 my-3"></div>

              <p className="font-serif-wedding text-2xl sm:text-3xl italic mb-6 leading-relaxed">
                “Será un verdadero honor contar con tu compañía en este día tan sagrado e inolvidable.”
              </p>

              <p className="text-[#C7AB93] text-base font-serif-wedding tracking-widest mb-2">
                Christian &amp; Karol
              </p>

              <div className="text-xs text-stone-400 tracking-widest uppercase mb-12">
                28 · 11 · 2026
              </div>

              {/* COTIZACIÓN / CREADOR BANNER */}
              <div className="w-full bg-[#2A1810]/90 backdrop-blur-sm border border-[#C7AB93]/30 rounded-2xl p-6 sm:p-8 text-center shadow-lg">
                <p className="font-serif-wedding text-2xl text-[#FAF7F2] mb-2 italic">
                  ¿Te gusta una invitación así? Cotiza la tuya
                </p>
                
                <div className="mt-6 flex items-center justify-center gap-4">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/51932350348?text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20una%20invitaci%C3%B3n%20virtual"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                    title="WhatsApp: 932350348"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@vaccreative?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black hover:bg-stone-900 text-white flex items-center justify-center shadow border border-white/20 transition-transform hover:scale-110"
                    title="TikTok (@vaccreative)"
                    aria-label="TikTok"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.242V2h-3.445v13.67a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002-.001a2.895 2.895 0 0 1 3.144-4.53v-3.48a6.342 6.342 0 0 0-5.645 6.338 6.341 6.341 0 0 0 6.342 6.342 6.341 6.341 0 0 0 6.342-6.342V9.073a8.196 8.196 0 0 0 4.75 1.516V7.144a4.79 4.79 0 0 1-1.077-.458z"/>
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@V.A.C.Creative"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                    title="YouTube (@V.A.C.Creative)"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/VAC.Creativ/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow transition-transform hover:scale-110"
                    title="Facebook (VAC Creative)"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>

                <div className="mt-6 text-[10px] text-stone-400 uppercase tracking-widest font-medium">
                  V.A.C. Creative · Invitaciones Virtuales
                </div>
              </div>

            </div>
          </footer>
        </RevealSection>

      </div>
    </div>
  );
}
