import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { fetchTranslations } from "../api"; 
import { Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

  const [lang, setLang] = useState("en");
  const [t, setT] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const FLAGS = {
    sv: "https://storage.123fakturere.no/public/flags/SE.png",
    en: "https://storage.123fakturere.no/public/flags/GB.png",
  };


  const imgOnErrorReplaceWithEmoji = (e, emoji) => {
    try {
      const span = document.createElement("span");
      span.textContent = emoji;
      span.style.fontFamily =
        'Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "Segoe UI Symbol", sans-serif';
      span.style.lineHeight = "1";
      span.style.display = "inline-block";
      span.style.width = "20px";
      span.style.textAlign = "center";
      e.currentTarget.replaceWith(span);
    } catch (err) {
      // silent fallback
      e.currentTarget.style.display = "none";
    }
  };

  // Fetch translations
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

  // handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email, 
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
  
        const message =
          data.detail ||
          data.non_field_errors?.[0] ||
          data.error ||
          "Invalid credentials";
        setError(message);
        setLoading(false);
        return;
      }

      if (data.access && data.refresh) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        localStorage.setItem("tokenObtainedAt", String(Date.now()));

        // navigate to pricelist
        navigate("/pricelist", { replace: true });
      } else {
        setError("Unexpected response from server.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  // inline style for flag images
  const flagStyle = {
    width: "20px",
    height: "14px",
    objectFit: "cover",
    display: "inline-block",
    verticalAlign: "middle",
    borderRadius: "2px",
    marginRight: "8px",
  };

  return (
    <div className="page login">
      <div className="bg" />

      {/* Top Navigation */}
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
        {/* Left: Logo */}
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

        {/* Hamburger for mobile */}
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

        {/*  Nav Links (desktop) */}
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

          {/* Language dropdown */}
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
                  <img
                    src={FLAGS.en}
                    alt="English"
                    style={flagStyle}
                    onError={(e) => imgOnErrorReplaceWithEmoji(e, "🇬🇧")}
                  />
                  <span>English</span>
                </>
              ) : (
                <>
                  <img
                    src={FLAGS.sv}
                    alt="Svenska"
                    style={flagStyle}
                    onError={(e) => imgOnErrorReplaceWithEmoji(e, "🇸🇪")}
                  />
                  <span>Svenska</span>
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
                  <img
                    src={FLAGS.en}
                    alt="English"
                    style={flagStyle}
                    onError={(e) => imgOnErrorReplaceWithEmoji(e, "🇬🇧")}
                  />
                  <span>English</span>
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
                  <img
                    src={FLAGS.sv}
                    alt="Svenska"
                    style={flagStyle}
                    onError={(e) => imgOnErrorReplaceWithEmoji(e, "🇸🇪")}
                  />
                  <span>Svenska</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/*  Mobile dropdown menu */}
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

      {/* Login card */}
      <div className="card">
        <h1 className="title">{tr("login.title", "Log in")}</h1>

        <form onSubmit={handleSubmit}>
          <label>{tr("login.email_label", "Enter your email address")}</label>
          <input
            placeholder={tr("login.email_placeholder", "Email address")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>{tr("login.password_label", "Enter your password")}</label>
          <input
            placeholder={tr("login.password_placeholder", "Password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div style={{ color: "crimson", margin: "8px 0" }}>{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in…" : tr("login.button", "Log in")}
          </button>
        </form>

        <div className="links">
          <a href="#">{tr("login.register", "Register")}</a>
          <a href="#">{tr("login.forgot", "Forgotten password?")}</a>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">{tr("nav.home", "Home")}</a>
          <a href="#">{tr("nav.order", "Order")}</a>
          <a href="#">{tr("nav.contact", "Contact us")}</a>
        </div>
        <p>
          {tr(
            "footer.copyright",
            "© Lättfaktura, CRO no. 638537, 2025. All rights reserved."
          )}
        </p>
      </footer>
    </div>
  );
}
