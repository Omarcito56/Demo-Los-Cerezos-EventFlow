import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CerezosLogoIcon, MenuIcon, XIcon, ArrowRightIcon, CalendarIcon, WhatsAppIcon } from "../common/Icons";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (hashId) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      return; // Link to "/" with hash
    }
    const elem = document.getElementById(hashId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar-editorial ${isScrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-emblem">
            <CerezosLogoIcon size={24} />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-brand-title">Los Cerezos</span>
            <span className="navbar-brand-subtitle">Salón de Eventos</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className={`navbar-links ${mobileOpen ? "mobile-open" : ""}`}>
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === "/" && !location.hash ? "active" : ""}`}
              onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              Inicio
            </Link>
          </li>
          <li>
            <a 
              href="#paquetes" 
              className="navbar-link"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  handleNavClick("paquetes");
                }
              }}
            >
              Paquetes
            </a>
          </li>
          <li>
            <Link 
              to="/cotizar" 
              className={`navbar-link ${location.pathname === "/cotizar" ? "active" : ""}`}
              onClick={() => {
                setMobileOpen(false);
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }}
            >
              Cotiza
            </Link>
          </li>
          <li>
            <a 
              href="#experiencia" 
              className="navbar-link"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  handleNavClick("experiencia");
                }
              }}
            >
              Experiencia
            </a>
          </li>
          <li>
            <a 
              href="#contacto" 
              className="navbar-link"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  handleNavClick("contacto");
                }
              }}
            >
              Contacto
            </a>
          </li>

          {/* Mobile Actions inside Drawer */}
          <li className="navbar-mobile-actions">
            <Link 
              to="/cotizar" 
              className="btn btn-primary btn-block"
              onClick={() => {
                setMobileOpen(false);
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }}
            >
              <span>Cotizar mi evento</span>
              <ArrowRightIcon size={16} />
            </Link>
            <a 
              href="#calendario" 
              className="btn btn-secondary btn-block"
              onClick={(e) => {
                setMobileOpen(false);
                if (location.pathname === "/") {
                  e.preventDefault();
                  handleNavClick("calendario");
                }
              }}
            >
              <span>Consultar fecha</span>
            </a>
            <a 
              href="https://wa.me/528992126229?text=Hola%20Los%20Cerezos,%20deseo%20consultar%20disponibilidad%20y%20paquetes%20para%20mi%20evento"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-block"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp (899) 212-6229</span>
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          <a 
            href="https://wa.me/528992126229?text=Hola%20Los%20Cerezos,%20deseo%20consultar%20disponibilidad%20y%20paquetes%20para%20mi%20evento"
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm navbar-action-whatsapp"
            title="Atención directa WhatsApp 8992126229"
          >
            <WhatsAppIcon size={18} />
            <span>WhatsApp</span>
          </a>

          <a 
            href="#calendario" 
            className="btn btn-secondary btn-sm navbar-action-calendar"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                handleNavClick("calendario");
              }
            }}
          >
            <CalendarIcon size={15} />
            <span>Consultar fecha</span>
          </a>

          <Link 
            to="/cotizar" 
            className="btn btn-primary btn-sm navbar-action-quote"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }}
          >
            <span>Cotizar evento</span>
            <ArrowRightIcon size={15} />
          </Link>

          <button 
            type="button" 
            className="navbar-toggle-btn"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
