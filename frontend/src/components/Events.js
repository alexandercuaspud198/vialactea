import React, { useState, useEffect } from 'react';
import { events } from '../mock/data';
import { Button } from './ui/button';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const Events = () => {
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const nextEvent = events.find(event => event.countdown);
      if (nextEvent) {
        const eventDate = new Date(nextEvent.date);
        const now = new Date();
        const difference = eventDate - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setCountdown({ days, hours, minutes, seconds });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const nextEvent = events.find(event => event.countdown);

  return (
    <section id="eventos" className="py-24 bg-page">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-6 text-primary">
            Eventos y Festivales
          </h2>
          <p className="body-large text-secondary max-w-2xl mx-auto">
            Celebra con nosotros las tradiciones y la cultura de Guachucal
          </p>
        </div>

        {/* Countdown Section */}
        {nextEvent && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="service-card bg-gradient-to-r from-orange-50 to-yellow-50 text-center">
              <h3 className="service-card-title mb-4">
                Próximo Evento: {nextEvent.name}
              </h3>
              <p className="service-card-description mb-6">
                {nextEvent.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{countdown.days || 0}</div>
                  <div className="text-sm text-secondary">Días</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{countdown.hours || 0}</div>
                  <div className="text-sm text-secondary">Horas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{countdown.minutes || 0}</div>
                  <div className="text-sm text-secondary">Minutos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{countdown.seconds || 0}</div>
                  <div className="text-sm text-secondary">Segundos</div>
                </div>
              </div>

              <Button className="btn-primary">
                Quiero Participar
              </Button>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="company-grid">
          {events.map((event, index) => (
            <div key={index} className="service-card group">
              <div className="space-y-4">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar size={16} className="text-brand-primary" />
                    <span className="text-sm font-medium text-brand-primary">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  
                  <h3 className="service-card-title mb-2">
                    {event.name}
                  </h3>
                  <p className="service-card-description mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-secondary">
                      <MapPin size={14} />
                      <span>Plaza Central de Guachucal</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-secondary">
                      <Users size={14} />
                      <span>Evento familiar - Entrada libre</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-secondary">
                      <Clock size={14} />
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sponsorship CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto bg-section rounded-lg p-8">
            <h3 className="heading-3 mb-4 text-primary">
              ¿Quieres participar como expositor o patrocinador?
            </h3>
            <p className="body-medium text-secondary mb-6">
              Únete a nuestros eventos y fortalece el turismo comunitario en Guachucal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-secondary">
                Solicitar Stand
              </Button>
              <Button className="btn-primary">
                Ser Patrocinador
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;