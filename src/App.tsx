import { useState } from "react";

// ─── PLACEHOLDER ASSETS ─────────────────────────────────────────

const Logo = ({ size = 48 }: { size?: number }) => (
  <img
    src="src/Icons/Se7elab.png"
    alt="Se7eLab"
    style={{ height: size, width: "auto", flexShrink: 0 }}
  />
);
// ─────────────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 1,
    name: "Gestão de Social Media",
    tag: "SOCIAL MEDIA",
    desc: "Planejamento editorial mensal, cronograma, legendas, hashtags, interação ativa e acompanhamento de 3 redes (Instagram, TikTok e YouTube). Estratégias de crescimento orgânico, moderação de comentários, engajamento e reuniões quinzenais de alinhamento.",
    ref: "R$ 1.500",
    refNote: "freelancer intermediário 2026",
    price: 1500,
    color: "#39FF14",
  },
  {
    id: 2,
    name: "Criação de Conteúdo",
    tag: "DESIGN & VÍDEO",
    desc: "12 peças mensais: 4 carrosséis + 8 vídeos. Conceituação, roteirização, design gráfico, gravação e edição completa. Consistência de identidade visual, peças publicitárias sob demanda e reformulações de identidade.",
    ref: "R$ 3.000",
    refNote: "pacote com vídeo 2026",
    price: 3000,
    color: "#00e5a0",
  },
  {
    id: 3,
    name: "Gestão de Tráfego Pago",
    tag: "PERFORMANCE",
    desc: "Administração completa de mídia paga — planejamento, criação e configuração de campanhas, segmentação de público, gestão de orçamento, criativos alinhados à marca, acompanhamento diário e relatórios periódicos com recomendações estratégicas.",
    ref: "R$ 1.500",
    refNote: "piso de mercado 2026",
    price: 1500,
    color: "#b8ff57",
  },
  {
    id: 4,
    name: "Designs Avulsos",
    tag: "SOB DEMANDA",
    desc: "Criação de peças visuais sob demanda, fora do cronograma fixo de postagens. Materiais institucionais, banners, apresentações, identidade visual e outros formatos pontuais.",
    ref: "R$ 400",
    refNote: "demanda mensal recorrente",
    price: 400,
    color: "#7dff6b",
  },
  {
    id: 5,
    name: "Automações & Tecnologia",
    tag: "PROPOSTA",
    desc: "Calendário editorial automatizado, formulários automatizados e integração de ferramentas para otimizar captação e organização de dados da empresa.",
    ref: "R$ 2.500",
    refNote: "dev + automação 2026",
    price: 2500,
    color: "#39FF14",
    badge: "novo",
  },
  {
    id: 6,
    name: "Desenvolvimento de Sites Básicos",
    tag: "WEB",
    desc: "Criação de sites institucionais, landing pages e portfólios. Design responsivo, otimizado para mobile, com identidade visual alinhada à marca. Inclui formulário de contato, integração com redes sociais e entrega com domínio configurado.",
    ref: "R$ 3.500",
    refNote: "site básico one-page 2026",
    price: 3500,
    color: "#00cfff",
    badge: "novo",
  },
];
// Adicione este componente antes do CasesSection

const prints = {
  feed: [
    { src: "src/prints/feed-1.png", label: "Reel" },
    { src: "src/prints/feed-2.png", label: "Reel" },
    { src: "src/prints/feed-3.png", label: "Post" },
    { src: "src/prints/feed-4.png", label: "Post" },
    { src: "src/prints/feed-5.png", label: "Reel" },
    { src: "src/prints/feed-6.png", label: "Post" },
  ],
  metricas: [
    { src: "src/prints/metric-1.png", label: "Alcance" },
    { src: "src/prints/metric-2.png", label: "Seguidores" },
    { src: "src/prints/metric-3.png", label: "Insights" },
  ],
  design: [
    { src: "src/prints/design-1.png", label: "Carrossel" },
    { src: "src/prints/design-2.png", label: "Banner" },
    { src: "src/prints/design-3.png", label: "Arte" },
    { src: "src/prints/design-4.png", label: "Arte" },
  ],
};

