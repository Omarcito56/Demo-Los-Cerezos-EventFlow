import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../common/Icons";

const steps = [
  {
    num: "01",
    title: "Cotiza tu paquete",
    desc: "Elige tu tipo de evento, número de invitados y servicios adicionales con cálculo en vivo."
  },
  {
    num: "02",
    title: "Consulta disponibilidad",
    desc: "Revisa fechas abiertas y futuras en nuestro calendario antes de tomar una decisión."
  },
  {
    num: "03",
    title: "Personaliza tu montaje",
    desc: "Define detalles de salón, degustación del banquete, mantelería y música con el equipo de Los Cerezos."
  },
  {
    num: "04",
    title: "Aparta tu fecha",
    desc: "Asegura la fecha oficial de tu evento mediante un anticipo pactado con folio digital."
  },
  {
    num: "05",
    title: "Seguimiento integral",
    desc: "Supervisa tiempos de montaje, programa de gala y coordinación profesional en un solo lugar."
  }
];

export const ExperienceSection = () => {
  return (
    <section className="experience-section">
      <div className="container">
        <div className="section-header-centered">
          <span className="eyebrow">Flujo sin Fricción</span>
          <h2 className="section-title-editorial">Del primer clic al gran día</h2>
          <p className="section-subtext">
            Diseñamos una experiencia transparente para que planear tu boda, XV años o evento social en Los Cerezos sea tan emocionante como la celebración misma.
          </p>
        </div>

        <div className="experience-steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="experience-step-card">
              <span className="experience-step-num">{step.num}</span>
              <h3 className="experience-step-title">{step.title}</h3>
              <p className="experience-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/cotizar" className="btn btn-primary btn-lg">
            <span>Iniciar mi cotización ahora</span>
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
