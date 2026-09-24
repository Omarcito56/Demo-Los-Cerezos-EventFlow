import React from "react";
import { MailIcon, SendIcon, ShieldCheckIcon, WhatsAppIcon, PhoneIcon } from "../common/Icons";
import { initialBusinessData } from "../../data/eventFlowData";

export const LocationContact = () => {
  return (
    <section className="contact-editorial-section" id="contacto">
      <div className="container">
        <div className="contact-editorial-box">
          <span className="eyebrow">Atención y Visitas</span>
          <h2 className="contact-title">
            Contacto y Citas
          </h2>
          <p className="contact-desc">
            Para visitas guiadas a las instalaciones del salón, personalización de paquetes de gala o resolución de dudas, comunícate directamente con nuestro equipo en Reynosa, Tamaulipas.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", margin: "2rem 0" }}>
            {/* WhatsApp Card */}
            <div className="contact-email-card" style={{ borderColor: "var(--color-burgundy)", backgroundColor: "var(--color-surface)" }}>
              <div className="contact-email-row">
                <WhatsAppIcon size={24} style={{ color: "#25D366" }} />
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", display: "block" }}>
                    WhatsApp Oficial
                  </span>
                  <span className="contact-email-address" style={{ color: "var(--color-charcoal-deep)", fontWeight: 700 }}>
                    {initialBusinessData.phoneFormatted}
                  </span>
                </div>
              </div>

              <a 
                href={initialBusinessData.whatsappUrl + "?text=" + encodeURIComponent("Hola Los Cerezos, me gustaría solicitar informes y disponibilidad para mi evento.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp contact-send-btn"
                style={{ backgroundColor: "#25D366", color: "#FFFFFF", borderColor: "#25D366" }}
              >
                <WhatsAppIcon size={18} />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>

            {/* Email / Ubicación Card */}
            <div className="contact-email-card">
              <div className="contact-email-row">
                <MailIcon size={22} className="contact-email-icon" />
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", display: "block" }}>
                    Correo de Atención Demo
                  </span>
                  <span className="contact-email-address">{initialBusinessData.email}</span>
                </div>
              </div>

              <a 
                href={`mailto:${initialBusinessData.email}?subject=${encodeURIComponent("Consulta sobre Paquetes y Salón - Los Cerezos")}`}
                className="btn btn-primary contact-send-btn"
              >
                <SendIcon size={16} />
                <span>Enviar correo directo</span>
              </a>
            </div>
          </div>

          <div className="contact-disclaimer-box">
            <ShieldCheckIcon size={18} className="contact-disclaimer-icon" />
            <p className="contact-disclaimer-text">
              <strong>Aviso de demostración comercial:</strong> Los paquetes, capacidades, costos por invitado, fechas de disponibilidad e imágenes fotográficas se presentan exclusivamente con propósitos ilustrativos. La versión operativa definitiva se ajustará a las especificaciones y menús reales de Los Cerezos Salón de Eventos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
