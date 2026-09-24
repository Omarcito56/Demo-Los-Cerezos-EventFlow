import React from "react";
import { UtensilsIcon, CalendarIcon, ShieldCheckIcon, SparklesIcon } from "../common/Icons";

export const IntroSection = () => {
  return (
    <section className="intro-section" id="experiencia">
      <div className="container">
        <div className="intro-grid">
          {/* Visual Composition */}
          <div className="intro-photo-composition">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80" 
              alt="Montaje de gala y banquete en Los Cerezos"
              className="intro-img-main"
              loading="lazy"
            />
            <div className="intro-card-overlay">
              <div className="intro-overlay-num">100%</div>
              <p className="intro-overlay-text">
                Celebraciones completas: desde el salón y banquete hasta sonido, foto y coordinación de tu gran fecha.
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="intro-content">
            <span className="eyebrow">Concepto de Servicio</span>
            <h2 className="intro-heading">
              Celebraciones completas, organizadas desde el primer clic.
            </h2>
            <p className="intro-text-concept">
              En Los Cerezos Salón de Eventos combinamos instalaciones de gala con una experiencia digital que facilita explorar paquetes integrales, cotizar en vivo y solicitar disponibilidad sin fricción.
            </p>

            <div className="intro-points-grid">
              <div className="intro-point-card">
                <div className="intro-point-icon">
                  <SparklesIcon size={22} />
                </div>
                <h3 className="intro-point-title">Salón y Montaje de Gala</h3>
                <p className="intro-point-desc">
                  Espacios climatizados con mobiliario elegante, mantelería fina y diseño floral para bodas y XV años.
                </p>
              </div>

              <div className="intro-point-card">
                <div className="intro-point-icon">
                  <UtensilsIcon size={22} />
                </div>
                <h3 className="intro-point-title">Banquete y Experiencia</h3>
                <p className="intro-point-desc">
                  Menús formales en tiempos, barra de snacks, estación de café y servicio de alta calidad.
                </p>
              </div>

              <div className="intro-point-card">
                <div className="intro-point-icon">
                  <CalendarIcon size={22} />
                </div>
                <h3 className="intro-point-title">Agenda y Disponibilidad</h3>
                <p className="intro-point-desc">
                  Consulta de fechas abiertas y seguimiento de apartado para fechas futuras con total claridad.
                </p>
              </div>

              <div className="intro-point-card">
                <div className="intro-point-icon">
                  <ShieldCheckIcon size={22} />
                </div>
                <h3 className="intro-point-title">Coordinación Total</h3>
                <p className="intro-point-desc">
                  Sonido, iluminación, fotografía, video y supervisión logística reunidos en una propuesta integral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
