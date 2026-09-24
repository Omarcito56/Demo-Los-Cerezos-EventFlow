import React from "react";
import { Link } from "react-router-dom";
import { CerezosLogoIcon, MailIcon, WhatsAppIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/eventFlowData";

export const Footer = () => {
  return (
    <footer className="footer-editorial">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--color-burgundy)", color: "var(--color-champagne)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CerezosLogoIcon size={22} />
              </div>
              <h3 className="footer-brand-title">{initialBusinessData.brandShort}</h3>
            </div>
            <span className="footer-brand-subtitle">Salón de Eventos · Reynosa</span>
            <p className="footer-brand-desc">
              Propuesta digital interactiva para paquetes integrales, cotización en vivo, disponibilidad de fechas y coordinación de eventos de ticket alto.
            </p>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="footer-col-heading">Navegación</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/">Inicio</Link></li>
              <li className="footer-link-item"><a href="#paquetes">Paquetes integrales</a></li>
              <li className="footer-link-item"><Link to="/cotizar">Cotizador en línea</Link></li>
              <li className="footer-link-item"><a href="#calendario">Encuentra tu fecha</a></li>
              <li className="footer-link-item"><a href="#contacto">Contacto y citas</a></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="footer-col-heading">Celebraciones Demo</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/cotizar?tipo=boda">Bodas y recepciones</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=xv-anos">XV Años de gala</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=graduacion">Graduaciones</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=corporativo">Eventos corporativos</Link></li>
              <li className="footer-link-item"><Link to="/cotizar?tipo=aniversario">Aniversarios</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="footer-col-heading">Contacto y WhatsApp</h4>
            <div className="footer-contact-info">
              <a 
                href={initialBusinessData.whatsappUrl + "?text=" + encodeURIComponent("Hola Los Cerezos, me interesa solicitar informes para mi evento.")} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-contact-pill"
                style={{ borderColor: "rgba(37, 211, 102, 0.4)", color: "#FFFFFF" }}
              >
                <WhatsAppIcon size={16} style={{ color: "#25D366" }} />
                <span>WhatsApp: {initialBusinessData.phoneFormatted}</span>
              </a>

              <a href={`mailto:${initialBusinessData.email}`} className="footer-contact-pill">
                <MailIcon size={16} />
                <span>{initialBusinessData.email}</span>
              </a>
              <span style={{ fontSize: "0.8rem", color: "#8E887E", lineHeight: 1.5 }}>
                Atención directa en Reynosa, Tamaulipas.
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="footer-legal-disclaimer">
          {initialBusinessData.disclaimer}
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} {initialBusinessData.name}. Todos los derechos reservados.
          </div>

          <div className="footer-bs-code-tag">
            {initialBusinessData.footerNote}
          </div>

          <div>
            <Link to="/admin/login" className="footer-admin-link">
              Acceso a Panel EventFlow Admin →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
