"use client";

import React, { useState, useEffect, useRef } from "react";

const R2Homepage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [countersAnimated, setCountersAnimated] = useState<boolean>(false);
  const [statCounts, setStatCounts] = useState<number[]>([0, 0, 0, 0]);

  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll(".scroll-reveal");
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add("active");
        }
      });

      if (statsRef.current && !countersAnimated) {
        const statsTop = statsRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (statsTop < windowHeight - 100) {
          setCountersAnimated(true);
          animateCounters();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [countersAnimated]);

  const animateCounters = () => {
    const targets = [150, 98, 50, 24];
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStatCounts(targets.map((target) => Math.floor(target * progress)));

      if (currentStep >= steps) {
        setStatCounts(targets);
        clearInterval(timer);
      }
    }, interval);
  };

  const smoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Montserrat:wght@300;400;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --bg-dark: #0a0a0f;
          --bg-secondary: #12121a;
          --accent-red: #ff0844;
          --accent-blue: #00d4ff;
          --text-white: #ffffff;
          --text-gray: #b0b0b5;
        }

        body {
          font-family: 'Montserrat', sans-serif;
          background: var(--bg-dark);
          color: var(--text-white);
          overflow-x: hidden;
        }

        .app {
          position: relative;
          width: 100%;
          min-height: 100vh;
        }

        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .bg-gradient {
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 20% 50%, rgba(255, 8, 68, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.15) 0%, transparent 50%);
          animation: gradientMove 20s ease-in-out infinite;
        }

        @keyframes gradientMove {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-50px, -50px) rotate(180deg); }
        }

        .grid-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(255, 8, 68, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridScroll 30s linear infinite;
        }

        @keyframes gridScroll {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        nav {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 30px 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          background: rgba(10, 10, 15, 0.8);
          backdrop-filter: blur(10px);
          animation: slideDown 0.8s ease;
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .logo {
          font-family: 'Orbitron', sans-serif;
          font-size: 28px;
          font-weight: 900;
          background: linear-gradient(135deg, var(--accent-red) 0%, var(--accent-blue) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 8, 68, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5)); }
        }

        .nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .nav-links a {
          color: var(--text-white);
          text-decoration: none;
          font-weight: 600;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-red), var(--accent-blue));
          transition: width 0.4s ease;
        }

        .nav-links a:hover {
          color: var(--accent-red);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 5%;
          z-index: 1;
        }

        .hero-content {
          text-align: center;
          max-width: 1200px;
        }

        .hero h1 {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(48px, 10vw, 120px);
          font-weight: 900;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #ffffff 0%, var(--accent-red) 50%, var(--accent-blue) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleZoom 1.2s ease-out;
          line-height: 1.1;
        }

        @keyframes titleZoom {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .glitch {
          position: relative;
          animation: glitchSkew 5s infinite;
        }

        @keyframes glitchSkew {
          0%, 96%, 100% { transform: skew(0deg); }
          97% { transform: skew(-2deg); }
          98% { transform: skew(2deg); }
          99% { transform: skew(-2deg); }
        }

        .hero p {
          font-size: clamp(18px, 3vw, 24px);
          color: var(--text-gray);
          margin-bottom: 40px;
          animation: fadeInUp 1s ease 0.3s both;
        }

        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .cta-button {
          display: inline-block;
          padding: 18px 50px;
          background: linear-gradient(135deg, var(--accent-red), var(--accent-blue));
          color: var(--text-white);
          text-decoration: none;
          font-weight: 700;
          font-size: 18px;
          border-radius: 50px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeInUp 1s ease 0.6s both;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 40px rgba(255, 8, 68, 0.4);
        }

        .floating-code {
          position: absolute;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: rgba(255, 8, 68, 0.3);
          animation: float 20s infinite ease-in-out;
          user-select: none;
        }

        .code-1 { top: 15%; left: 10%; animation-delay: 0s; }
        .code-2 { top: 60%; right: 15%; animation-delay: 3s; }
        .code-3 { bottom: 20%; left: 20%; animation-delay: 6s; }
        .code-4 { top: 30%; right: 25%; animation-delay: 9s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-30px) rotate(5deg); opacity: 0.6; }
        }

        .services {
          position: relative;
          padding: 120px 5%;
          z-index: 1;
        }

        .section-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(40px, 7vw, 80px);
          text-align: center;
          margin-bottom: 80px;
          background: linear-gradient(135deg, var(--accent-red), var(--accent-blue));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .service-card {
          background: rgba(18, 18, 26, 0.6);
          border: 1px solid rgba(255, 8, 68, 0.2);
          border-radius: 20px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, var(--accent-red), var(--accent-blue));
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .service-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--bg-secondary);
          border-radius: 18px;
          z-index: -1;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(255, 8, 68, 0.3);
        }

        .service-icon {
          font-size: 50px;
          margin-bottom: 20px;
          display: inline-block;
          animation: iconBounce 2s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .service-card:nth-child(1) .service-icon { animation-delay: 0s; }
        .service-card:nth-child(2) .service-icon { animation-delay: 0.3s; }
        .service-card:nth-child(3) .service-icon { animation-delay: 0.6s; }

        .service-card h3 {
          font-family: 'Orbitron', sans-serif;
          font-size: 24px;
          margin-bottom: 15px;
          color: var(--text-white);
        }

        .service-card p {
          color: var(--text-gray);
          line-height: 1.6;
        }

        .stats {
          position: relative;
          padding: 100px 5%;
          background: rgba(18, 18, 26, 0.4);
          z-index: 1;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(48px, 8vw, 72px);
          font-weight: 900;
          background: linear-gradient(135deg, var(--accent-red), var(--accent-blue));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 18px;
          color: var(--text-gray);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        /* PRICING */
        .pricing {
          position: relative;
          padding: 120px 5%;
          z-index: 1;
        }

        .pricing-subtitle {
          text-align: center;
          color: var(--text-gray);
          max-width: 900px;
          margin: -55px auto 70px;
          font-size: clamp(16px, 2.2vw, 20px);
          line-height: 1.6;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(260px, 1fr));
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: stretch;
        }

        .plan-card {
          position: relative;
          background: rgba(18, 18, 26, 0.6);
          border: 1px solid rgba(255, 8, 68, 0.2);
          border-radius: 22px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .plan-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, var(--accent-red), var(--accent-blue));
          opacity: 0;
          border-radius: 24px;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .plan-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(18, 18, 26, 0.92);
          border-radius: 20px;
          z-index: -1;
        }

        .plan-card:hover {
          transform: translateY(-10px) scale(1.01);
          box-shadow: 0 20px 70px rgba(255, 8, 68, 0.25);
          border-color: rgba(0, 212, 255, 0.28);
        }

        .plan-card:hover::before {
          opacity: 1;
        }

        .plan-head {
          padding: 28px 28px 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .plan-name {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 22px;
          margin-bottom: 10px;
        }

        .plan-desc {
          color: var(--text-gray);
          line-height: 1.6;
          font-size: 15px;
        }

        .plan-price {
          padding: 18px 28px 0;
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 44px;
          background: linear-gradient(135deg, var(--accent-red), var(--accent-blue));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .plan-price small {
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          color: var(--text-gray);
          -webkit-text-fill-color: var(--text-gray);
          display: block;
          margin-top: 6px;
        }

        .plan-body {
          padding: 20px 28px 26px;
        }

        .checklist {
          list-style: none;
          margin-top: 14px;
          display: grid;
          gap: 10px;
        }

        .check {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          color: rgba(255,255,255,0.9);
          line-height: 1.45;
          font-size: 15px;
        }

        .tick {
          width: 22px;
          height: 22px;
          border-radius: 7px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 212, 255, 0.12);
          border: 1px solid rgba(0, 212, 255, 0.22);
          flex: 0 0 auto;
          margin-top: 1px;
        }

        .tick svg {
          width: 14px;
          height: 14px;
        }

        .plan-cta {
          padding: 0 28px 28px;
        }

        .plan-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 18px;
          border-radius: 14px;
          font-weight: 800;
          text-decoration: none;
          color: var(--text-white);
          background: linear-gradient(135deg, var(--accent-red), var(--accent-blue));
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        }

        .plan-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 60px rgba(255, 8, 68, 0.25);
        }

        .featured {
          transform: translateY(-10px);
        }

        .featured::before {
          opacity: 1;
        }

        .featured .plan-head {
          background: linear-gradient(180deg, rgba(255, 8, 68, 0.14), transparent);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          font-size: 12px;
          padding: 8px 12px;
          border-radius: 999px;
          margin-top: 14px;
          color: rgba(255,255,255,0.95);
          background: rgba(255, 8, 68, 0.12);
          border: 1px solid rgba(255, 8, 68, 0.24);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-red);
          box-shadow: 0 0 18px rgba(255, 8, 68, 0.6);
        }

        .contact {
          position: relative;
          padding: 120px 5%;
          z-index: 1;
        }

        .contact-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .contact h2 {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(40px, 7vw, 80px);
          margin-bottom: 30px;
          background: linear-gradient(135deg, var(--accent-red), var(--accent-blue));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contact p {
          font-size: 20px;
          color: var(--text-gray);
          margin-bottom: 40px;
        }

        .contact-email {
          font-size: 28px;
          color: var(--text-white);
          text-decoration: none;
          position: relative;
          display: inline-block;
          transition: color 0.3s ease;
        }

        .contact-email::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-red), var(--accent-blue));
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .contact-email:hover {
          color: var(--accent-red);
        }

        .contact-email:hover::after {
          transform: scaleX(1);
        }

        footer {
          position: relative;
          padding: 40px 5%;
          text-align: center;
          border-top: 1px solid rgba(255, 8, 68, 0.2);
          z-index: 1;
        }

        footer p {
          color: var(--text-gray);
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .scroll-reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .mobile-menu-btn span {
          width: 30px;
          height: 3px;
          background: var(--text-white);
          transition: all 0.3s ease;
        }

        @media (max-width: 980px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 650px;
          }
          .featured {
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }

          .nav-links {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            flex-direction: column;
            background: rgba(10, 10, 15, 0.98);
            padding: 40px;
            gap: 30px;
            transition: left 0.4s ease;
          }

          .nav-links.active {
            left: 0;
          }

          .service-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--accent-red);
          border-radius: 50%;
          animation: particleFloat 15s infinite ease-in-out;
          opacity: 0.6;
        }

        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(100px, -100px); }
          50% { transform: translate(-50px, -200px); }
          75% { transform: translate(150px, -50px); }
        }
      `}</style>

      <div className="app">
        <div className="bg-animation">
          <div className="bg-gradient" />
          <div className="grid-overlay" />
        </div>

        <nav>
          <div className="logo">R2</div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <a href="#home" onClick={(e) => smoothScroll(e, "#home")}>
                Avaleht
              </a>
            </li>
            <li>
              <a href="#teenused" onClick={(e) => smoothScroll(e, "#teenused")}>
                Teenused
              </a>
            </li>
            <li>
              <a href="#paketid" onClick={(e) => smoothScroll(e, "#paketid")}>
                Paketid
              </a>
            </li>
            <li>
              <a href="#kontakt" onClick={(e) => smoothScroll(e, "#kontakt")}>
                Kontakt
              </a>
            </li>
          </ul>
        </nav>

        <section className="hero" id="home">
          <div className="floating-code code-1">&lt;div className="genius"&gt;</div>
          <div className="floating-code code-2">const innovation = true;</div>
          <div className="floating-code code-3">async function() {"{}"}</div>
          <div className="floating-code code-4">@keyframes magic {"{}"}</div>

          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                background: i % 2 === 0 ? "var(--accent-red)" : "var(--accent-blue)",
              }}
            />
          ))}

          <div className="hero-content">
            <h1 className="glitch">R2</h1>
            <p>
              Me ei loo lihtsalt veebilehti. Me loome digitaalseid kogemusi, mis
              muudavad mängu reegleid.
            </p>
            <a
              href="#kontakt"
              className="cta-button"
              onClick={(e) => smoothScroll(e, "#kontakt")}
            >
              Alusta Projekti
            </a>
          </div>
        </section>

        <section className="services scroll-reveal" id="teenused">
          <h2 className="section-title">Meie Geniaalus</h2>
          <div className="service-grid">
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3>Web Development</h3>
              <p>
                Modernne, kiire ja vastupidav veebi arendus kasutades viimast
                tehnoloogiat. React, Vue, Node.js - me valitseme neid kõiki.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>UI/UX Design</h3>
              <p>
                Disain, mis ei jäta ükskõikseks. Loome visuaalselt vapustavaid
                ja kasutajasõbralikke liidesi, mis jäävad meelde.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Performance Optimization</h3>
              <p>
                Teeme sinu veebilehe välkkiireks. Iga millisekund loeb ja meie
                tagame, et sinu sait on välgukiire.
              </p>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="pricing scroll-reveal" id="paketid">
          <h2 className="section-title">Paketid</h2>
          <p className="pricing-subtitle">
            Vali tase, mis sobib su eesmärgiga. Kõik paketid on tehtud kiireks,
            modernseks ja müügiks valmis — erinevus on automaatikas ja
            funktsionaalsuses.
          </p>

          <div className="pricing-grid">
            {/* BASIC */}
            <div className="plan-card">
              <div className="plan-head">
                <div className="plan-name">Basic</div>
                <div className="plan-desc">
                  Stiilne ja kiire veebileht, mis jätab tugeva mulje ja toob
                  päringuid.
                </div>
              </div>
              <div className="plan-price">
                599€
                <small>alates</small>
              </div>
              <div className="plan-body">
                <ul className="checklist">
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Modernne one-page või 3 sektsiooniga landing
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Mobile-first disain + kiire laadimine
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Kontakt CTA + e-mail / vorm / tel link
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Usaldus: sektsioonid, teenused, lihtne copy
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Kasu: näed parem välja → rohkem päringuid
                  </li>
                </ul>
              </div>
              <div className="plan-cta">
                <a
                  className="plan-btn"
                  href="#kontakt"
                  onClick={(e) => smoothScroll(e, "#kontakt")}
                >
                  Küsi pakkumist
                </a>
              </div>
            </div>

            {/* PRO (FEATURED) */}
            <div className="plan-card featured">
              <div className="plan-head">
                <div className="plan-name">Pro</div>
                <div className="plan-desc">
                  Veebileht + broneerimissüsteem. Sobib teenuseärile, kus aeg =
                  raha.
                </div>
                <div className="badge">
                  <span className="badge-dot" />
                  Kõige populaarsem
                </div>
              </div>
              <div className="plan-price">
                999€
                <small>alates</small>
              </div>
              <div className="plan-body">
                <ul className="checklist">
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Kõik Basic paketist (disain, CTA, kiirus)
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Broneerimissüsteem (ajad, teenused, kinnitused)
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Automaatsed teavitused (e-mail / SMS valikuline)
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Vähem käsitööd: vähem kõnesid, vähem “kas sul aega on?”
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Kasu: rohkem broneeringuid + vähem tühje auke
                  </li>
                </ul>
              </div>
              <div className="plan-cta">
                <a
                  className="plan-btn"
                  href="#kontakt"
                  onClick={(e) => smoothScroll(e, "#kontakt")}
                >
                  Küsi pakkumist
                </a>
              </div>
            </div>

            {/* ELITE */}
            <div className="plan-card">
              <div className="plan-head">
                <div className="plan-name">Elite</div>
                <div className="plan-desc">
                  Veeb + broneerimine + AI receptionist, kes vastab ja suunab
                  kliente 24/7.
                </div>
              </div>
              <div className="plan-price">
                1499€
                <small>alates</small>
              </div>
              <div className="plan-body">
                <ul className="checklist">
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Kõik Pro paketist (broneerimine + automaatika)
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    AI receptionist (vastab küsimustele, juhib broneeringule)
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    24/7: püüab kinni “kuumad” kliendid ka öösel
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Vähem kaotatud päringuid + kiirem reageerimine
                  </li>
                  <li className="check">
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    Kasu: rohkem müüki, vähem “ma lähen konkurendi juurde”
                  </li>
                </ul>
              </div>
              <div className="plan-cta">
                <a
                  className="plan-btn"
                  href="#kontakt"
                  onClick={(e) => smoothScroll(e, "#kontakt")}
                >
                  Küsi pakkumist
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="stats scroll-reveal" ref={statsRef}>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{statCounts[0]}</span>
              <span className="stat-label">Projekti</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{statCounts[1]}</span>
              <span className="stat-label">% Rahulolu</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{statCounts[2]}</span>
              <span className="stat-label">Tiimi Liiget</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{statCounts[3]}</span>
              <span className="stat-label">/ 7 Tugi</span>
            </div>
          </div>
        </section>

        <section className="contact scroll-reveal" id="kontakt">
          <div className="contact-container">
            <h2>Valmis Alustama?</h2>
            <p>
              Võta meiega ühendust ja teeme sinu visiooni reaalsuseks. Esimene
              konsultatsioon on tasuta!
            </p>
            <a href="mailto:info@rr-enterprises.ee" className="contact-email">
              info@r2.ee
            </a>
          </div>
        </section>

        <footer>
          <p>&copy; 2026 R2. Kõik õigused kaitstud. Made with 💖 and 🔥</p>
        </footer>
      </div>
    </>
  );
};

export default R2Homepage;
