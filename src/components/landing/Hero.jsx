import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, SparklesIcon, CheckCircleIcon, CalendarIcon } from "../common/Icons";

export const Hero = () => {
  return (
    <section className="hero-editorial">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Copy & CTAs */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <SparklesIcon size={14} />
              <span>LOS CEREZOS · SALÓN DE EVENTOS · REYNOSA</span>
            </div>

            <h1 className="hero-title">
              Todo para tu gran día.<br />
              En una sola experiencia.
            </h1>

            <p className="hero-subtitle">
              Explora paquetes, personaliza servicios y solicita disponibilidad para tu fecha desde un mismo lugar.
            </p>

            <div className="hero-actions">
              <Link to="/cotizar" className="btn btn-primary btn-lg">
                <span>Cotizar mi evento</span>
                <ArrowRightIcon size={18} />
              </Link>
              <a href="#calendario" className="btn btn-secondary btn-lg">
                <CalendarIcon size={18} />
                <span>Consultar fecha</span>
              </a>
            </div>

            {/* 4 Indicadores discretos de la propuesta demo */}
            <div className="hero-indicators">
              <div className="hero-indicator-item">
                <span className="indicator-number">01</span>
                <span className="indicator-label">Paquetes integrales</span>
                <span className="indicator-sub">Salón, banquete y música</span>
              </div>
              <div className="hero-indicator-item">
                <span className="indicator-number">02</span>
                <span className="indicator-label">Cotización en vivo</span>
                <span className="indicator-sub">Presupuesto transparente</span>
              </div>
              <div className="hero-indicator-item">
                <span className="indicator-number">03</span>
                <span className="indicator-label">Disponibilidad</span>
                <span className="indicator-sub">Agenda en tiempo real</span>
              </div>
              <div className="hero-indicator-item">
                <span className="indicator-number">04</span>
                <span className="indicator-label">Apartado de fecha</span>
                <span className="indicator-sub">Simulación sin riesgo</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Asimétrico de Alto Impacto */}
          <div className="hero-visual-wrap">
            <div className="hero-main-photo-card">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80" 
                alt="Montaje de gala en salón de eventos Los Cerezos" 
                className="hero-img-cover"
                loading="eager"
              />
              <div className="hero-floating-badge">
                <div className="hero-badge-left">
                  <span className="hero-badge-tag">Propuesta Personalizada</span>
                  <span className="hero-badge-title">Los Cerezos Salón de Eventos</span>
                </div>
                <div style={{ color: "var(--color-champagne)" }}>
                  <CheckCircleIcon size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
