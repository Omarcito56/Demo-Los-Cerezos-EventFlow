import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useEventData } from "../../hooks/useEventData";
import { 
  CheckIcon, CheckCircleIcon, ArrowLeftIcon, 
  CreditCardIcon, SparklesIcon, WhatsAppIcon 
} from "../../components/common/Icons";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useTrackOnMount } from "../../analytics/analytics";

export const ConfirmationPage = () => {
  const location = useLocation();
  const { registerDepositDemo, requests } = useEventData();

  // Tomar la solicitud del state o de fallback mock
  const request = location.state?.request || (requests && requests[0]) || {
    folio: "EVT-000128",
    clientName: "Cliente Demo",
    eventType: "Boda",
    packageName: "Experiencia",
    guests: 150,
    date: new Date().toISOString().split("T")[0],
    estimatedTotal: 72000,
    suggestedDeposit: 10000,
    status: "Solicitud recibida"
  };

  const [depositMethod, setDepositMethod] = useState("Transferencia");
  const [depositRegistered, setDepositRegistered] = useState(false);

  useTrackOnMount("deposit_demo_viewed", {
    route: "/confirmacion",
    has_request: Boolean(request?.folio)
  });

  const estimatedTotal = request.estimatedTotal || 72000;
  const depositAmount = request.suggestedDeposit || 10000;
  const remainingBalance = Math.max(0, estimatedTotal - depositAmount);

  const handleRegisterDeposit = () => {
    registerDepositDemo(request.folio, {
      amount: depositAmount,
      method: `${depositMethod} demo`,
      clientName: request.clientName,
      eventType: request.eventType
    });
    setDepositRegistered(true);
  };

  return (
    <div className="quote-page-wrap">
      <div className="container">
        <div className="confirmation-card-editorial animate-fade-in">
          {/* Success Check */}
          <div className="confirmation-success-icon">
            <CheckIcon size={32} />
          </div>

          <span className="confirmation-folio-pill ph-mask">
            FOLIO DEMO: {request.folio}
          </span>

          <h1 className="confirmation-title">
            ¡Tu solicitud está en camino!
          </h1>

          <p className="confirmation-lead-text">
            Los Cerezos Salón de Eventos podrá revisar los requerimientos de tu evento y ponerse en contacto contigo para coordinar una visita y afinar tu cotización final.
          </p>

          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <a 
              href={`https://wa.me/528992126229?text=${encodeURIComponent(`Hola Los Cerezos, acabo de enviar mi solicitud en línea con el folio demo ${request.folio} para mi evento.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <WhatsAppIcon size={18} />
              <span>Seguimiento directo por WhatsApp: (899) 212-6229</span>
            </a>
          </div>

          {/* Details Card */}
          <div className="confirmation-details-card">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Evento</span>
                <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{request.eventType}</div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Fecha tentativa</span>
                <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{request.date}</div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Invitados</span>
                <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{request.guests} personas</div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Paquete</span>
                <div style={{ fontWeight: 600, color: "var(--color-charcoal-deep)" }}>{request.packageName}</div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Estimado preliminar</span>
                <div style={{ fontWeight: 700, color: "var(--color-accent)" }}>
                  ${estimatedTotal.toLocaleString("es-MX")} MXN
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>Estado actual</span>
                <div>
                  <StatusBadge status={depositRegistered ? "Confirmada" : "Solicitud recibida"} />
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN ANTICIPO DEMO: APARTA TU FECHA */}
          <div className="deposit-demo-box">
            <span className="simulation-badge">SIMULACIÓN DEMOSTRATIVA</span>

            <div className="deposit-demo-header">
              <h3>Aparta tu fecha</h3>
              <p>
                En una implementación real de BS EventFlow, el cliente puede asegurar su fecha mediante un anticipo pactado. Esta sección es una simulación 100% segura para probar el flujo comercial sin dinero real.
              </p>
            </div>

            <div className="deposit-amounts-row">
              <div className="deposit-amt-box">
                <span className="deposit-amt-label">Cotización estimada</span>
                <div className="deposit-amt-val">${estimatedTotal.toLocaleString("es-MX")}</div>
              </div>

              <div className="deposit-amt-box" style={{ borderColor: "var(--color-accent)", backgroundColor: "var(--color-accent-soft)" }}>
                <span className="deposit-amt-label">Anticipo demo</span>
                <div className="deposit-amt-val" style={{ color: "var(--color-accent)" }}>
                  ${depositAmount.toLocaleString("es-MX")}
                </div>
              </div>

              <div className="deposit-amt-box">
                <span className="deposit-amt-label">Restante estimado</span>
                <div className="deposit-amt-val">${remainingBalance.toLocaleString("es-MX")}</div>
              </div>
            </div>

            {!depositRegistered ? (
              <div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-charcoal-deep)", display: "block", marginBottom: "0.6rem" }}>
                  Selecciona método de prueba demostrativo:
                </span>

                <div className="deposit-method-choices">
                  <div 
                    className={`deposit-method-option ${depositMethod === "Transferencia" ? "selected" : ""}`}
                    onClick={() => setDepositMethod("Transferencia")}
                  >
                    <span>🏦 Transferencia bancaria demo</span>
                  </div>

                  <div 
                    className={`deposit-method-option ${depositMethod === "Tarjeta" ? "selected" : ""}`}
                    onClick={() => setDepositMethod("Tarjeta")}
                  >
                    <CreditCardIcon size={18} />
                    <span>Tarjeta demo</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn btn-primary btn-block btn-lg"
                  onClick={handleRegisterDeposit}
                >
                  <SparklesIcon size={18} />
                  <span>Registrar anticipo demo (${depositAmount.toLocaleString("es-MX")} MXN)</span>
                </button>

                <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "0.85rem", textAlign: "center" }}>
                  * No se procesa ningún cargo real ni se solicitan datos bancarios. La simulación actualizará el estado de la solicitud inmediatamente en el panel administrativo.
                </p>
              </div>
            ) : (
              <div style={{ padding: "1.25rem", backgroundColor: "#ECFDF5", borderRadius: "var(--radius-sm)", border: "1px solid #A7F3D0", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "#065F46", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.25rem" }}>
                  <CheckCircleIcon size={22} />
                  <span>¡Anticipo demo registrado con éxito!</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#047857" }}>
                  La fecha ha sido apartada en la simulación. Puedes ver el registro reflejado en el módulo de Pagos y Eventos del panel administrativo.
                </p>
              </div>
            )}
          </div>

          {/* Botones de Retorno y Admin */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/" className="btn btn-outline btn-sm">
              <ArrowLeftIcon size={15} />
              <span>Volver al inicio</span>
            </Link>

            <Link to="/admin/login" className="btn btn-secondary btn-sm">
              <span>Ver panel de administración demo</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
