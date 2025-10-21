import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { fetchTranslations } from "../api";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");
  const [t, setT] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [canClose, setCanClose] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    fetchTranslations(lang)
      .then((map) => {
        if (mounted) setT(map);
      })
      .catch((e) => {
        console.error("Failed to load translations", e);
      });
    return () => {
      mounted = false;
    };
  }, [lang]);

  const tr = (key, fallback) => t[key] || fallback;

  const handleGoBack = () => {
    navigate("/", { replace: true });
  };

  const checkScrollEnd = () => {
    const el = contentRef.current;
    if (!el) return;
    const { scrollTop, clientHeight, scrollHeight } = el;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 8;
    setCanClose(atBottom);
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) {

      const id = setTimeout(checkScrollEnd, 50);
      return () => clearTimeout(id);
    }

    const handler = () => checkScrollEnd();
    el.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);

    const initialCheckId = setTimeout(checkScrollEnd, 50);

    return () => {
      el.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      clearTimeout(initialCheckId);
    };
  }, [t["terms.body"]]); 

  return (
    <div className="page login">
      <div className="bg" />

      <nav
        className="navbar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "70px",
          padding: "0 40px",
          zIndex: 3,
          background: "transparent",
        }}
      >
        <div className="nav-left" style={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://storage.123fakturera.se/public/icons/diamond.png"
              alt="logo"
              className="nav-logo"
              style={{ height: "40px", cursor: "pointer" }}
            />
          </Link>
        </div>

        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="hamburger"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "28px",
            display: "none",
          }}
        >
          ☰
        </button>

        <div
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <a href="#">{tr("nav.home", "Home")}</a>
          <a href="#">{tr("nav.order", "Order")}</a>
          <a href="#">{tr("nav.customers", "Our Customers")}</a>
          <a href="#">{tr("nav.about", "About us")}</a>
          <a href="#">{tr("nav.contact", "Contact Us")}</a>

          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              style={{
                background: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "8px",
                padding: "8px 14px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#000",
                backdropFilter: "blur(8px)",
              }}
            >
              {lang === "en" ? (
                <>
                  🇬🇧 <span>English</span>
                </>
              ) : (
                <>
                  🇸🇪 <span>Svenska</span>
                </>
              )}
            </button>

            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  zIndex: 100,
                  minWidth: "140px",
                  overflow: "hidden",
                }}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "16px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onClick={() => {
                    setLang("en");
                    setShowDropdown(false);
                  }}
                >
                  🇬🇧 English
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "16px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onClick={() => {
                    setLang("sv");
                    setShowDropdown(false);
                  }}
                >
                  🇸🇪 Svenska
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showMenu && (
        <div
          className="mobile-menu"
          style={{
            position: "absolute",
            top: "70px",
            right: "0",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "0 0 8px 8px",
            padding: "15px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 5,
          }}
        >
          <a href="#">{tr("nav.home", "Home")}</a>
          <a href="#">{tr("nav.order", "Order")}</a>
          <a href="#">{tr("nav.customers", "Our Customers")}</a>
          <a href="#">{tr("nav.about", "About us")}</a>
          <a href="#">{tr("nav.contact", "Contact Us")}</a>
        </div>
      )}

      <div className="card" style={{ maxWidth: "650px", padding: "30px 40px" }}>
        <h1 className="title" style={{ fontSize: "32px", marginBottom: "20px", color: "#333" }}>
          {tr("terms.title", "Terms")}
        </h1>

        <div
          ref={contentRef}
          style={{
            maxHeight: "50vh",
            overflowY: "auto",
            padding: 0,
            marginBottom: "25px",
            textAlign: "left",
            lineHeight: "1.7",
            fontSize: "14px",
            color: "#333",
          }}
          onScroll={checkScrollEnd}
          dangerouslySetInnerHTML={{ __html: t["terms.body"] }}
        />

        <button
          onClick={(e) => {
            if (!canClose) {

              e.preventDefault();
              return;
            }
            handleGoBack();
          }}
          disabled={!canClose}
          aria-disabled={!canClose}
          aria-label={canClose ? tr("terms.close", "Close") : tr("terms.read_to_close", "Scroll to the bottom to enable")}
          style={{
            width: "100%",
            padding: "14px",
            background: canClose ? "#28a745" : "#a3d5a8",
            color: "white",
            border: "none",
            borderRadius: "25px",
            cursor: canClose ? "pointer" : "not-allowed",
            fontSize: "16px",
            fontWeight: "600",
            transition: "background .18s ease, opacity .18s ease",
            opacity: canClose ? 1 : 0.9,
          }}
        >
          {t["terms.close"] || tr("terms.close", "Close")}
        </button>
      </div>

    </div>
  );
}
