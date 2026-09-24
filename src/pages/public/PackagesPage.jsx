import React from "react";
import { Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { CheckIcon, ArrowRightIcon, UsersIcon, SparklesIcon } from "../../components/common/Icons";
import { useTrackOnMount } from "../../analytics/analytics";

export const PackagesPage = () => {
  const { packages, business } = useEventData();

  useTrackOnMount("demo_viewed", {
    view_type: "packages_catalog",
    route: "/paquetes"
  });

  return (
    <div style={{ padding: "4rem 0 6rem", backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <div className="section-header-centered">
          <span className="section-demo-badge">CATÁLOGO DEMOSTRATIVO</span>
          <h1 className="section-title-editorial">Paquetes Integrales para Celebraciones de Gala</h1>
          <p className="section-subtext">
            Conoce a detalle nuestros tres paquetes demostrativos base para Los Cerezos Salón de Eventos. Personaliza invitados, servicios adicionales y solicita disponibilidad en tiempo real.
          </p>
        </div>

        <div className="packages-grid" style={{ marginBottom: "3rem" }}>
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
                />
                <span className="package-card-tag">{pkg.badge}</span>
              </div>

              <div className="package-card-body">
                <div className="package-card-title-row">
                  <h2 className="package-card-name">{pkg.name}</h2>
                </div>

                <div className="package-price-wrap">
                  <span className="package-price-from">Inversión base demo</span>
                  <div className="package-price-val">{pkg.priceFrom}</div>
                </div>

                <div className="package-capacity-pill">
                  <UsersIcon size={14} />
                  <span>Capacidad: {pkg.capacity}</span>
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
                    <span>Configurar y cotizar</span>
                    <ArrowRightIcon size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center", padding: "1.75rem", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
          <SparklesIcon size={24} style={{ color: "var(--color-accent)", margin: "0 auto 0.75rem" }} />
          <h3 style={{ fontSize: "1.25rem", color: "var(--color-charcoal-deep)", marginBottom: "0.5rem" }}>
            ¿Necesitas una propuesta para un volumen mayor o montaje especial?
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-secondary)", marginBottom: "1.25rem" }}>
            Los Cerezos Salón de Eventos puede coordinar montajes de gala temáticos, mobiliario especial, barras de snacks y fotografía profesional a la medida.
          </p>
          <Link to="/cotizar" className="btn btn-primary btn-sm">
            <span>Iniciar cotizador libre</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        <p className="package-disclaimer-note" style={{ marginTop: "2.5rem" }}>
          {business.disclaimer}
        </p>
      </div>
    </div>
  );
};
