import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { heroData } from '../mock/data';
import { Play, MessageCircle } from 'lucide-react';

const HeroSection = () => {
  const [currentLiters, setCurrentLiters] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Animate counter
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLiters(prev => {
        if (prev < heroData.dailyLitersProcessed) {
          return prev + Math.floor(heroData.dailyLitersProcessed / 100);
        }
        return heroData.dailyLitersProcessed;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppReservation = () => {
    const message = encodeURIComponent("Hola! Me interesa hacer una reserva para la experiencia turística en Guachucal.");
    window.open(`https://wa.me/${heroData.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section id="hero" className="hero-section relative overflow-hidden">
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full">
        {!isVideoPlaying ? (
          <div className="relative w-full h-full bg-gradient-hero flex items-center justify-center">
            <img 
              src="/api/placeholder/1200/800" 
              alt="Amanecer en Guachucal"
              className="w-full h-full object-cover opacity-30"
            />
            <button 
              onClick={handleVideoPlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
            >
              <div className="bg-white/90 rounded-full p-6 group-hover:scale-110 transition-transform">
                <Play size={48} className="text-primary ml-2" />
              </div>
            </button>
          </div>
        ) : (
          <iframe
            src={heroData.videoUrl + "?autoplay=1"}
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Video Hero Guachucal"
          />
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 hero-content text-center text-white">
        <h1 className="hero-title mb-6">
          {heroData.title}
        </h1>
        <p className="hero-subtitle mb-8 max-w-2xl mx-auto">
          {heroData.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={handleWhatsAppReservation}
            className="btn-primary text-lg px-8 py-4 min-h-14"
          >
            <MessageCircle className="mr-2" size={20} />
            Reserva Ahora
          </Button>
          <Button 
            variant="secondary"
            className="btn-secondary text-lg px-8 py-4 min-h-14"
          >
            Ver Experiencias
          </Button>
        </div>

        {/* Live Counter */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-md mx-auto border border-white/20">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {currentLiters.toLocaleString()}
            </div>
            <div className="text-sm opacity-90">
              Litros procesados hoy
            </div>
            <div className="text-xs opacity-70 mt-1">
              Actualizado en tiempo real
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-[5]" />
    </section>
  );
};

export default HeroSection;