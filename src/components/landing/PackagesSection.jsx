import React from "react";
import { Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { CheckIcon, ArrowRightIcon, UsersIcon } from "../common/Icons";

export const PackagesSection = () => {
  const { packages, business } = useEventData();

  return (
    <section className="packages-section" id="paquetes">
      <div className="container">
        {/* Header */}
        <div className="section-header-centered">
          <span className="section-demo-badge">PRECIOS DEMOSTRATIVOS</span>
          <h2 className="section-title-editorial">Una experiencia para cada ocasión</h2>
          <p className="section-subtext">
            Propuestas integrales para Los Cerezos Salón de Eventos que combinan salón climatizado, banquete formal, mobiliario, mantelería, sonido, decoración y coordinación. Precios demostrativos personalizables en el cotizador.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="packages-grid">
          {packages.map((pkg) => (
            <article 
              key={pkg.id} 
              className={`package-card ${pkg.popular ? "highlighted" : ""}`}
            >
              <div className="package-card-img-wrap">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="package-card-img"
                  loading="lazy"
                />
                <span className="package-card-tag">{pkg.badge}</span>
              </div>

              <div className="package-card-body">
                <div className="package-card-title-row">
                  <h3 className="package-card-name">{pkg.name}</h3>
                </div>

                <div className="package-price-wrap">
                  <span className="package-price-from">Desde</span>
                  <div className="package-price-val">{pkg.priceFrom}</div>
                </div>

                <div className="package-capacity-pill">
                  <UsersIcon size={14} />
                  <span>{pkg.capacity}</span>
                </div>

                <p className="package-desc">{pkg.description}</p>

                <ul className="package-includes-list">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx} className="package-include-item">
                      <CheckIcon size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="package-card-actions">
                  <Link 
                    to={`/cotizar?paquete=${pkg.id}`} 
                    className={`btn btn-block ${pkg.popular ? "btn-accent" : "btn-primary"}`}
                  >
                    <span>Cotizar este paquete</span>
                    <ArrowRightIcon size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mandatory Disclaimer */}
        <p className="package-disclaimer-note">
          {business.disclaimer}
        </p>
      </div>
    </section>
  );
};
