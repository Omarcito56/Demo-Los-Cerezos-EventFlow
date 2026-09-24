import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { 
  FileTextIcon, CalendarIcon, CreditCardIcon, 
  EyeIcon, ArrowRightIcon, CheckCircleIcon, SendIcon
} from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { EventDetailModal } from "../../components/admin/EventDetailModal";
import { useTrackOnMount } from "../../analytics/analytics";

export const AdminDashboardPage = () => {
  const { metrics, requests, events } = useEventData();
  const [selectedItem, setSelectedItem] = useState(null);

  useTrackOnMount("admin_requests_opened", { module: "dashboard" });

  const recentRequests = requests.slice(0, 5);
  const upcomingEvents = events.filter(e => e.status !== "Cancelado").slice(0, 4);

  return (
    <div>
      {/* Disclaimer de datos demo */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", padding: "0.6rem 1rem", backgroundColor: "#FEF3C7", borderRadius: "var(--radius-sm)", border: "1px solid #FDE68A", fontSize: "0.82rem", color: "#92400E" }}>
        <span>
          <strong>Entorno de Demostración Comercial:</strong> Métricas, folios y saldos mostrados son simulaciones para Los Cerezos Salón de Eventos en BS EventFlow.
        </span>
        <span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "0.72rem" }}>Datos Demostrativos</span>
      </div>

      {/* 5 Métricas Demo Oficiales Solicitadas */}
      <div className="stats-grid">
        {/* 1. Solicitudes Nuevas */}
        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "var(--color-burgundy)" }}>
              {metrics.newRequests}
            </div>
            <div className="stat-label">Solicitudes nuevas</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "var(--color-burgundy-soft)", color: "var(--color-burgundy)" }}>
            <FileTextIcon size={22} />
          </div>
        </div>

        {/* 2. Fechas Consultadas */}
        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "var(--color-charcoal-deep)" }}>
              {metrics.datesConsulted}
            </div>
            <div className="stat-label">Fechas consultadas</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}>
            <CalendarIcon size={22} />
          </div>
        </div>

        {/* 3. Cotizaciones Enviadas */}
        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "#D97706" }}>
              {metrics.quotesSent}
            </div>
            <div className="stat-label">Cotizaciones enviadas</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}>
            <SendIcon size={22} />
          </div>
        </div>

        {/* 4. Eventos Confirmados */}
        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "#059669" }}>
              {metrics.confirmedEvents}
            </div>
            <div className="stat-label">Eventos confirmados</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "#ECFDF5", color: "#059669" }}>
            <CheckCircleIcon size={22} />
          </div>
        </div>

        {/* 5. Anticipos Registrados */}
        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: "var(--color-burgundy)" }}>
              ${metrics.totalDeposits.toLocaleString("es-MX")}
            </div>
            <div className="stat-label">Anticipos registrados</div>
          </div>
          <div className="stat-icon-wrap" style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-champagne-dark)" }}>
            <CreditCardIcon size={22} />
          </div>
        </div>
      </div>

      {/* Grid de 2 Columnas: Solicitudes Recientes y Eventos Próximos */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        {/* Solicitudes Recientes */}
        <div className="admin-card-table">
          <div className="admin-table-toolbar">
            <h3 style={{ fontSize: "1.05rem", color: "var(--color-charcoal-deep)" }}>
              Solicitudes Recientes
            </h3>
            <Link to="/admin/solicitudes" className="btn btn-outline btn-sm">
              <span>Ver todas</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>

          <div className="table-responsive-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Cliente</th>
                  <th>Evento</th>
                  <th>Fecha</th>
                  <th>Estimado</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req.id}>
                    <td className="folio-cell">{req.folio}</td>
                    <td className="client-name-cell ph-mask">{req.clientName}</td>
                    <td>{req.eventType}</td>
                    <td>{req.date}</td>
                    <td style={{ fontWeight: 600 }}>${(req.estimatedTotal || 0).toLocaleString("es-MX")}</td>
                    <td><StatusBadge status={req.status} /></td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}
                        onClick={() => setSelectedItem(req)}
                      >
                        <EyeIcon size={13} />
                        <span>Ver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Eventos Próximos en Agenda */}
        <div className="admin-card-table">
          <div className="admin-table-toolbar">
            <h3 style={{ fontSize: "1.05rem", color: "var(--color-charcoal-deep)" }}>
              Próximos Eventos en Agenda
            </h3>
            <Link to="/admin/eventos" className="btn btn-outline btn-sm">
              <span>Ver agenda</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>

          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {upcomingEvents.map((evt) => (
              <div 
                key={evt.id} 
                style={{ padding: "1rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--color-charcoal-deep)" }}>{evt.eventType}</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>({evt.folio})</span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }} className="ph-mask">
                    {evt.clientName} · {evt.guests} comensales · {evt.zone}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--color-accent)", marginBottom: "0.2rem" }}>
                    {evt.date}
                  </div>
                  <StatusBadge status={evt.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Detalle */}
      <EventDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
