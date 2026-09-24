/**
 * Datos iniciales y catálogo comercial para BS EventFlow
 * Propuesta demostrativa: Los Cerezos Salón de Eventos (Reynosa, Tamaulipas)
 */

export const initialBusinessData = {
  name: "Los Cerezos Salón de Eventos",
  brandShort: "Los Cerezos",
  category: "Salón de Eventos",
  tagline: "Celebraciones completas, organizadas desde el primer clic.",
  city: "Reynosa, Tamaulipas",
  phone: "8992126229",
  phoneFormatted: "(899) 212-6229",
  whatsappUrl: "https://wa.me/528992126229",
  email: "contacto@loscerezos.demo",
  heroTitle: "Todo para tu gran día.\nEn una sola experiencia.",
  heroSubtitle: "Explora paquetes, personaliza servicios y solicita disponibilidad para tu fecha desde un mismo lugar.",
  conceptText: "Celebraciones completas, organizadas desde el primer clic.",
  disclaimer: "PRECIOS DEMOSTRATIVOS. Paquetes, precios, disponibilidad e imágenes fotográficas presentados exclusivamente con propósitos demostrativos para Los Cerezos Salón de Eventos.",
  footerNote: "Propuesta comercial demostrativa desarrollada por BS Code."
};

export const initialPackagesData = [
  {
    id: "celebracion",
    name: "Celebración",
    badge: "Integral & Dinámico",
    popular: false,
    priceFrom: "$48,000 MXN",
    priceNumber: 48000,
    baseGuests: 100,
    extraGuestPrice: 280,
    capacity: "80 - 180 invitados",
    description: "Propuesta integral diseñada para bodas íntimas, XV años y aniversarios con salón de gala, banquete en tiempos, mantelería y ambientación completa.",
    includes: [
      "Salón de eventos climatizado con suite privada (6 horas continuas)",
      "Banquete formal en 2 tiempos (loza de porcelana, cubiertos y cristalería)",
      "Mobiliario completo con mesas redondas y sillas vestidas",
      "Mantelería de gala en colores a elegir y servilletas de tela",
      "Decoración base en mesa principal y centros de mesa",
      "Sistema de sonido profesional e iluminación ambiental de salón",
      "Capitán de meseros y personal de servicio calificado",
      "Servicio de hielo, refresco ilimitado y descorche libre"
    ],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
    status: "Activo"
  },
  {
    id: "experiencia",
    name: "Experiencia",
    badge: "El Más Solicitado",
    popular: true,
    priceFrom: "$72,000 MXN",
    priceNumber: 72000,
    baseGuests: 150,
    extraGuestPrice: 340,
    capacity: "120 - 280 invitados",
    description: "Nuestra propuesta insignia con banquete gourmet, mobiliario de diseño, coordinación ejecutiva, audio/iluminación para pista y cobertura fotográfica.",
    includes: [
      "Salón de gala exclusivo con pista de baile y lobby de bienvenida (7 horas)",
      "Banquete gourmet en 3 tiempos con degustación previa para 4 personas",
      "Mobiliario de diseño con sillas Tiffany o Crossback y mesas de honor",
      "Mantelería fina texturizada, bajo platos y servilletas de diseño",
      "Diseño floral en mesa de honor, arco de bienvenida y centros altos",
      "Audio profesional con DJ en vivo, cabezas robóticas e iluminación de pista",
      "Coordinación ejecutiva del evento durante toda la celebración",
      "Cobertura de fotografía para protocolo de ceremonia y recepción"
    ],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
    status: "Activo"
  },
  {
    id: "oro",
    name: "Oro",
    badge: "Gran Gala & Alta Gama",
    popular: false,
    priceFrom: "$110,000 MXN",
    priceNumber: 110000,
    baseGuests: 200,
    extraGuestPrice: 420,
    capacity: "150 - 450+ invitados",
    description: "La máxima expresión de elegancia para celebraciones de gran formato con todos los servicios integrados: video 4K, barra de snacks y show audiovisual.",
    includes: [
      "Salón de eventos de gran gala con tiempo extendido (8 horas continuas)",
      "Catering de alta cocina en 4 tiempos o estaciones gastronómicas de autor",
      "Mobiliario premium imperial, salas lounge contemporáneas y periqueras",
      "Mantelería de lujo importada, vajilla de diseño y copas talladas",
      "Decoración floral monumental en arco de acceso, escenario y mesa principal",
      "Espectáculo audiovisual integral: pantallas LED, DJ, iluminación y pirotecnia fría",
      "Coordinación logística completa con wedding planner dedicado",
      "Cobertura completa de Fotografía profesional y Video cinemático en 4K"
    ],
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
    status: "Activo"
  }
];

