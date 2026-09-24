import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { 
  initialExtrasData, 
  eventTypesList, 
  mockAvailabilityMap 
} from "../../data/eventFlowData";
import { 
  CalendarIcon, CheckIcon, SparklesIcon, 
  ArrowRightIcon, ArrowLeftIcon, AlertCircleIcon,
  HeartIcon, BriefcaseIcon, GiftIcon, AcademicIcon, StarIcon
} from "../../components/common/Icons";
import { 
  trackEvent, 
  useTrackOnMount, 
  getGuestRange, 
  getEstimatedTotalRange 
} from "../../analytics/analytics";

export const QuotePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { packages, business, createRequest } = useEventData();

  const [currentStep, setCurrentStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  const todayISO = new Date().toISOString().split("T")[0];

  // Leer parámetros iniciales de URL si viene de landing o tipos de evento
  const initialType = searchParams.get("tipo") || "boda";
  const initialPkgId = searchParams.get("paquete") || "experiencia";
  const initialDate = searchParams.get("fecha") || "";

  // Estado del formulario de cotización
  const [quoteState, setQuoteState] = useState({
    eventType: initialType,
    guests: 150,
    packageId: initialPkgId,
    selectedExtras: [],
    date: initialDate,
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    cityZone: "",
    comments: "",
    privacyAccepted: false
  });

  // Asegurar que la página siempre inicie en la cima al cargar
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Track inicial quote_started
  useTrackOnMount("quote_started", {
    flow_type: "event_quote",
    route: "/cotizar",
    initial_event_type: initialType
  });

  // Derivar nombre legible del tipo de evento
  const selectedTypeObj = eventTypesList.find(t => t.id === quoteState.eventType);
  const eventTypeName = selectedTypeObj ? selectedTypeObj.name : "Boda";

  // Obtener datos del paquete seleccionado
  const selectedPackage = packages.find(p => p.id === quoteState.packageId) || packages[0];

  // Cálculo Dinámico en Tiempo Real
  const basePrice = selectedPackage.priceNumber || 72000;
  const baseGuests = selectedPackage.baseGuests || 150;
  const extraGuestPrice = selectedPackage.extraGuestPrice || 340;

  // Si los invitados exceden la base, se calcula el ajuste proporcional
  const extraGuestsCount = Math.max(0, quoteState.guests - baseGuests);
  const guestsAdjustment = extraGuestsCount * extraGuestPrice;

  // Suma de extras seleccionados
  const extrasTotal = quoteState.selectedExtras.reduce((sum, extraId) => {
    const extraObj = initialExtrasData.find(e => e.id === extraId);
    return sum + (extraObj ? extraObj.price : 0);
  }, 0);

  const estimatedTotal = basePrice + guestsAdjustment + extrasTotal;
  const suggestedDeposit = 10000; // Anticipo demo base para salón

  // Verificar disponibilidad mock de la fecha elegida
  const getDateAvailability = (dateStr) => {
    if (!dateStr) return null;
    return mockAvailabilityMap[dateStr] || "disponible";
  };

  const selectedDateAvailability = getDateAvailability(quoteState.date);

  // Handlers para cada paso con tracking analítico protegido
  const handleEventTypeSelect = (typeId) => {
    setQuoteState(prev => ({ ...prev, eventType: typeId }));
    trackEvent("quote_event_type_selected", {
      event_type: typeId,
      step: 1
    });
  };

  const handleGuestRangeClick = (rangeGuests) => {
    setQuoteState(prev => ({ ...prev, guests: rangeGuests }));
  };

  const handleGuestsChange = (val) => {
    const num = Math.max(10, Math.min(1000, Number(val) || 10));
    setQuoteState(prev => ({ ...prev, guests: num }));
  };

  const handlePackageSelect = (pkgId) => {
    setQuoteState(prev => ({ ...prev, packageId: pkgId }));
    trackEvent("quote_package_selected", {
      package_id: pkgId,
      step: 3
    });
  };

  const handleExtraToggle = (extraId) => {
    setQuoteState(prev => {
      const exists = prev.selectedExtras.includes(extraId);
      const updated = exists 
        ? prev.selectedExtras.filter(id => id !== extraId)
        : [...prev.selectedExtras, extraId];

      trackEvent("quote_extras_selected", {
        extras_count: updated.length,
        step: 4
      });

      return { ...prev, selectedExtras: updated };
    });
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setQuoteState(prev => ({ ...prev, date: newDate }));
    if (newDate) {
      trackEvent("quote_date_selected", {
        step: 5,
        is_future: newDate >= todayISO
      });
    }
  };

  // Validaciones antes de avanzar de paso
  const handleNextStep = () => {
    setErrorMsg("");

    if (currentStep === 5) {
      if (!quoteState.date) {
        setErrorMsg("Por favor selecciona una fecha tentativa para tu evento.");
        return;
      }
      if (selectedDateAvailability === "apartada" || selectedDateAvailability === "no_disponible" || selectedDateAvailability === "ocupada") {
        setErrorMsg("La fecha seleccionada se encuentra apartada o no disponible en la agenda demostrativa. Por favor selecciona otro día disponible.");
        return;
      }
    }

    if (currentStep === 6) {
      if (!quoteState.clientName.trim()) {
        setErrorMsg("Por favor ingresa tu nombre completo.");
        return;
      }
      if (!quoteState.clientPhone.trim()) {
        setErrorMsg("Por favor ingresa un teléfono o WhatsApp de contacto.");
        return;
      }
      if (!quoteState.clientEmail.trim() || !quoteState.clientEmail.includes("@")) {
        setErrorMsg("Por favor ingresa un correo electrónico válido.");
        return;
      }
      if (!quoteState.privacyAccepted) {
        setErrorMsg("Debes aceptar el aviso de privacidad para continuar.");
        return;
      }
    }

    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  // Envío final de la solicitud
  const handleSubmitRequest = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const newRequest = createRequest({
      clientName: quoteState.clientName,
      clientPhone: quoteState.clientPhone,
      clientEmail: quoteState.clientEmail,
      cityZone: quoteState.cityZone,
      eventType: eventTypeName,
      guests: quoteState.guests,
      packageId: quoteState.packageId,
      packageName: selectedPackage.name,
      packageBasePrice: basePrice,
      extras: quoteState.selectedExtras,
      extrasTotal,
      estimatedTotal,
      suggestedDeposit,
      date: quoteState.date,
      comments: quoteState.comments
    });

    // Tracking analítico garantizando privacidad
    trackEvent("quote_completed", {
      event_type: quoteState.eventType,
      package_id: quoteState.packageId,
      guest_range: getGuestRange(quoteState.guests),
      extras_count: quoteState.selectedExtras.length,
      estimated_total_range: getEstimatedTotalRange(estimatedTotal)
    });

    // Navegar a confirmación con datos de la solicitud creada
    navigate("/confirmacion", { state: { request: newRequest } });
  };

  return (
    <div className="quote-page-wrap">
      <div className="container">
        {/* Header */}
        <div className="quote-header-box">
          <span className="quote-demo-badge">COTIZADOR INTERACTIVO DEMO</span>
          <h1 className="quote-title">Diseña la experiencia de tu evento</h1>
          <p className="quote-subtext">
            Personaliza el número de comensales, servicios gastronómicos y adicionales con cálculo en tiempo real.
          </p>
        </div>

        {/* 7-Step Stepper Header */}
        <nav className="stepper-nav" aria-label="Progreso de cotización">
          <div className="stepper-progress-line">
            <div 
              className="stepper-progress-fill" 
              style={{ width: `${((currentStep - 1) / 6) * 100}%` }}
            />
          </div>

          {[
            { num: 1, label: "01 Evento" },
            { num: 2, label: "02 Invitados" },
            { num: 3, label: "03 Paquete" },
            { num: 4, label: "04 Extras" },
            { num: 5, label: "05 Fecha" },
            { num: 6, label: "06 Datos" },
            { num: 7, label: "07 Resumen" }
          ].map(s => (
            <button
              key={s.num}
              type="button"
              className={`stepper-step-item ${currentStep === s.num ? "active" : ""} ${currentStep > s.num ? "completed" : ""}`}
              onClick={() => {
                if (currentStep > s.num) setCurrentStep(s.num);
              }}
              disabled={currentStep < s.num}
            >
              <div className="stepper-circle">
                {currentStep > s.num ? <CheckIcon size={14} /> : s.num}
              </div>
              <span className="stepper-label">{s.label}</span>
            </button>
          ))}
        </nav>

        {/* Mensaje de Error si aplica */}
        {errorMsg && (
          <div className="alert-banner alert-warning" style={{ maxWidth: "800px", margin: "0 auto 1.5rem" }}>
            <div className="alert-content-left">
              <AlertCircleIcon size={18} />
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Main Grid: Step Content + Live Calculation Sidebar */}
        <div className="quote-layout-grid">
          {/* STEP CONTAINER */}
          <div className="quote-step-card animate-fade-in">
            {/* PASO 1: EVENTO */}
            {currentStep === 1 && (
              <div>
                <h2 className="quote-step-title">¿Qué estás planeando?</h2>
                <p className="quote-step-desc">
                  Selecciona el formato de evento para adaptar la propuesta culinaria y tiempos de servicio.
                </p>

                <div className="event-selection-grid">
                  {eventTypesList.map(type => {
                    const isSelected = quoteState.eventType === type.id;
                    return (
                      <div
                        key={type.id}
                        className={`event-select-card ${isSelected ? "selected" : ""}`}
                        onClick={() => handleEventTypeSelect(type.id, type.name)}
                      >
                        <div className="event-select-icon">
                          {type.id === "boda" && <HeartIcon size={24} />}
                          {type.id === "xv-anos" && <SparklesIcon size={24} />}
                          {type.id === "graduacion" && <AcademicIcon size={24} />}
                          {type.id === "corporativo" && <BriefcaseIcon size={24} />}
                          {type.id === "aniversario" && <GiftIcon size={24} />}
                          {type.id === "evento-privado" && <StarIcon size={24} />}
                          {!["boda", "xv-anos", "graduacion", "corporativo", "aniversario", "evento-privado"].includes(type.id) && <SparklesIcon size={24} />}
                        </div>
                        <span className="event-select-name">{type.name}</span>
                        <span style={{ fontSize: "0.76rem", color: "var(--color-text-muted)" }}>{type.subtitle}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PASO 2: INVITADOS */}
            {currentStep === 2 && (
              <div>
                <h2 className="quote-step-title">¿Cuántas personas esperas?</h2>
                <p className="quote-step-desc">
                  Ingresa el número proyectado de asistentes. Los paquetes base contemplan el montaje inicial y ajustan comensales adicionales de forma transparente.
                </p>

                <div className="guests-control-box">
                  <div className="guests-ranges-row">
                    {[
                      { label: "1-50", val: 50 },
                      { label: "51-100", val: 80 },
                      { label: "101-150", val: 120 },
                      { label: "151-200", val: 180 },
                      { label: "200+", val: 250 }
                    ].map(r => (
                      <button
                        key={r.label}
                        type="button"
                        className={`guest-range-btn ${quoteState.guests === r.val ? "selected" : ""}`}
                        onClick={() => handleGuestRangeClick(r.val)}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>

                  <div className="guest-number-dial">
                    <button 
                      type="button" 
                      className="dial-btn"
                      onClick={() => handleGuestsChange(quoteState.guests - 10)}
                      aria-label="Restar 10 invitados"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      className="dial-input-val"
                      value={quoteState.guests}
                      min="10"
                      max="1000"
                      step="5"
                      onChange={(e) => handleGuestsChange(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="dial-btn"
                      onClick={() => handleGuestsChange(quoteState.guests + 10)}
                      aria-label="Sumar 10 invitados"
                    >
                      +
                    </button>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                    Total de personas: <strong>{quoteState.guests} invitados</strong>
                  </span>
                </div>
              </div>
            )}

            {/* PASO 3: PAQUETE */}
            {currentStep === 3 && (
              <div>
                <h2 className="quote-step-title">Selecciona una propuesta</h2>
                <p className="quote-step-desc">
                  Elige la base gastronómica y de montaje que mejor encaje con el estilo de tu celebración.
                </p>

                <div className="package-selection-cards">
                  {packages.map(pkg => {
                    const isSelected = quoteState.packageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        className={`pkg-select-item ${isSelected ? "selected" : ""}`}
                        onClick={() => handlePackageSelect(pkg.id)}
                      >
                        <div className="pkg-radio-circle">
                          {isSelected && <div className="pkg-radio-dot" />}
                        </div>

                        <div className="pkg-select-info">
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <h4>{pkg.name}</h4>
                            <span className="status-badge badge-neutral" style={{ fontSize: "0.7rem" }}>
                              {pkg.badge}
                            </span>
                          </div>
                          <p>{pkg.description}</p>
                          <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--color-accent)", fontWeight: 600 }}>
                            Base cubre hasta {pkg.baseGuests} personas (+${pkg.extraGuestPrice} por comensal adicional)
                          </div>
                        </div>

                        <div className="pkg-select-price">
                          <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", display: "block" }}>Base demo</span>
                          <span className="pkg-price-num">{pkg.priceFrom}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PASO 4: EXTRAS */}
            {currentStep === 4 && (
              <div>
                <h2 className="quote-step-title">Personaliza tu evento</h2>
                <p className="quote-step-desc">
                  Activa o desactiva servicios adicionales demostrativos para complementar tu banquete.
                </p>

                <div className="extras-selection-grid">
                  {initialExtrasData.map(extra => {
                    const isActive = quoteState.selectedExtras.includes(extra.id);
                    return (
                      <div
                        key={extra.id}
                        className={`extra-select-card ${isActive ? "active" : ""}`}
                        onClick={() => handleExtraToggle(extra.id)}
                      >
                        <div className="extra-info-left">
                          <span className="extra-name">{extra.name}</span>
                          <span className="extra-price-tag">+${extra.price.toLocaleString("es-MX")} MXN demo</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                            {extra.description}
                          </span>
                        </div>

                        <div className="extra-toggle-switch">
                          <div className="toggle-knob" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PASO 5: FECHA Y DISPONIBILIDAD */}
            {currentStep === 5 && (
              <div>
                <h2 className="quote-step-title">¿Cuándo será tu evento?</h2>
                <p className="quote-step-desc">
                  Elige la fecha tentativa en la que deseas llevar a cabo tu celebración.
                </p>

                <div className="date-picker-wrap">
                  <div>
                    <label className="form-label" htmlFor="quote-date-input">
                      Fecha del evento
                    </label>
                    <input 
                      type="date" 
                      id="quote-date-input"
                      className="form-input"
                      min={todayISO}
                      value={quoteState.date}
                      onChange={handleDateChange}
                    />
                  </div>

                  {quoteState.date && (
                    <div className="date-availability-status-box">
                      <CalendarIcon size={20} className="text-accent" />
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-charcoal-deep)" }}>
                          Disponibilidad en agenda demo:
                        </div>
                        <div style={{ fontSize: "0.82rem" }}>
                          {selectedDateAvailability === "disponible" && (
                            <span style={{ color: "#065F46", fontWeight: 700 }}>✓ Fecha Disponible en el salón</span>
                          )}
                          {(selectedDateAvailability === "proceso" || selectedDateAvailability === "limitada") && (
                            <span style={{ color: "#B45309", fontWeight: 700 }}>⚠ Cotización en proceso (Aún puedes enviar tu solicitud)</span>
                          )}
                          {selectedDateAvailability === "apartada" && (
                            <span style={{ color: "var(--color-burgundy)", fontWeight: 700 }}>✕ Fecha apartada con anticipo registrado</span>
                          )}
                          {(selectedDateAvailability === "no_disponible" || selectedDateAvailability === "ocupada") && (
                            <span style={{ color: "#6B7280", fontWeight: 700 }}>✕ Fecha no disponible para eventos</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                    Disponibilidad mostrada únicamente para fines demostrativos en Los Cerezos Salón de Eventos.
                  </p>
                </div>
              </div>
            )}

            {/* PASO 6: DATOS DE CONTACTO */}
            {currentStep === 6 && (
              <div>
                <h2 className="quote-step-title">Cuéntanos cómo contactarte</h2>
                <p className="quote-step-desc">
                  Ingresa tus datos para preparar el folio oficial de cotización y ponernos en contacto contigo.
                </p>

                <div className="form-grid-2col">
                  <div>
                    <label className="form-label" htmlFor="client-name">Nombre completo *</label>
                    <input 
                      type="text" 
                      id="client-name"
                      className="form-input ph-mask"
                      placeholder="Ej. Mariana Garza"
                      value={quoteState.clientName}
                      onChange={(e) => setQuoteState({ ...quoteState, clientName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="client-phone">Teléfono / WhatsApp *</label>
                    <input 
                      type="tel" 
                      id="client-phone"
                      className="form-input ph-mask"
                      placeholder="Ej. 899 123 4567"
                      value={quoteState.clientPhone}
                      onChange={(e) => setQuoteState({ ...quoteState, clientPhone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div>
                    <label className="form-label" htmlFor="client-email">Correo electrónico *</label>
                    <input 
                      type="email" 
                      id="client-email"
                      className="form-input ph-mask"
                      placeholder="tucorreo@ejemplo.com"
                      value={quoteState.clientEmail}
                      onChange={(e) => setQuoteState({ ...quoteState, clientEmail: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="client-zone">Colonia o sector en Reynosa</label>
                    <input 
                      type="text" 
                      id="client-zone"
                      className="form-input ph-mask"
                      placeholder="Ej. Las Fuentes, Anzaldúas, Jarachina, Ribereña, Reynosa Centro"
                      value={quoteState.cityZone}
                      onChange={(e) => setQuoteState({ ...quoteState, cityZone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-full">
                  <label className="form-label" htmlFor="client-comments">Requerimientos o comentarios adicionales</label>
                  <textarea 
                    id="client-comments"
                    className="form-textarea ph-mask"
                    placeholder="Cuéntanos si requieres montaje de pista especial, barra de café o snacks, horario de recepción o detalles de tu celebración..."
                    value={quoteState.comments}
                    onChange={(e) => setQuoteState({ ...quoteState, comments: e.target.value })}
                  />
                </div>

                <div className="privacy-checkbox-row">
                  <input 
                    type="checkbox" 
                    id="privacy-check"
                    checked={quoteState.privacyAccepted}
                    onChange={(e) => setQuoteState({ ...quoteState, privacyAccepted: e.target.checked })}
                  />
                  <label htmlFor="privacy-check">
                    Acepto que mis datos serán tratados únicamente para fines de contacto y elaboración de esta propuesta demostrativa.
                  </label>
                </div>
              </div>
            )}

            {/* PASO 7: RESUMEN DE COTIZACIÓN */}
            {currentStep === 7 && (
              <div>
                <h2 className="quote-step-title">Resumen de tu cotización</h2>
                <p className="quote-step-desc">
                  Revisa los detalles antes de enviar tu solicitud formal a Los Cerezos Salón de Eventos.
                </p>

                <div className="quote-summary-sheet">
                  <div className="sheet-header-row">
                    <div>
                      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)" }}>
                        Propuesta Demostrativa
                      </span>
                      <h3 className="sheet-brand-name">{business.brandShort}</h3>
                    </div>
                    <span className="status-badge badge-warning">Cotización preliminar</span>
                  </div>

                  <div className="sheet-rows-list">
                    <div className="sheet-row">
                      <span className="sheet-label">Tipo de evento:</span>
                      <span className="sheet-val">{eventTypeName}</span>
                    </div>

                    <div className="sheet-row">
                      <span className="sheet-label">Comensales proyectados:</span>
                      <span className="sheet-val">{quoteState.guests} personas</span>
                    </div>

                    <div className="sheet-row">
                      <span className="sheet-label">Paquete integral:</span>
                      <span className="sheet-val">{selectedPackage.name}</span>
                    </div>

                    <div className="sheet-row">
                      <span className="sheet-label">Fecha tentativa:</span>
                      <span className="sheet-val">{quoteState.date || "Por definir"}</span>
                    </div>

                    <div className="sheet-row">
                      <span className="sheet-label">Contacto:</span>
                      <span className="sheet-val ph-mask">{quoteState.clientName} ({quoteState.clientEmail})</span>
                    </div>

                    {quoteState.selectedExtras.length > 0 && (
                      <div className="sheet-row" style={{ alignItems: "flex-start" }}>
                        <span className="sheet-label">Extras solicitados:</span>
                        <div style={{ textAlign: "right" }}>
                          {quoteState.selectedExtras.map(id => {
                            const eObj = initialExtrasData.find(e => e.id === id);
                            return (
                              <div key={id} style={{ fontSize: "0.82rem", color: "var(--color-charcoal-deep)" }}>
                                + {eObj?.name} (${eObj?.price.toLocaleString("es-MX")})
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="sheet-total-bar">
                    <div>
                      <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-champagne)" }}>
                        Total Estimado Demo
                      </span>
                      <div style={{ fontSize: "0.8rem", color: "#C5BDB2" }}>
                        Incluye salón, paquete base, ajuste de invitados y extras
                      </div>
                    </div>
                    <div className="sheet-total-num">
                      ${estimatedTotal.toLocaleString("es-MX")} MXN
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button 
                      type="button" 
                      className="btn btn-cta btn-lg"
                      style={{ flex: 1 }}
                      onClick={handleSubmitRequest}
                    >
                      <SparklesIcon size={18} />
                      <span>Enviar solicitud a Los Cerezos</span>
                    </button>

                    <button 
                      type="button" 
                      className="btn btn-outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      <span>Modificar cotización</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step Actions: Prev / Next */}
            {currentStep < 7 && (
              <div className="step-actions-row">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  style={{ visibility: currentStep === 1 ? "hidden" : "visible" }}
                >
                  <ArrowLeftIcon size={15} />
                  <span>Anterior</span>
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextStep}
                >
                  <span>Siguiente paso</span>
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            )}
          </div>

          {/* SIDEBAR DE CÁLCULO DINÁMICO PERMANENTE */}
          <aside className="quote-sidebar-calculator">
            <h3 className="calc-sidebar-title">Tu Cotización</h3>
            <span className="calc-badge-demo">COTIZACIÓN DEMOSTRATIVA</span>

            <div className="calc-breakdown-list">
              <div className="calc-line-item">
                <span>Evento:</span>
                <strong style={{ color: "var(--color-charcoal-deep)" }}>{eventTypeName}</strong>
              </div>

              <div className="calc-line-item">
                <span>Paquete {selectedPackage.name}:</span>
                <span>${basePrice.toLocaleString("es-MX")}</span>
              </div>

              {extraGuestsCount > 0 && (
                <div className="calc-line-item">
                  <span>Ajuste ({extraGuestsCount} extras):</span>
                  <span>+${guestsAdjustment.toLocaleString("es-MX")}</span>
                </div>
              )}

              {extrasTotal > 0 && (
                <div className="calc-line-item">
                  <span>Servicios adicionales ({quoteState.selectedExtras.length}):</span>
                  <span>+${extrasTotal.toLocaleString("es-MX")}</span>
                </div>
              )}

              {quoteState.date && (
                <div className="calc-line-item">
                  <span>Fecha tentativa:</span>
                  <span>{quoteState.date}</span>
                </div>
              )}
            </div>

            <div className="calc-total-box">
              <span className="calc-total-label">Total estimado demo</span>
              <div className="calc-total-val">
                ${estimatedTotal.toLocaleString("es-MX")} <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>MXN</span>
              </div>
            </div>

            <div style={{ padding: "0.75rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", fontSize: "0.78rem", color: "var(--color-text-secondary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span>Anticipo sugerido demo:</span>
                <strong>${suggestedDeposit.toLocaleString("es-MX")} MXN</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Restante a liquidar:</span>
                <strong>${Math.max(0, estimatedTotal - suggestedDeposit).toLocaleString("es-MX")} MXN</strong>
              </div>
            </div>

            <p className="calc-disclaimer">
              El precio final podría depender de fecha, menú, número de invitados, ubicación y requerimientos específicos.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};
