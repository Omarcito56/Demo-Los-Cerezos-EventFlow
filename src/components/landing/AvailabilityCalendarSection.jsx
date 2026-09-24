import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockAvailabilityMap } from "../../data/eventFlowData";
import { ArrowRightIcon, CalendarIcon, SparklesIcon } from "../common/Icons";
import { trackEvent } from "../../analytics/analytics";

export const AvailabilityCalendarSection = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  // Generar días del mes actual y próximos 28 días
  const today = new Date();
  const currentMonthName = today.toLocaleDateString("es-MX", { month: "long", year: "numeric" });

  const daysList = [];
  for (let i = 1; i <= 28; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().split("T")[0];
    
    // Mapeo demostrativo con 4 estados oficiales:
    // "disponible", "proceso", "apartada", "no_disponible"
    const status = mockAvailabilityMap[iso] || (
      i % 5 === 0 ? "apartada" :
      i % 3 === 0 ? "proceso" :
      i % 7 === 0 ? "no_disponible" :
      "disponible"
    );
    
    daysList.push({
      dateStr: iso,
      dayNum: d.getDate(),
      dayName: d.toLocaleDateString("es-MX", { weekday: "short" }),
      status
    });
  }

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    trackEvent("availability_checked", {
      status: day.status
    });
  };

  const handleProceedToQuote = (isoDate) => {
    navigate(`/cotizar?fecha=${isoDate}`);
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case "disponible":
        return {
          label: "Disponible",
          tagClass: "status-tag-available",
          dotClass: "status-tag-available-dot",
          canQuote: true,
          badgeColor: "#065F46",
          badgeBg: "#ECFDF5",
          message: "Fecha disponible para celebrar tu gran evento."
        };
      case "proceso":
        return {
          label: "Cotización en proceso",
          shortLabel: "En proceso",
          tagClass: "status-tag-process",
          dotClass: "status-tag-process-dot",
          canQuote: true,
          badgeColor: "#92400E",
          badgeBg: "#FEF3C7",
          message: "Fecha con cotizaciones en trámite. Aún puedes enviar tu solicitud preferencial."
        };
      case "apartada":
        return {
          label: "Apartada",
          tagClass: "status-tag-reserved",
          dotClass: "status-tag-reserved-dot",
          canQuote: false,
          badgeColor: "var(--color-burgundy)",
          badgeBg: "var(--color-burgundy-soft)",
          message: "Fecha apartada con anticipo registrado para otro evento demo."
        };
      case "no_disponible":
      default:
        return {
          label: "No disponible",
          shortLabel: "No disp.",
          tagClass: "status-tag-unavailable",
          dotClass: "status-tag-unavailable-dot",
          canQuote: false,
          badgeColor: "#6B7280",
          badgeBg: "#F3F4F6",
          message: "Fecha no disponible para nuevos montajes o mantenimiento programado."
        };
    }
  };

  return (
    <section className="calendar-demo-section" id="calendario">
      <div className="container">
        <div className="section-header-centered">
          <span className="eyebrow">Agenda y Disponibilidad en Vivo</span>
          <h2 className="section-title-editorial">Encuentra tu fecha</h2>
          <p className="section-subtext">
            Explora la disponibilidad en vivo para tu boda, XV años o evento social en Los Cerezos. Selecciona una fecha libre para comenzar tu cotización o solicitar apartado preliminar.
          </p>
        </div>

        <div className="calendar-demo-box">
          {/* Header & Leyenda de 4 Estados Oficiales */}
          <div className="calendar-legend-bar">
            <div className="legend-pill">
              <span className="legend-color-dot dot-available" />
              <span>Disponible</span>
            </div>
            <div className="legend-pill">
              <span className="legend-color-dot dot-process" />
              <span>Cotización en proceso</span>
            </div>
            <div className="legend-pill">
              <span className="legend-color-dot dot-reserved" />
              <span>Apartada</span>
            </div>
            <div className="legend-pill">
              <span className="legend-color-dot dot-unavailable" />
              <span>No disponible</span>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: "1.25rem", textTransform: "capitalize", fontWeight: 700, fontSize: "1.1rem", color: "var(--color-charcoal-deep)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <CalendarIcon size={18} style={{ color: "var(--color-burgundy)" }} />
            <span>{currentMonthName}</span>
          </div>

          {/* Grid de 28 días próximos */}
          <div className="calendar-month-grid">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dow, idx) => (
              <div key={idx} className="calendar-day-header">
                {dow}
              </div>
            ))}

            {daysList.map((day, idx) => {
              const isSelected = selectedDate?.dateStr === day.dateStr;
              const details = getStatusDetails(day.status);

              return (
                <div 
                  key={idx} 
                  className={`calendar-day-cell ${isSelected ? "selected" : ""}`}
                  style={isSelected ? { borderColor: "var(--color-burgundy)", backgroundColor: "var(--color-burgundy-soft)", transform: "scale(1.03)" } : {}}
                  onClick={() => handleDateSelect(day)}
                >
                  <span className="day-cell-num" style={isSelected ? { color: "var(--color-burgundy)", fontWeight: 700 } : {}}>
                    {day.dayNum}
                  </span>
                  {/* Etiqueta de texto para desktop/tablet */}
                  <span className={`day-cell-status-tag ${details.tagClass}`}>
                    {details.shortLabel || details.label}
                  </span>
                  {/* Micro indicador de punto para móvil */}
                  <span className={`day-cell-dot ${details.dotClass}`} title={details.label} />
                </div>
              );
            })}
          </div>

          {/* Callout de fecha seleccionada */}
          {selectedDate && (() => {
            const currentDetails = getStatusDetails(selectedDate.status);
            return (
              <div className="calendar-selected-callout animate-fade-in" style={{ borderLeft: `4px solid ${currentDetails.badgeColor}` }}>
                <div className="callout-info-left">
                  <span className="callout-info-label">Fecha consultada:</span>
                  <div className="callout-info-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                    <strong>{selectedDate.dateStr}</strong>
                    <span 
                      style={{ 
                        fontSize: "0.76rem", 
                        padding: "0.2rem 0.6rem", 
                        borderRadius: "var(--radius-full)", 
                        backgroundColor: currentDetails.badgeBg, 
                        color: currentDetails.badgeColor,
                        fontWeight: 600
                      }}
                    >
                      {currentDetails.label}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", marginTop: "0.25rem", display: "block" }}>
                    {currentDetails.message}
                  </span>
                </div>

                {currentDetails.canQuote ? (
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm callout-action-btn"
                    onClick={() => handleProceedToQuote(selectedDate.dateStr)}
                  >
                    <SparklesIcon size={15} />
                    <span>Cotizar para esta fecha</span>
                    <ArrowRightIcon size={15} />
                  </button>
                ) : (
                  <span className="callout-busy-notice" style={{ color: currentDetails.badgeColor }}>
                    Fecha {currentDetails.label.toLowerCase()} para nuevas reservas
                  </span>
                )}
              </div>
            );
          })()}

          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
            * Calendario de disponibilidad en tiempo real con fines demostrativos para Los Cerezos Salón de Eventos. Las fechas definitivas quedan sujetas a apartado formal.
          </p>
        </div>
      </div>
    </section>
  );
};