export const initialExtrasData = [
  {
    id: "snacks",
    name: "Barra de snacks & munchies",
    price: 4500,
    description: "Estación de botanas saladas, papas preparadas, canapés y salsas artesanales",
    category: "Snacks"
  },
  {
    id: "barra-cafe",
    name: "Barra de café & repostería",
    price: 3800,
    description: "Espresso, capuchinos, infusiones y mini postres finos servidos en vajilla",
    category: "Bebidas"
  },
  {
    id: "cabina-fotos",
    name: "Cabina / experiencia fotográfica",
    price: 5500,
    description: "Plataforma 360° o photo booth con props temáticos e impresión digital al instante",
    category: "Experiencia"
  },
  {
    id: "decoracion-especial",
    name: "Decoración especial & floral",
    price: 6500,
    description: "Diseño floral elevado de autor, senderos de velas y arco ceremonial de diseño",
    category: "Decoración"
  },
  {
    id: "mesa-principal",
    name: "Mesa principal de honor de gala",
    price: 4000,
    description: "Montaje escénico con sillones tipo trono, mampara personalizada y diseño floral",
    category: "Mobiliario"
  },
  {
    id: "audio-iluminacion",
    name: "Audio / iluminación robótica",
    price: 7000,
    description: "Estructuras truss, cabezas beam móviles, chisperos de pirotecnia fría y show láser",
    category: "Producción"
  },
  {
    id: "fotografia-adicional",
    name: "Fotografía adicional & sesión previa",
    price: 6000,
    description: "Sesión casual de novios o quinceañera previa + fotolibro empastado de lujo",
    category: "Foto y video"
  },
  {
    id: "video-cinematico",
    name: "Video cinemático & dron",
    price: 8500,
    description: "Resumen cinematográfico en 4K, tomas aéreas con dron y teaser para redes sociales",
    category: "Foto y video"
  },
  {
    id: "servicios-adicionales",
    name: "Servicios adicionales & coordinación",
    price: 3500,
    description: "Hostess bilingüe de recepción, valet parking coordinado y seguridad para el evento",
    category: "Coordinación"
  }
];

export const eventTypesList = [
  {
    id: "boda",
    name: "Boda",
    subtitle: "Ceremonia, recepción nupcial y gran banquete",
    icon: "HeartIcon",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
    popularPackage: "experiencia"
  },
  {
    id: "xv-anos",
    name: "XV años",
    subtitle: "Recepción de gala, vals y protocolo",
    icon: "SparklesIcon",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80",
    popularPackage: "experiencia"
  },
  {
    id: "graduacion",
    name: "Graduación",
    subtitle: "Fiestas y cenas de gala de generación",
    icon: "AcademicIcon",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=700&q=80",
    popularPackage: "celebracion"
  },
  {
    id: "corporativo",
    name: "Evento corporativo",
    subtitle: "Galas de fin de año, congresos y aniversarios",
    icon: "BriefcaseIcon",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80",
    popularPackage: "oro"
  },
  {
    id: "aniversario",
    name: "Aniversario",
    subtitle: "Bodas de plata, oro y homenajes familiares",
    icon: "GiftIcon",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=80",
    popularPackage: "celebracion"
  },
  {
    id: "evento-privado",
    name: "Evento privado",
    subtitle: "Cenas especiales y recepciones VIP exclusivas",
    icon: "StarIcon",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=700&q=80",
    popularPackage: "experiencia"
  }
];

