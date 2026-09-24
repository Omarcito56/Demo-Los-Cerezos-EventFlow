import { useState, useEffect, useCallback } from "react";
import {
  initialBusinessData,
  initialPackagesData,
  initialRequestsData,
  initialQuotesData,
  initialEventsData,
  initialClientsData,
  initialPaymentsData
} from "../data/eventFlowData";
import { trackEvent } from "../analytics/analytics";

const STORAGE_KEYS = {
  BUSINESS: "eventflow_business",
  PACKAGES: "eventflow_packages",
  REQUESTS: "eventflow_requests",
  QUOTES: "eventflow_quotes",
  EVENTS: "eventflow_events",
  CLIENTS: "eventflow_clients",
  PAYMENTS: "eventflow_payments",
  AUTH: "eventflow_auth"
};

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error leyendo ${key} de localStorage:`, e);
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("eventflow_storage_updated"));
  } catch (e) {
    console.error(`Error guardando ${key} en localStorage:`, e);
  }
};

export const useEventData = () => {
  const [business, setBusiness] = useState(() => getStored(STORAGE_KEYS.BUSINESS, initialBusinessData));
  const [packages, setPackages] = useState(() => getStored(STORAGE_KEYS.PACKAGES, initialPackagesData));
  const [requests, setRequests] = useState(() => getStored(STORAGE_KEYS.REQUESTS, initialRequestsData));
  const [quotes, setQuotes] = useState(() => getStored(STORAGE_KEYS.QUOTES, initialQuotesData));
  const [events, setEvents] = useState(() => getStored(STORAGE_KEYS.EVENTS, initialEventsData));
  const [clients, setClients] = useState(() => getStored(STORAGE_KEYS.CLIENTS, initialClientsData));
  const [payments, setPayments] = useState(() => getStored(STORAGE_KEYS.PAYMENTS, initialPaymentsData));

  const refreshFromStorage = useCallback(() => {
    // Verificar inicialización limpia de datos para Los Cerezos
    const storedBus = getStored(STORAGE_KEYS.BUSINESS, null);
    const isOldData = !storedBus || !storedBus.name || !storedBus.name.includes("Cerezos");

    if (isOldData) {
      localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(initialBusinessData));
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialPackagesData));
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(initialRequestsData));
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(initialQuotesData));
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(initialEventsData));
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(initialClientsData));
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(initialPaymentsData));
    }

    setBusiness(getStored(STORAGE_KEYS.BUSINESS, initialBusinessData));
    setPackages(getStored(STORAGE_KEYS.PACKAGES, initialPackagesData));
    setRequests(getStored(STORAGE_KEYS.REQUESTS, initialRequestsData));
    setQuotes(getStored(STORAGE_KEYS.QUOTES, initialQuotesData));
    setEvents(getStored(STORAGE_KEYS.EVENTS, initialEventsData));
    setClients(getStored(STORAGE_KEYS.CLIENTS, initialClientsData));
    setPayments(getStored(STORAGE_KEYS.PAYMENTS, initialPaymentsData));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      refreshFromStorage();
    };

    window.addEventListener("eventflow_storage_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("eventflow_storage_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refreshFromStorage]);

  /**
   * Crea una nueva solicitud desde la web pública con folio correlativo EVT-000126+
   */
  const createRequest = (formData) => {
    const currentRequests = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const currentClients = getStored(STORAGE_KEYS.CLIENTS, initialClientsData);
    const currentQuotes = getStored(STORAGE_KEYS.QUOTES, initialQuotesData);

    // Calcular siguiente folio secuencial
    let nextNum = 126;
    currentRequests.forEach((req) => {
      if (req.folio && req.folio.startsWith("EVT-")) {
        const numPart = parseInt(req.folio.replace("EVT-", ""), 10);
        if (!isNaN(numPart) && numPart >= nextNum) {
          nextNum = numPart + 1;
        }
      }
    });

    const paddedNum = String(nextNum).padStart(6, "0");
    const folio = `EVT-${paddedNum}`;

    const newRequest = {
      id: `req-${Date.now()}`,
      folio,
      clientName: formData.clientName || "Cliente Demo",
      clientPhone: formData.clientPhone || "",
      clientEmail: formData.clientEmail || "",
      cityZone: formData.cityZone || "Área Metropolitana",
      eventType: formData.eventType || "Boda",
      guests: Number(formData.guests) || 100,
      packageId: formData.packageId || "celebracion",
      packageName: formData.packageName || "Celebración",
      packageBasePrice: Number(formData.packageBasePrice) || 22000,
      extras: formData.extras || [],
      extrasTotal: Number(formData.extrasTotal) || 0,
      estimatedTotal: Number(formData.estimatedTotal) || 35000,
      suggestedDeposit: Number(formData.suggestedDeposit) || 5000,
      date: formData.date || new Date().toISOString().split("T")[0],
      status: "Nueva",
      comments: formData.comments || "",
      createdAt: new Date().toISOString()
    };

    const updatedRequests = [newRequest, ...currentRequests];
    setStored(STORAGE_KEYS.REQUESTS, updatedRequests);

    // Crear/actualizar cliente demo
    const clientPhone = formData.clientPhone || "";
    const clientEmail = (formData.clientEmail || "").toLowerCase();
    const existingIndex = currentClients.findIndex(
      (c) => (clientPhone && c.phone === clientPhone) || (clientEmail && c.email.toLowerCase() === clientEmail)
    );

    let updatedClients = [...currentClients];
    if (existingIndex >= 0) {
      updatedClients[existingIndex] = {
        ...updatedClients[existingIndex],
        eventsCount: (updatedClients[existingIndex].eventsCount || 1) + 1,
        lastRequestDate: newRequest.date,
        estimatedTotal: `$${newRequest.estimatedTotal.toLocaleString("es-MX")} MXN`,
        status: "Activo"
      };
    } else {
      const newClient = {
        id: `cli-${Date.now()}`,
        name: newRequest.clientName,
        phone: newRequest.clientPhone,
        email: newRequest.clientEmail,
        eventsCount: 1,
        lastRequestDate: newRequest.date,
        estimatedTotal: `$${newRequest.estimatedTotal.toLocaleString("es-MX")} MXN`,
        status: "Nuevo"
      };
      updatedClients = [newClient, ...updatedClients];
    }
    setStored(STORAGE_KEYS.CLIENTS, updatedClients);

    // Crear cotización inicial vinculada
    const newQuote = {
      id: `q-${Date.now()}`,
      folio: newRequest.folio,
      clientName: newRequest.clientName,
      clientEmail: newRequest.clientEmail,
      eventType: newRequest.eventType,
      packageName: newRequest.packageName,
      guests: newRequest.guests,
      total: newRequest.estimatedTotal,
      date: newRequest.date,
      status: "Borrador",
      createdAt: new Date().toISOString()
    };
    setStored(STORAGE_KEYS.QUOTES, [newQuote, ...currentQuotes]);

    return newRequest;
  };

  /**
   * Cambia el estado de una solicitud
   */
  const updateRequestStatus = (id, newStatus) => {
    const current = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const item = current.find((r) => r.id === id);
    const oldStatus = item ? item.status : "desconocido";

    const updated = current.map((req) => (req.id === id ? { ...req, status: newStatus } : req));
    setStored(STORAGE_KEYS.REQUESTS, updated);

    if (oldStatus !== newStatus) {
      trackEvent("request_status_changed", {
        from_status: oldStatus,
        to_status: newStatus
      });
    }
  };

  /**
   * Cambia el estado de una cotización
   */
  const updateQuoteStatus = (id, newStatus) => {
    const current = getStored(STORAGE_KEYS.QUOTES, initialQuotesData);
    const item = current.find((q) => q.id === id);
    const oldStatus = item ? item.status : "desconocido";

    const updated = current.map((q) => (q.id === id ? { ...q, status: newStatus } : q));
    setStored(STORAGE_KEYS.QUOTES, updated);

    if (oldStatus !== newStatus) {
      trackEvent("quote_status_changed", {
        from_status: oldStatus,
        to_status: newStatus
      });
    }
  };

  /**
   * Convierte una solicitud en un Evento formal
   */
  const convertRequestToEvent = (requestId) => {
    const currentRequests = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const currentEvents = getStored(STORAGE_KEYS.EVENTS, initialEventsData);
    const req = currentRequests.find((r) => r.id === requestId);

    if (!req) return null;

    // Actualizar solicitud a Confirmada
    updateRequestStatus(requestId, "Confirmada");

    // Verificar si ya existe en eventos
    const existing = currentEvents.find((e) => e.folio === req.folio);
    if (existing) return existing;

    const newEvent = {
      id: `evt-${Date.now()}`,
      folio: req.folio,
      clientName: req.clientName,
      clientPhone: req.clientPhone,
      eventType: req.eventType,
      date: req.date,
      guests: req.guests,
      total: req.estimatedTotal,
      paid: req.suggestedDeposit || 5000,
      balance: Math.max(0, req.estimatedTotal - (req.suggestedDeposit || 5000)),
      status: "Apartado",
      packageName: req.packageName,
      zone: req.cityZone || "Área Metropolitana"
    };

    setStored(STORAGE_KEYS.EVENTS, [newEvent, ...currentEvents]);

    trackEvent("event_created", {
      event_type: req.eventType,
      package_id: req.packageId
    });

    return newEvent;
  };

  /**
   * Registra un anticipo demo (simulación 100% segura sin procesamiento de dinero real)
   */
  const registerDepositDemo = (folio, depositData = {}) => {
    const currentRequests = getStored(STORAGE_KEYS.REQUESTS, initialRequestsData);
    const currentPayments = getStored(STORAGE_KEYS.PAYMENTS, initialPaymentsData);
    const currentEvents = getStored(STORAGE_KEYS.EVENTS, initialEventsData);

    const req = currentRequests.find((r) => r.folio === folio);
    const amount = Number(depositData.amount) || (req ? req.suggestedDeposit : 5000);
    const method = depositData.method || "Transferencia demo";
    const clientName = req ? req.clientName : (depositData.clientName || "Cliente Demo");
    const eventType = req ? req.eventType : (depositData.eventType || "Evento");

    // Crear pago registrado
    const newPayment = {
      id: `pay-${Date.now()}`,
      folio,
      clientName,
      eventType,
      concept: "Anticipo",
      amount,
      method,
      date: new Date().toISOString().split("T")[0],
      status: "Pagado"
    };

    setStored(STORAGE_KEYS.PAYMENTS, [newPayment, ...currentPayments]);

    // Si la solicitud existe, cambiar estado a Confirmada o Esperando confirmación
    if (req) {
      updateRequestStatus(req.id, "Confirmada");
    }

    // Actualizar evento si ya existía
    const eventIndex = currentEvents.findIndex((e) => e.folio === folio);
    if (eventIndex >= 0) {
      const updatedEvents = [...currentEvents];
      const prevPaid = updatedEvents[eventIndex].paid || 0;
      const newPaid = prevPaid + amount;
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        paid: newPaid,
        balance: Math.max(0, updatedEvents[eventIndex].total - newPaid),
        status: "Apartado"
      };
      setStored(STORAGE_KEYS.EVENTS, updatedEvents);
    }

    trackEvent("deposit_demo_registered", {
      method,
      has_request: Boolean(req)
    });

    return newPayment;
  };

  /**
   * Actualiza el estado de un evento
   */
  const updateEventStatus = (id, newStatus) => {
    const current = getStored(STORAGE_KEYS.EVENTS, initialEventsData);
    const updated = current.map((e) => (e.id === id ? { ...e, status: newStatus } : e));
    setStored(STORAGE_KEYS.EVENTS, updated);
  };

  /**
   * Actualiza un paquete demo
   */
  const updatePackage = (id, updatedData) => {
    const current = getStored(STORAGE_KEYS.PACKAGES, initialPackagesData);
    const updated = current.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
    setStored(STORAGE_KEYS.PACKAGES, updated);
  };

  /**
   * Actualiza datos generales de configuración
   */
  const updateBusiness = (updatedData) => {
    setStored(STORAGE_KEYS.BUSINESS, { ...business, ...updatedData });
  };

  /**
   * Restaura todos los datos demo a los valores predeterminados de fábrica
   */
  const resetDemoData = () => {
    localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(initialBusinessData));
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialPackagesData));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(initialRequestsData));
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(initialQuotesData));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(initialEventsData));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(initialClientsData));
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(initialPaymentsData));
    refreshFromStorage();
  };

  // Cálculo de Métricas demo para el Administrador (Adaptadas para Los Cerezos)
  const newRequestsCount = requests.filter((r) => r.status === "Nueva").length;
  const quotesSentCount = quotes.filter((q) => q.status === "Enviada" || q.status === "Aceptada").length;
  const confirmedEventsCount = events.filter((e) => e.status === "Confirmado" || e.status === "Apartado").length;
  const upcomingEventsCount = events.filter((e) => e.status !== "Cancelado" && e.status !== "Realizado").length;
  const pendingQuotesCount = quotes.filter((q) => q.status === "Borrador" || q.status === "Enviada").length;

  const totalDepositsSum = payments
    .filter((p) => p.status === "Pagado" && p.concept === "Anticipo")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const projectedIncomeSum = events
    .filter((e) => e.status !== "Cancelado")
    .reduce((sum, e) => sum + (e.total || 0), 0) +
    requests
    .filter((r) => r.status === "Nueva" || r.status === "Contactado" || r.status === "Esperando anticipo")
    .reduce((sum, r) => sum + (r.estimatedTotal || 0), 0);

  // Fechas consultadas en agenda y cotizador (métrica demo con base viva)
  const datesConsultedCount = 28 + requests.length;

  const metrics = {
    // 5 Métricas principales solicitadas para el Dashboard:
    newRequests: newRequestsCount || 5,
    datesConsulted: datesConsultedCount,
    quotesSent: quotesSentCount || 4,
    confirmedEvents: confirmedEventsCount || 3,
    totalDeposits: totalDepositsSum || 50000,
    // Métricas auxiliares:
    upcomingEvents: upcomingEventsCount || 4,
    pendingQuotes: pendingQuotesCount || 5,
    projectedIncome: projectedIncomeSum || 230000,
    activePackagesCount: packages.filter((p) => p.status === "Activo").length,
    totalClientsCount: clients.length
  };

  return {
    business,
    packages,
    requests,
    quotes,
    events,
    clients,
    payments,
    metrics,
    createRequest,
    updateRequestStatus,
    updateQuoteStatus,
    convertRequestToEvent,
    registerDepositDemo,
    updateEventStatus,
    updatePackage,
    updateBusiness,
    resetDemoData,
    refreshFromStorage
  };
};
