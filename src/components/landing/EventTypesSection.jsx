import React from "react";
import { Link } from "react-router-dom";
import { eventTypesList } from "../../data/eventFlowData";
import { ArrowRightIcon } from "../common/Icons";

export const EventTypesSection = () => {
  return (
    <section className="event-types-section" id="eventos">
      <div className="container">
        <div className="section-header-centered">
          <span className="eyebrow">Formatos de Celebración</span>
          <h2 className="section-title-editorial">Diseñado para los momentos que importan</h2>
          <p className="section-subtext">
            Desde bodas inolvidables y recepciones de XV años hasta graduaciones y galas corporativas en Reynosa, en Los Cerezos Salón de Eventos personalizamos el montaje, banquete y ambientación para tu gran ocasión.
          </p>
        </div>

        <div className="event-types-grid">
          {eventTypesList.filter(t => t.id !== "otro").map((type) => (
            <Link 
              key={type.id} 
              to={`/cotizar?tipo=${type.id}&paquete=${type.popularPackage}`}
              className="event-type-card"
            >
              <img 
                src={type.image} 
                alt={`Evento de ${type.name}`} 
                className="event-type-bg-img"
                loading="lazy"
              />
              <div className="event-type-gradient-overlay" />
              <div className="event-type-card-content">
                <h3 className="event-type-name">{type.name}</h3>
                <p className="event-type-sub">{type.subtitle}</p>
                <div className="event-type-cta-link">
                  <span>Cotizar {type.name}</span>
                  <ArrowRightIcon size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