// Fechas demo dinámicas relativas para que siempre se vean vigentes
const getOffsetDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

export const initialRequestsData = [
  {
    id: "req-121",
    folio: "EVT-000121",
    clientName: "Mariana Garza Villarreal",
    clientPhone: "8999234512",
    clientEmail: "mariana.garza@gmail.com",
    cityZone: "Col. Las Fuentes / Reynosa",
    eventType: "Boda",
    guests: 180,
    packageId: "oro",
    packageName: "Oro",
    packageBasePrice: 110000,
    extras: ["audio-iluminacion", "cabina-fotos", "barra-cafe"],
    extrasTotal: 16300,
    estimatedTotal: 117900,
    suggestedDeposit: 10000,
    date: getOffsetDate(18),
    status: "Nueva",
    comments: "Boda de noche con 180 invitados. Nos interesa degustación del menú de autor y prueba de iluminación.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "req-122",
    folio: "EVT-000122",
    clientName: "Ing. Carlos Martínez Cantú",
    clientPhone: "8991204891",
    clientEmail: "carlos.martinez@corporativo.com",
    cityZone: "Fracc. Anzaldúas / Reynosa",
    eventType: "Evento corporativo",
    guests: 160,
    packageId: "experiencia",
    packageName: "Experiencia",
    packageBasePrice: 72000,
    extras: ["snacks", "audio-iluminacion"],
    extrasTotal: 11500,
    estimatedTotal: 86900,
    suggestedDeposit: 10000,
    date: getOffsetDate(24),
    status: "Contactado",
    comments: "Cena de gala de fin de año con entrega de reconocimientos. Requerimos pantallas y factura fiscal.",
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: "req-123",
    folio: "EVT-000123",
    clientName: "Andrea Rodríguez Morales",
    clientPhone: "8993456789",
    clientEmail: "andrea.rodriguez@gmail.com",
    cityZone: "Zona Ribereña / Reynosa",
    eventType: "XV años",
    guests: 150,
    packageId: "experiencia",
    packageName: "Experiencia",
    packageBasePrice: 72000,
    extras: ["decoracion-especial", "video-cinematico", "cabina-fotos"],
    extrasTotal: 20500,
    estimatedTotal: 92500,
    suggestedDeposit: 10000,
    date: getOffsetDate(35),
    status: "Cotización enviada",
    comments: "Recepción de XV años temática gala. Nos interesa incluir plataforma 360 y dron.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: "req-124",
    folio: "EVT-000124",
    clientName: "Dr. José Hernández Treviño",
    clientPhone: "8997891234",
    clientEmail: "jose.hernandez@hospital.com",
    cityZone: "Col. Los Doctores / Reynosa",
    eventType: "Aniversario",
    guests: 100,
    packageId: "celebracion",
    packageName: "Celebración",
    packageBasePrice: 48000,
    extras: ["barra-cafe", "mesa-principal"],
    extrasTotal: 7800,
    estimatedTotal: 55800,
    suggestedDeposit: 5000,
    date: getOffsetDate(12),
    status: "Esperando anticipo",
    comments: "Bodas de Plata familiares con montaje distinguido y música ambiental selecta.",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  },
  {
    id: "req-125",
    folio: "EVT-000125",
    clientName: "Lic. Fernanda López Salinas",
    clientPhone: "8995678901",
    clientEmail: "fernanda.lopez@uanl.edu",
    cityZone: "Jarachina Norte / Reynosa",
    eventType: "Graduación",
    guests: 200,
    packageId: "celebracion",
    packageName: "Celebración",
    packageBasePrice: 48000,
    extras: ["audio-iluminacion", "cabina-fotos"],
    extrasTotal: 12500,
    estimatedTotal: 88500,
    suggestedDeposit: 10000,
    date: getOffsetDate(42),
    status: "Confirmada",
    comments: "Gala de graduación de universidad. Anticipo cubierto con fecha bloqueada.",
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString()
  }
];

