import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../common/Icons";

export const FinalCtaSection = () => {
  return (
    <section className="final-cta-section">
      <img 
        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=80" 
        alt="Recepción de banquete elegante" 
        className="final-cta-bg-img"
        loading="lazy"
      />
      <div className="container">
        <div className="final-cta-content">
          <span className="eyebrow" style={{ color: "var(--color-champagne)" }}>
            Comienza Hoy
          </span>
          <h2 className="final-cta-title">
            Haz que tu gran día empiece con la mejor experiencia.
          </h2>
          <p className="final-cta-text">
            Explora paquetes integrales para Los Cerezos Salón de Eventos en Reynosa y solicita disponibilidad para tu fecha desde un mismo lugar.
          </p>
          <Link to="/cotizar" className="btn btn-accent btn-lg">
            <span>Cotizar mi evento</span>
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
