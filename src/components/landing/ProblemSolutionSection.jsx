import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboardIcon, CalendarIcon, FileTextIcon, ArrowRightIcon } from "../common/Icons";

export const ProblemSolutionSection = () => {
  return (
    <section className="system-pitch-section">
      <div className="container">
        <div className="pitch-grid">
          {/* Left Content */}
          <div className="pitch-content">
            <span className="eyebrow">Digitalización Comercial</span>
            <h2 className="pitch-title">
              Menos mensajes dispersos.<br />
              Más celebraciones organizadas.
            </h2>
            <p className="pitch-text">
              EventFlow centraliza solicitudes, cotizaciones, fechas y anticipos para Los Cerezos Salón de Eventos, permitiendo cerrar fechas con mayor agilidad y brindar una experiencia premium a cada familia.
            </p>

            <div className="pitch-features-list">
              <div className="pitch-feature-row">
                <div className="pitch-feature-icon">
                  <FileTextIcon size={18} />
                </div>
                <div className="pitch-feature-body">
                  <h4>Cotizaciones claras en minutos</h4>
                  <p>Automatiza el cálculo de paquetes base y extras sin depender de notas manuales.</p>
                </div>
              </div>

              <div className="pitch-feature-row">
                <div className="pitch-feature-icon">
                  <CalendarIcon size={18} />
                </div>
                <div className="pitch-feature-body">
                  <h4>Calendario de fechas protegido</h4>
                  <p>Monitorea qué fechas están ocupadas, apartadas con anticipo o abiertas a nuevos prospectos.</p>
                </div>
              </div>

              <div className="pitch-feature-row">
                <div className="pitch-feature-icon">
                  <LayoutDashboardIcon size={18} />
                </div>
                <div className="pitch-feature-body">
                  <h4>Control de anticipos y saldos</h4>
                  <p>Visualiza en tiempo real los abonos recibidos y los montos pendientes antes de cada evento.</p>
                </div>
              </div>
            </div>

            <Link to="/cotizar" className="btn btn-accent">
              <span>Probar cotizador demostrativo</span>
              <ArrowRightIcon size={16} />
            </Link>
          </div>

          {/* Right Visual: Mock Representativo del Admin EventFlow */}
          <div className="pitch-admin-mock">
            <div className="mock-window-bar">
              <div className="mock-dots">
                <span className="mock-dot" style={{ backgroundColor: "#EF4444" }} />
                <span className="mock-dot" style={{ backgroundColor: "#F59E0B" }} />
                <span className="mock-dot" style={{ backgroundColor: "#10B981" }} />
              </div>
              <span className="mock-title">EventFlow Admin · Los Cerezos</span>
              <span className="mock-active-badge">● Demo Activa</span>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mock-stats-row">
              <div className="mock-stat-box">
                <div className="mock-stat-val">8</div>
                <div className="mock-stat-label">Solicitudes nuevas</div>
              </div>
              <div className="mock-stat-box">
                <div className="mock-stat-val">5</div>
                <div className="mock-stat-label">Eventos en agenda</div>
              </div>
              <div className="mock-stat-box">
                <div className="mock-stat-val">$25,000</div>
                <div className="mock-stat-label">Anticipos demo</div>
              </div>
            </div>

            {/* Mock Table Stream */}
            <div className="mock-table-wrap">
              <div className="mock-table-heading">
                ÚLTIMAS SOLICITUDES REGISTRADAS
              </div>

              <div className="mock-table-row">
                <div className="mock-client-info">
                  <strong style={{ color: "#FFF" }}>EVT-000121</strong> · Mariana García (Boda)
                </div>
                <span className="status-badge badge-blue">Nueva</span>
              </div>

              <div className="mock-table-row">
                <div className="mock-client-info">
                  <strong style={{ color: "#FFF" }}>EVT-000122</strong> · Carlos Martínez (Corp.)
                </div>
                <span className="status-badge badge-purple">Contactado</span>
              </div>

              <div className="mock-table-row">
                <div className="mock-client-info">
                  <strong style={{ color: "#FFF" }}>EVT-000124</strong> · José Hdez. (Cumpleaños)
                </div>
                <span className="status-badge badge-warning">Esperando anticipo</span>
              </div>

              <div className="mock-table-row">
                <div className="mock-client-info">
                  <strong style={{ color: "#FFF" }}>EVT-000125</strong> · Fda. López (Graduación)
                </div>
                <span className="status-badge badge-success">Confirmada</span>
              </div>
            </div>

            <div className="mock-footer-row">
              <span className="mock-footer-note">Panel exclusivo para organizadores</span>
              <Link to="/admin/login" className="mock-admin-link">
                Ver panel administrativo →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