export const initialQuotesData = [
  {
    id: "q-121",
    folio: "EVT-000121",
    clientName: "Mariana Garza Villarreal",
    clientEmail: "mariana.garza@gmail.com",
    eventType: "Boda",
    packageName: "Oro",
    guests: 180,
    total: 117900,
    date: getOffsetDate(18),
    status: "Enviada",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: "q-122",
    folio: "EVT-000122",
    clientName: "Ing. Carlos Martínez Cantú",
    clientEmail: "carlos.martinez@corporativo.com",
    eventType: "Evento corporativo",
    packageName: "Experiencia",
    guests: 160,
    total: 86900,
    date: getOffsetDate(24),
    status: "Borrador",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: "q-123",
    folio: "EVT-000123",
    clientName: "Andrea Rodríguez Morales",
    clientEmail: "andrea.rodriguez@gmail.com",
    eventType: "XV años",
    packageName: "Experiencia",
    guests: 150,
    total: 92500,
    date: getOffsetDate(35),
    status: "Aceptada",
    createdAt: new Date(Date.now() - 3600000 * 40).toISOString()
  },
  {
    id: "q-124",
    folio: "EVT-000124",
    clientName: "Dr. José Hernández Treviño",
    clientEmail: "jose.hernandez@hospital.com",
    eventType: "Aniversario",
    packageName: "Celebración",
    guests: 100,
    total: 55800,
    date: getOffsetDate(12),
    status: "Aceptada",
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString()
  },
  {
    id: "q-125",
    folio: "EVT-000125",
    clientName: "Lic. Fernanda López Salinas",
    clientEmail: "fernanda.lopez@uanl.edu",
    eventType: "Graduación",
    packageName: "Celebración",
    guests: 200,
    total: 88500,
    date: getOffsetDate(42),
    status: "Aceptada",
    createdAt: new Date(Date.now() - 3600000 * 90).toISOString()
  }
];

export const initialEventsData = [
  {
    id: "evt-125",
    folio: "EVT-000125",
    clientName: "Lic. Fernanda López Salinas",
    clientPhone: "8995678901",
    eventType: "Graduación",
    date: getOffsetDate(42),
    guests: 200,
    total: 88500,
    paid: 20000,
    balance: 68500,
    status: "Confirmado",
    packageName: "Celebración",
    zone: "Jarachina Norte / Reynosa"
  },
  {
    id: "evt-118",
    folio: "EVT-000118",
    clientName: "Daniel Ramírez Chapa",
    clientPhone: "8998901234",
    eventType: "Boda",
    date: getOffsetDate(8),
    guests: 180,
    total: 96000,
    paid: 30000,
    balance: 66000,
    status: "En preparación",
    packageName: "Experiencia",
    zone: "Río Bravo / Conurbada"
  },
  {
    id: "evt-115",
    folio: "EVT-000115",
    clientName: "Mariana Garza Villarreal",
    clientPhone: "8999234512",
    eventType: "Evento privado",
    date: getOffsetDate(2),
    guests: 80,
    total: 48000,
    paid: 48000,
    balance: 0,
    status: "Confirmado",
    packageName: "Celebración",
    zone: "Col. Del Prado / Reynosa"
  },
  {
    id: "evt-110",
    folio: "EVT-000110",
    clientName: "Ing. Carlos Martínez Cantú",
    clientPhone: "8991204891",
    eventType: "Evento corporativo",
    date: getOffsetDate(-10),
    guests: 140,
    total: 78000,
    paid: 78000,
    balance: 0,
    status: "Realizado",
    packageName: "Experiencia",
    zone: "Reynosa Centro"
  }
];