const PrintsSection = () => {
  const [active, setActive] = useState<"feed" | "metricas" | "design">("feed");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const tabs: { key: typeof active; label: string; color: string }[] = [
    { key: "feed", label: "Feed & Reels", color: "#39FF14" },
    { key: "metricas", label: "Métricas", color: "#00e5a0" },
    { key: "design", label: "Peças de Design", color: "#00cfff" },
  ];

  const current = prints[active];
  const accentColor = tabs.find((t) => t.key === active)!.color;

  return (
    <div style={{ marginTop: 32 }}>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: 6,
              border: `1px solid ${active === t.key ? t.color + "66" : "#2a2a2a"}`,
              background: active === t.key ? t.color + "15" : "transparent",
              color: active === t.key ? t.color : "#555",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {current.map((p, i) => (
          <div
            key={i}
            onClick={() => setLightbox(p.src)}
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid #2a2a2a",
              cursor: "zoom-in",
              background: "#141414",
              transition: "transform 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLDivElement).style.borderColor = accentColor + "55";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
            }}
          >
            <img
              src={p.src}
              alt={p.label}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px 10px 8px",
                background: "linear-gradient(transparent, #000000cc)",
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                color: accentColor,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              {p.label}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "#000000ee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "zoom-out",
            padding: 24,
          }}
        >
          <img
            src={lightbox}
            alt=""
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 12,
              border: `1px solid ${accentColor}44`,
            }}
          />
        </div>
      )}
    </div>
  );
};
const CasesSection = () => (
  <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
    <div className="section-label">Resultados reais</div>
    <div className="case-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="growth-pill">
            <span style={{ fontSize: 14 }}>↑</span>
            CASE ATIVO · DESDE SET. 2024
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>Criando XP™</h2>
          <p style={{ fontSize: 12, color: "#555", marginTop: 4, fontFamily: "'Space Mono', monospace" }}>
            Jogos de tabuleiro · RPG profissional · Instagram
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, lineHeight: 1, color: "#39FF14", letterSpacing: 1 }}>+3.333%</p>
          <p style={{ fontSize: 10, color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>CRESCIMENTO DE SEGUIDORES</p>
        </div>
      </div>

      <div style={{ marginTop: 20, padding: "14px 18px", background: "#0d0d0d", borderRadius: 8, border: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#555", lineHeight: 1 }}>300</p>
          <p style={{ fontSize: 9, color: "#444", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>SET. 2024</p>
        </div>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #333, #39FF14)", minWidth: 40 }} />
        <div style={{ fontSize: 10, color: "#39FF14", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>9 MESES</div>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #39FF14, #333)", minWidth: 40 }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#39FF14", lineHeight: 1 }}>10,3 mil</p>
          <p style={{ fontSize: 9, color: "#39FF14", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>JUN. 2025</p>
        </div>
      </div>

      <div className="stat-grid">
<div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#39FF14" }} />
  <p style={{ fontSize: 11, color: "#555" }}>
    Gestão ativa de social media · 80% do conteúdo produzido por Giovanni Domingues Hilario
  </p>
</div>

{/* ← NOVO */}
<PrintsSection />
        <div className="stat-item">
          <p style={{ fontSize: 9, color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, marginBottom: 6 }}>VISUALIZAÇÕES · 30 DIAS</p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: "#fff", lineHeight: 1 }}>369,1 mil</p>
        </div>
        <div className="stat-item">
          <p style={{ fontSize: 9, color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, marginBottom: 6 }}>INTERAÇÕES · 30 DIAS</p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: "#fff", lineHeight: 1 }}>112,8 mil</p>
        </div>
        <div className="stat-item">
          <p style={{ fontSize: 9, color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, marginBottom: 6 }}>NOVOS SEGUIDORES · 30 DIAS</p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: "#39FF14", lineHeight: 1 }}>+1,9 mil</p>
        </div>
        <div className="stat-item">
          <p style={{ fontSize: 9, color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, marginBottom: 6 }}>CONTEÚDOS PUBLICADOS</p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: "#fff", lineHeight: 1 }}>62</p>
          <p style={{ fontSize: 9, color: "#444", marginTop: 2 }}>últimos 30 dias</p>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#39FF14" }} />
        <p style={{ fontSize: 11, color: "#555" }}>Gestão ativa de social media · 80% do conteúdo produzido por Giovanni Domingues Hilario</p>
      </div>
    </div>
    <div className="divider" />
  </div>
);

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function App() {
  const [selected, setSelected] = useState<number[]>([1, 2, 3, 4]);

  const total = selected.reduce((acc, id) => {
    const s = services.find((s) => s.id === id);
    return acc + (s?.price ?? 0);
  }, 0);

  const toggleService = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div
      style={{
        background: "#0d0d0d",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        color: "#e8e8e8",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .glow-green { text-shadow: 0 0 20px #39FF1488, 0 0 40px #39FF1433; }

        .card-service {
          background: #141414;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 24px;
          transition: all 0.25s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .card-service::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.25s;
        }
        .card-service.active {
          border-color: #39FF1466;
          background: #111f13;
        }
        .card-service.active::before { opacity: 1; }
        .card-service:hover { border-color: #39FF1444; transform: translateY(-2px); }

        .price-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          letter-spacing: 2px;
        }

        .badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: #39FF1422;
          color: #39FF14;
          border: 1px solid #39FF1444;
          margin-left: 8px;
          vertical-align: middle;
        }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #39FF14;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #39FF1444, transparent);
        }

        .total-box {
          background: linear-gradient(135deg, #0d1f0f, #141414);
          border: 1px solid #39FF1455;
          border-radius: 16px;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }
        .total-box::after {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 120px; height: 120px;
          background: radial-gradient(circle, #39FF1422, transparent 70%);
          pointer-events: none;
        }

        .check-circle {
          width: 22px; height: 22px;
          border-radius: 50%;
          border: 2px solid #333;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .check-circle.on {
          background: #39FF14;
          border-color: #39FF14;
          color: #000;
        }

        .sticker-float {
          animation: float 4s ease-in-out infinite;
        }
        .sticker-float:nth-child(2) { animation-delay: -1s; }
        .sticker-float:nth-child(3) { animation-delay: -2s; }
        .sticker-float:nth-child(4) { animation-delay: -3s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .tag-pill {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 10px;
        }

        .ref-price {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #555;
          text-decoration: line-through;
        }

        .notice-box {
          background: #141414;
          border: 1px solid #2a2a2a;
          border-left: 3px solid #39FF14;
          border-radius: 8px;
          padding: 16px 20px;
          font-size: 13.5px;
          line-height: 1.7;
          color: #aaa;
        }

        .summary-card {
          background: #141414;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 20px 24px;
          text-align: center;
        }

        .divider { height: 1px; background: linear-gradient(90deg, transparent, #2a2a2a, transparent); margin: 48px 0; }

        @media (max-width: 640px) {
          .case-card {
            background: #141414;
            border: 1px solid #2a2a2a;
            border-radius: 12px;
            padding: 28px 24px;
            position: relative;
            overflow: hidden;
          }
          .case-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, #39FF14, #00e5a0, transparent);
          }
          .stat-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-top: 20px;
          }
          .stat-item {
            background: #0d0d0d;
            border: 1px solid #222;
            border-radius: 8px;
            padding: 14px 16px;
          }
          .growth-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #39FF1415;
            border: 1px solid #39FF1433;
            border-radius: 999px;
            padding: 4px 12px;
            font-family: 'Space Mono', monospace;
            font-size: 10px;
            color: #39FF14;
            letter-spacing: 1px;
            margin-bottom: 16px;
          }
          
          @media (max-width: 640px) {
            .services-grid { grid-template-columns: 1fr !important; }
          .summary-grid { grid-template-columns: 1fr !important; }
          .hero-stickers { gap: 12px !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#39FF14", marginBottom: 12 }}>
              DOCUMENTO COMERCIAL · 2026
            </p>
            <h1 style={{ fontSize: "clamp(42px, 8vw, 72px)", fontWeight: 900, lineHeight: 1, color: "#fff", letterSpacing: -2 }}>
              SERVIÇOS
              <br />
              <span style={{ color: "#39FF14" }} className="glow-green">DIGITAIS</span>
              <br />
              COMPLETOS
            </h1>
          </div>
          <Logo size={44} />
        </div>

        <p style={{ marginTop: 20, color: "#666", fontSize: 13 }}>
          Giovanni Domingues Hilario · Designer Gráfico, Social Media & Tráfego Pago
        </p>

        {/* Stickers row */}
        <div
           style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36 }}>
          <img src="src/Icons/se7esorrindo.png" alt="sticker" style={{ width: 72, height: 72, objectFit: "contain" }} />
        </div>
      </div>

      <div className="divider" />

      <CasesSection />

      {/* ── SERVIÇOS ── */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
      <div className="section-label">Serviços disponíveis</div>
<div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
  <img src="src/Icons/se7elinguinha.png" alt="sticker" style={{ width: 52, height: 52, objectFit: "contain" }} />
</div>

        <div
          className="services-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {services.map((s) => {
            const isActive = selected.includes(s.id);
            return (
              <div
                key={s.id}
                className={`card-service ${isActive ? "active" : ""}`}
                onClick={() => toggleService(s.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <span
                      className="tag-pill"
                      style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}33` }}
                    >
                      {s.tag}
                    </span>
                    {s.badge && <span className="badge">{s.badge}</span>}
                  </div>
                  <div className={`check-circle ${isActive ? "on" : ""}`}>✓</div>
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                  {s.name}
                </h3>
                <p style={{ fontSize: 12.5, color: "#777", lineHeight: 1.65, marginBottom: 16 }}>
                  {s.desc}
                </p>

                <div style={{ borderTop: "1px solid #222", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <p className="ref-price">{s.ref}</p>
                    <p style={{ fontSize: 9, color: "#444", fontFamily: "'Space Mono', monospace", letterSpacing: 0.5 }}>{s.refNote}</p>
                  </div>
                  <p className="price-tag" style={{ fontSize: 20, color: s.color }}>
                    {fmt(s.price)}
                    <span style={{ fontSize: 11, color: "#555", fontWeight: 400 }}>/mês</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── RESUMO ── */}
        <div style={{ marginTop: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
  <img src="src/Icons/se7eolhosorriso.png" alt="sticker" style={{ width: 48, height: 48, objectFit: "contain" }} />
  <div className="section-label" style={{ margin: 0, flex: 1 }}>Resumo do orçamento selecionado</div>
</div>

          <div
            className="summary-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}
          >
            <div className="summary-card">
              <p style={{ fontSize: 10, color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: 2, marginBottom: 8 }}>SERVIÇOS SELECIONADOS</p>
              <p className="price-tag" style={{ fontSize: 28, color: "#fff" }}>{selected.length}</p>
              <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>de {services.length} disponíveis</p>
            </div>
            <div className="summary-card" style={{ gridColumn: "span 2" }}>
              <p style={{ fontSize: 10, color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: 2, marginBottom: 8 }}>INVESTIMENTO MENSAL</p>
              <p className="price-tag glow-green" style={{ fontSize: 36, color: "#39FF14" }}>{fmt(total)}</p>
              <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>valores de mercado 2026 · selecione os serviços acima</p>
            </div>
          </div>

          {/* Line items */}
          <div className="total-box">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {services.map((s) => {
                const isOn = selected.includes(s.id);
                return (
                  <div
                    key={s.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      opacity: isOn ? 1 : 0.3,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: isOn ? s.color : "#333", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#ccc" }}>{s.name}</span>
                    </div>
                    <span className="price-tag" style={{ fontSize: 14, color: isOn ? s.color : "#444" }}>
                      {fmt(s.price)}
                    </span>
                  </div>
                );
              })}
              <div style={{ height: 1, background: "#2a2a2a", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <img src="src/Icons/se7esurpreso.png" alt="sticker" style={{ width: 40, height: 40, objectFit: "contain" }} />
    <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>TOTAL / MÊS</span>
  </div>
  <span className="price-tag glow-green" style={{ fontSize: 22, color: "#39FF14" }}>{fmt(total)}</span>
</div>
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* ── OBSERVAÇÕES ── */}
        <div>
          <div className="section-label">Observações importantes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              <>Os valores apresentados são <strong style={{ color: "#e8e8e8" }}>referências de mercado 2026</strong>, praticados por profissionais de nível intermediário a sênior nas respectivas áreas.</>,
              <>A contratação de múltiplos serviços em <strong style={{ color: "#e8e8e8" }}>pacote integrado</strong> permite negociação de valores combinados — consulte para montar o pacote ideal para o seu negócio.</>,
              <>Caso qualquer serviço seja <strong style={{ color: "#e8e8e8" }}>interrompido ou removido do pacote</strong>, os demais serviços são reajustados individualmente conforme os valores unitários.</>,
              <>Este formato é <strong style={{ color: "#e8e8e8" }}>padrão de mercado</strong> para serviços de comunicação, design e tecnologia integrados.</>,
            ].map((text, i) => (
              <div key={i} className="notice-box">{text}</div>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* ── FOOTER ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 14, color: "#39FF14", marginBottom: 4 }}>
              GIOVANNI DOMINGUES HILARIO
            </p>
            <p style={{ fontSize: 12, color: "#555" }}>giovannihilario@hotmail.com · 2026</p>
          </div>
          <Logo size={40} />
        </div>
      </div>
    </div>
  );
}
