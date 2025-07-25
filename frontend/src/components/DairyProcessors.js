import React from 'react';
import { dairyProcessors, iotData } from '../mock/data';
import { Badge } from './ui/badge';
import { Thermometer, FlaskConical, Clock, TrendingUp } from 'lucide-react';

const DairyProcessors = () => {
  const formatLastUpdate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <section id="procesadoras" className="py-24 bg-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-6 text-primary">
            Procesadoras de Leche Aliadas
          </h2>
          <p className="body-large text-secondary max-w-2xl mx-auto">
            Conoce las empresas que transforman la leche fresca de Guachucal 
            en productos de alta calidad
          </p>
        </div>

        {/* IoT Dashboard Demo */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="service-card bg-gradient-to-r from-blue-50 to-green-50">
            <h3 className="service-card-title text-center mb-6">
              Monitoreo en Tiempo Real - Tanque Central
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Thermometer className="text-blue-500 mr-2" size={24} />
                  <span className="text-2xl font-bold text-blue-600">
                    {iotData.tankTemperature}°C
                  </span>
                </div>
                <p className="text-sm text-secondary">Temperatura</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <FlaskConical className="text-green-500 mr-2" size={24} />
                  <span className="text-2xl font-bold text-green-600">
                    {iotData.pH}
                  </span>
                </div>
                <p className="text-sm text-secondary">Nivel pH</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="text-orange-500 mr-2" size={24} />
                  <span className="text-lg font-semibold text-orange-600">
                    {formatLastUpdate(iotData.lastUpdate)}
                  </span>
                </div>
                <p className="text-sm text-secondary">Última actualización</p>
              </div>
            </div>
          </div>
        </div>

        {/* Processors Grid */}
        <div className="company-grid">
          {dairyProcessors.map((processor, index) => (
            <div key={index} className="service-card group">
              <div className="space-y-4">
                <img
                  src={processor.image}
                  alt={processor.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                
                <div>
                  <h3 className="service-card-title mb-2">
                    {processor.name}
                  </h3>
                  <p className="service-card-description mb-4">
                    {processor.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={16} className="text-brand-primary" />
                      <span className="font-semibold text-brand-primary">
                        {processor.stats}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">Certificaciones:</p>
                    <div className="flex flex-wrap gap-2">
                      {processor.certifications.map((cert, certIndex) => (
                        <Badge 
                          key={certIndex} 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Del Establo a la Mesa Gallery */}
        <div className="mt-16">
          <h3 className="heading-3 text-center mb-8 text-primary">
            Del Establo a la Mesa
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Ordeño", image: "/api/placeholder/250/200" },
              { title: "Recolección", image: "/api/placeholder/250/200" },
              { title: "Procesamiento", image: "/api/placeholder/250/200" },
              { title: "Producto Final", image: "/api/placeholder/250/200" }
            ].map((step, index) => (
              <div key={index} className="relative group cursor-pointer">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-semibold">{step.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DairyProcessors;