export const initialClientsData = [
  {
    id: "cli-1",
    name: "Mariana Garza Villarreal",
    phone: "8999234512",
    email: "mariana.garza@gmail.com",
    eventsCount: 2,
    lastRequestDate: getOffsetDate(18),
    estimatedTotal: "$165,900 MXN",
    status: "Activo"
  },
  {
    id: "cli-2",
    name: "Ing. Carlos Martínez Cantú",
    phone: "8991204891",
    email: "carlos.martinez@corporativo.com",
    eventsCount: 2,
    lastRequestDate: getOffsetDate(24),
    estimatedTotal: "$164,900 MXN",
    status: "Activo"
  },
  {
    id: "cli-3",
    name: "Andrea Rodríguez Morales",
    phone: "8993456789",
    email: "andrea.rodriguez@gmail.com",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(35),
    estimatedTotal: "$92,500 MXN",
    status: "En seguimiento"
  },
  {
    id: "cli-4",
    name: "Dr. José Hernández Treviño",
    phone: "8997891234",
    email: "jose.hernandez@hospital.com",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(12),
    estimatedTotal: "$55,800 MXN",
    status: "Por confirmar"
  },
  {
    id: "cli-5",
    name: "Lic. Fernanda López Salinas",
    phone: "8995678901",
    email: "fernanda.lopez@uanl.edu",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(42),
    estimatedTotal: "$88,500 MXN",
    status: "Confirmado"
  },
  {
    id: "cli-6",
    name: "Daniel Ramírez Chapa",
    phone: "8998901234",
    email: "daniel.ramirez@gmail.com",
    eventsCount: 1,
    lastRequestDate: getOffsetDate(8),
    estimatedTotal: "$96,000 MXN",
    status: "Confirmado"
  }
];

export const initialPaymentsData = [
  {
    id: "pay-1",
    folio: "EVT-000125",
    clientName: "Lic. Fernanda López Salinas",
    eventType: "Graduación",
    concept: "Anticipo",
    amount: 20000,
    method: "Transferencia demo",
    date: getOffsetDate(-3),
    status: "Pagado"
  },
  {
    id: "pay-2",
    folio: "EVT-000118",
    clientName: "Daniel Ramírez Chapa",
    eventType: "Boda",
    concept: "Anticipo",
    amount: 15000,
    method: "Tarjeta demo",
    date: getOffsetDate(-15),
    status: "Pagado"
  },
  {
    id: "pay-3",
    folio: "EVT-000118",
    clientName: "Daniel Ramírez Chapa",
    eventType: "Boda",
    concept: "Segundo pago",
    amount: 15000,
    method: "Transferencia demo",
    date: getOffsetDate(-2),
    status: "Pagado"
  },
  {
    id: "pay-4",
    folio: "EVT-000115",
    clientName: "Mariana Garza Villarreal",
    eventType: "Evento privado",
    concept: "Liquidación",
    amount: 48000,
    method: "Transferencia demo",
    date: getOffsetDate(-1),
    status: "Pagado"
  },
  {
    id: "pay-5",
    folio: "EVT-000124",
    clientName: "Dr. José Hernández Treviño",
    eventType: "Aniversario",
    concept: "Anticipo",
    amount: 5000,
    method: "Tarjeta demo",
    date: getOffsetDate(1),
    status: "Pendiente"
  }
];

// Mapa de disponibilidad demostrativa mensual con 4 estados oficiales:
// - "disponible" (Disponible)
// - "proceso" (Cotización en proceso)
// - "apartada" (Apartada)
// - "no_disponible" (No disponible)
export const mockAvailabilityMap = {
  [getOffsetDate(2)]: "proceso",
  [getOffsetDate(5)]: "disponible",
  [getOffsetDate(6)]: "apartada",
  [getOffsetDate(8)]: "apartada",
  [getOffsetDate(10)]: "no_disponible",
  [getOffsetDate(12)]: "proceso",
  [getOffsetDate(13)]: "disponible",
  [getOffsetDate(14)]: "disponible",
  [getOffsetDate(18)]: "proceso",
  [getOffsetDate(19)]: "no_disponible",
  [getOffsetDate(20)]: "disponible",
  [getOffsetDate(24)]: "apartada",
  [getOffsetDate(25)]: "disponible",
  [getOffsetDate(26)]: "disponible",
  [getOffsetDate(27)]: "proceso",
  [getOffsetDate(35)]: "apartada",
  [getOffsetDate(42)]: "apartada"
};
