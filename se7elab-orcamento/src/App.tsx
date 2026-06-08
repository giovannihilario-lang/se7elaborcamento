import { useState } from "react";

// ─── PLACEHOLDER ASSETS ───────────────────────────────────────────────────────
const StickerPlaceholder = ({ index, size = 64 }: { index: number; size?: number }) => {
  const colors = ["#39FF14", "#00e5a0", "#b8ff57", "#7dff6b"];
  const expressions = ["😄", "😎", "🤩", "😜"];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${colors[index % 4]}, #1a1a1a)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.45,
        boxShadow: `0 0 ${size * 0.3}px ${colors[index % 4]}55`,
        flexShrink: 0,
      }}
    >
      {expressions[index % 4]}
    </div>
  );
};

const Logo = ({ size = 48 }: { size?: number }) => (
  <div
    style={{
      width: size * 1.8,
      height: size,
      border: "2px solid #39FF14",
      borderRadius: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Space Mono', monospace",
      fontSize: size * 0.32,
      color: "#39FF14",
      letterSpacing: 1,
      flexShrink: 0,
    }}
  >
    Se<span style={{ color: "#fff" }}>7</span>e
    <span style={{ color: "#39FF14", marginLeft: 2 }}>Lab</span>
  </div>
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
          className="hero-stickers"
          style={{ display: "flex", gap: 20, marginTop: 36, marginBottom: 8, alignItems: "flex-end" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="sticker-float" style={{ transform: i % 2 === 0 ? "scale(1.15)" : "scale(0.95)" }}>
              <StickerPlaceholder index={i} size={i === 2 ? 72 : 58} />
            </div>
          ))}
          <p style={{ color: "#444", fontSize: 11, fontFamily: "'Space Mono', monospace", marginLeft: 8, lineHeight: 1.5 }}>
            ← substituir pelos<br />stickers reais
          </p>
        </div>
      </div>

      <div className="divider" />

      {/* ── SERVIÇOS ── */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
        <div className="section-label">Serviços disponíveis</div>

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
          <div className="section-label">Resumo do orçamento selecionado</div>

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
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>TOTAL / MÊS</span>
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
