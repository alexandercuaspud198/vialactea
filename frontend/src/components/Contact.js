import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { contactInfo, weatherData } from '../mock/data';
import { Phone, Mail, MapPin, MessageCircle, Cloud, Moon, Send, Calendar } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "¡Solicitud enviada!",
      description: "Te contactaremos pronto para confirmar tu reserva.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      guests: '',
      message: ''
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola! Me interesa hacer una reserva:\n\nNombre: ${formData.name}\nFecha: ${formData.date}\nPersonas: ${formData.guests}\nMensaje: ${formData.message}`
    );
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank');
  };

  const openGoogleMaps = () => {
    window.open('https://maps.google.com/?q=Guachucal,Nariño,Colombia', '_blank');
  };

  return (
    <section id="contacto" className="py-24 bg-page">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-6 text-primary">
            Contacto y Reservas
          </h2>
          <p className="body-large text-secondary max-w-2xl mx-auto">
            Planifica tu visita a Guachucal. Estamos aquí para ayudarte a vivir una experiencia inolvidable
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="service-card">
              <h3 className="service-card-title mb-6">
                Solicita tu Reserva
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Nombre completo *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Número de personas *
                    </label>
                    <Input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      min="1"
                      placeholder="2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Fecha preferida *
                  </label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Mensaje adicional
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos si tienes alguna preferencia especial o pregunta..."
                    rows={4}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="btn-primary flex-1">
                    <Send size={16} className="mr-2" />
                    Enviar Solicitud
                  </Button>
                  <Button type="button" onClick={handleWhatsApp} className="btn-secondary flex-1">
                    <MessageCircle size={16} className="mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Info & Weather */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="service-card">
                <h3 className="service-card-title mb-6">
                  Información de Contacto
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-brand-primary" />
                    <div>
                      <p className="font-medium">{contactInfo.phone}</p>
                      <p className="text-sm text-secondary">Lunes a Domingo 7:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-brand-primary" />
                    <div>
                      <p className="font-medium">{contactInfo.email}</p>
                      <p className="text-sm text-secondary">Respuesta en 24 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MessageCircle size={20} className="text-brand-primary" />
                    <div>
                      <p className="font-medium">WhatsApp {contactInfo.whatsapp}</p>
                      <p className="text-sm text-secondary">Respuesta inmediata</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin size={20} className="text-brand-primary mt-1" />
                    <div>
                      <p className="font-medium">{contactInfo.address}</p>
                      <button 
                        onClick={openGoogleMaps}
                        className="text-sm text-brand-primary hover:underline"
                      >
                        Abrir en Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Widget */}
              <div className="service-card">
                <h3 className="service-card-title mb-4">
                  Clima Actual en el Páramo
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Cloud size={24} className="text-blue-500 mr-2" />
                      <span className="text-2xl font-bold text-blue-600">
                        {weatherData.temperature}°C
                      </span>
                    </div>
                    <p className="text-sm text-secondary">Temperatura</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-lg mr-2">💧</span>
                      <span className="text-xl font-semibold text-blue-600">
                        {weatherData.humidity}%
                      </span>
                    </div>
                    <p className="text-sm text-secondary">Humedad</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-section rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Moon size={16} className="text-yellow-500" />
                      <span className="text-sm font-medium">Fase lunar:</span>
                    </div>
                    <span className="text-sm">{weatherData.moonPhase}</span>
                  </div>
                  <p className="text-xs text-secondary mt-1">
                    Condiciones: {weatherData.conditions}
                  </p>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="service-card">
                <h3 className="service-card-title mb-4">
                  Tips para tu Visita
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-primary">•</span>
                    <span>Lleva ropa abrigada, las madrugadas son frías</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-primary">•</span>
                    <span>No olvides protector solar y gorra</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-primary">•</span>
                    <span>Zapatos cómodos para caminatas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-primary">•</span>
                    <span>Cámara para capturar los paisajes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mt-16">
          <h3 className="heading-3 text-center mb-8 text-primary">
            Cómo Llegar a Guachucal
          </h3>
          <div className="max-w-4xl mx-auto service-card">
            <div className="aspect-video bg-gray-200 rounded-lg mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.123!2d-77.6167!3d1.1667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed4c5c5c5c5c5%3A0x1234567890abcdef!2sGuachucal%2C%20Nari%C3%B1o!5e0!3m2!1ses!2sco!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Mapa de Guachucal"
                className="rounded-lg"
              ></iframe>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Desde Pasto:</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li>• Bus directo: 45 minutos ($8,000)</li>
                  <li>• Taxi/Uber: 40 minutos ($25,000)</li>
                  <li>• Vehículo propio: Vía Panamericana Norte</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">Desde Ipiales:</h4>
                <ul className="space-y-2 text-sm text-secondary">
                  <li>• Bus directo: 25 minutos ($5,000)</li>
                  <li>• Taxi: 20 minutos ($15,000)</li>
                  <li>• Conexión desde frontera Ecuador</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;