import React, { useState } from "react";
import { useEventData } from "../../hooks/useEventData";
import { useTrackOnMount } from "../../analytics/analytics";

export const AdminCalendarPage = () => {
  const { events, requests } = useEventData();
  const [activeDayModal, setActiveDayModal] = useState(null);

  useTrackOnMount("admin_calendar_opened", { module: "calendar" });

  const today = new Date();
  const currentMonthName = today.toLocaleDateString("es-MX", { month: "long", year: "numeric" });

  // Construir 28 días próximos para la cuadrícula del calendario
  const calendarDays = [];
  for (let i = -3; i <= 24; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().split("T")[0];

    // Buscar eventos y solicitudes correspondientes a esta fecha
    const dayEvents = events.filter(e => e.date === iso);
    const dayRequests = requests.filter(r => r.date === iso);

    let status = "Disponible";
    if (dayEvents.some(e => e.status === "Confirmado")) {
      status = "Confirmado";
    } else if (dayEvents.some(e => e.status === "Apartado")) {
      status = "Apartada";
    } else if (dayRequests.some(r => r.status === "Esperando anticipo" || r.status === "Cotización enviada")) {
      status = "Cotización en proceso";
    } else if (i === 10 || i === 19) {
      status = "No disponible";
    }

    calendarDays.push({
      dateStr: iso,
      dayNum: d.getDate(),
      dayName: d.toLocaleDateString("es-MX", { weekday: "short" }),
      isToday: i === 0,
      status,
      events: dayEvents,
      requests: dayRequests
    });
  }

  return (
    <div>
      <div className="admin-calendar-wrapper">
        <div className="admin-calendar-header-row">
          <div>
            <h2 style={{ fontSize: "1.35rem", textTransform: "capitalize", color: "var(--color-charcoal-deep)" }}>
              {currentMonthName}
            </h2>
            <span style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
              Agenda operativa de eventos y disponibilidad demostrativa
            </span>
          </div>

          {/* Leyenda de estados */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.8rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: "#10B981" }} />
              Confirmado
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: "var(--color-burgundy)" }} />
              Apartada
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: "#F59E0B" }} />
              Cotización en proceso
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: "#6B7280" }} />
              No disponible
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: "#E5E7EB" }} />
              Disponible
            </span>
          </div>
        </div>

        {/* Cuadrícula de 7 columnas */}
        <div className="admin-calendar-grid">
          {calendarDays.map((day, idx) => (
            <div 
              key={idx} 
              className="admin-cal-day-cell"
              style={{
                backgroundColor: day.isToday ? "#FFFBEB" : "#FAF8F5",
                borderColor: day.isToday ? "var(--color-accent)" : "var(--border-light)"
              }}
              onClick={() => setActiveDayModal(day)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="admin-cal-day-num">{day.dayNum}</span>
                <span style={{ fontSize: "0.68rem", textTransform: "capitalize", color: "var(--color-text-muted)" }}>
                  {day.dayName}
                </span>
              </div>

              {/* Eventos del día */}
              {day.events.map(e => (
                <div key={e.id} className="admin-event-pill pill-confirmed ph-mask" title={`${e.eventType} - ${e.clientName}`}>
                  ✓ {e.eventType}: {e.clientName.split(" ")[0]}
                </div>
              ))}

              {/* Solicitudes o estatus del día */}
              {day.requests.map(r => (
                <div key={r.id} className="admin-event-pill pill-pending ph-mask" title={`${r.eventType} (${r.status})`}>
                  ⏳ {r.eventType} ({r.folio})
                </div>
              ))}

              {day.events.length === 0 && day.requests.length === 0 && (
                <span style={{ fontSize: "0.72rem", color: day.status === "No disponible" ? "#9CA3AF" : "#059669", marginTop: "auto" }}>
                  {day.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de día si se hace clic */}
      {activeDayModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setActiveDayModal(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "480px" }}>
            <div className="modal-header">
              <h3 style={{ fontSize: "1.15rem" }}>Día: {activeDayModal.dateStr}</h3>
              <button type="button" onClick={() => setActiveDayModal(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: "1rem", fontSize: "0.88rem" }}>
                Estado en calendario demo: <strong>{activeDayModal.status}</strong>
              </div>

              {activeDayModal.events.length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "0.9rem", color: "var(--color-charcoal-deep)", marginBottom: "0.5rem" }}>Eventos en esta fecha:</h4>
                  {activeDayModal.events.map(e => (
                    <div key={e.id} style={{ padding: "0.75rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-xs)", marginBottom: "0.5rem" }}>
                      <strong className="ph-mask">{e.eventType} — {e.clientName}</strong>
                      <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                        Invitados: {e.guests} | Saldo pendiente: ${(e.balance || 0).toLocaleString("es-MX")}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeDayModal.requests.length > 0 && (
                <div>
                  <h4 style={{ fontSize: "0.9rem", color: "var(--color-charcoal-deep)", marginBottom: "0.5rem" }}>Solicitudes en trámite:</h4>
                  {activeDayModal.requests.map(r => (
                    <div key={r.id} style={{ padding: "0.75rem", backgroundColor: "#FEF3C7", borderRadius: "var(--radius-xs)", marginBottom: "0.5rem" }}>
                      <strong className="ph-mask">{r.folio} — {r.clientName}</strong> ({r.eventType})
                      <div style={{ fontSize: "0.8rem", color: "#92400E" }}>
                        Estado: {r.status} | Total estimado: ${(r.estimatedTotal || 0).toLocaleString("es-MX")}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeDayModal.events.length === 0 && activeDayModal.requests.length === 0 && (
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                  No hay montajes agendados para este día. Fecha disponible para asignar brigada de servicio.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
