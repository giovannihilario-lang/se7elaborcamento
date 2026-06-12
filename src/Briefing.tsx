import { useState } from "react";

// ─── TYPES ───────────────────────────────────────────────────────
type Step = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
};

type FormData = {
  // Empresa
  empresa: string;
  segmento: string;
  site: string;
  redesSociais: string;

  // Público
  publicoAlvo: string;
  mercado: string[];
  ticket: string;

  // Objetivos
  objetivoPrincipal: string;
  kpis: string[];
  prazo: string;

  // Conteúdo
  servicos: string[];
  youtube: string;
  youtubeFormato: string;
  youtubeFrequencia: string;
  youtubeResponsavel: string;
  tom: string[];
  referencias: string;

  // Operacional
  disponibilidade: string;
  contato: string;
  nf: string;
  observacoes: string;
};

const Logo = ({ size = 40 }: { size?: number }) => (
  <img
    src="/Icons/Se7elab.png"
    alt="Se7eLab"
    style={{ height: size, width: "auto", flexShrink: 0 }}
  />
);

const steps: Step[] = [
  { id: "empresa",     label: "01", title: "Empresa",        subtitle: "Dados da sua empresa" },
  { id: "publico",     label: "02", title: "Público",         subtitle: "Para quem você vende" },
  { id: "objetivos",   label: "03", title: "Objetivos",       subtitle: "O que quer alcançar" },
  { id: "conteudo",    label: "04", title: "Conteúdo",        subtitle: "O que será produzido" },
  { id: "operacional", label: "05", title: "Operacional",     subtitle: "Como vamos trabalhar" },
  { id: "resumo",      label: "✓",  title: "Resumo",          subtitle: "Revise e envie" },
];

const initialData: FormData = {
  empresa: "", segmento: "", site: "", redesSociais: "",
  publicoAlvo: "", mercado: [], ticket: "",
  objetivoPrincipal: "", kpis: [], prazo: "",
  servicos: [], youtube: "", youtubeFormato: "", youtubeFrequencia: "", youtubeResponsavel: "", tom: [], referencias: "",
  disponibilidade: "", contato: "", nf: "", observacoes: "",
};

const mercadoOpts   = ["B2B", "B2C", "Governo / Licitação", "E-commerce"];
const kpiOpts       = ["Seguidores", "Alcance / Visualizações", "Leads gerados", "Vendas fechadas", "Engajamento", "AdSense / Monetização"];
const servicoOpts   = ["Gestão de Social Media", "Criação de Conteúdo", "Gestão de Tráfego Pago", "Designs Avulsos", "YouTube", "Migração / Desenvolvimento de Site", "Automações"];
const tomOpts       = ["Profissional e técnico", "Descontraído e próximo", "Institucional", "Educativo", "Vendedor / direto"];
const youtubeFormatoOpts = ["Entrevistas / Podcast", "Tutoriais / Educativo", "Institucional / Marca", "Cases de clientes", "Ainda não definido"];
const youtubeFreqOpts    = ["1x por semana", "2x por semana", "1x por mês", "Ainda não definido"];
const youtubeRespOpts    = ["Eu gravo, você edita", "Você produz tudo", "Temos equipe interna", "A definir na reunião"];
const prazoOpts     = ["Imediato", "Até 15 dias", "Até 30 dias", "Flexível"];
const nfOpts        = ["Sim, MEI", "Sim, ME/LTDA", "Ainda não tenho, preciso verificar"];
const dispOpts      = ["Horário comercial", "Fora do horário comercial", "Fins de semana", "Flexível"];

export default function Briefing() {
  const [step, setStep]     = useState(0);
  const [data, setData]     = useState<FormData>(initialData);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const set = (field: keyof FormData, value: string) =>
    setData((p) => ({ ...p, [field]: value }));

  const toggle = (field: keyof FormData, value: string) =>
    setData((p) => {
      const arr = p[field] as string[];
      return { ...p, [field]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value] };
    });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const enviar = async () => {
    setEnviando(true);
    setErro("");
    try {
      const payload = {
        empresa: data.empresa,
        segmento: data.segmento,
        site: data.site || "—",
        redesSociais: data.redesSociais || "—",
        publicoAlvo: data.publicoAlvo,
        mercado: data.mercado.join(", ") || "—",
        ticket: data.ticket || "—",
        objetivoPrincipal: data.objetivoPrincipal,
        kpis: data.kpis.join(", ") || "—",
        prazo: data.prazo || "—",
        servicos: data.servicos.join(", ") || "—",
        ...(data.servicos.includes("YouTube") && {
          youtube_formato: data.youtubeFormato || "—",
          youtube_frequencia: data.youtubeFrequencia || "—",
          youtube_responsavel: data.youtubeResponsavel || "—",
          youtube_videos_prontos: data.youtube || "—",
        }),
        tom: data.tom.join(", ") || "—",
        referencias: data.referencias || "—",
        disponibilidade: data.disponibilidade || "—",
        contato: data.contato,
        nota_fiscal: data.nf || "—",
        observacoes: data.observacoes || "—",
      };

      const res = await fetch("https://formspree.io/f/xzdqkdbp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEnviado(true);
      } else {
        setErro("Erro ao enviar. Tente novamente.");
      }
    } catch {
      setErro("Erro de conexão. Verifique sua internet.");
    } finally {
      setEnviando(false);
    }
  };

  const progress = Math.round((step / (steps.length - 1)) * 100);

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#e8e8e8", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .glow-green { text-shadow: 0 0 20px #39FF1488, 0 0 40px #39FF1433; }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: #39FF14; margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, #39FF1444, transparent);
        }

        .bf-input {
          width: 100%;
          background: #141414;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 12px 16px;
          color: #e8e8e8;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .bf-input:focus { border-color: #39FF1466; }
        .bf-input::placeholder { color: #444; }

        .bf-textarea {
          width: 100%; min-height: 90px; resize: vertical;
          background: #141414; border: 1px solid #2a2a2a;
          border-radius: 8px; padding: 12px 16px;
          color: #e8e8e8; font-family: 'Inter', sans-serif;
          font-size: 14px; outline: none; transition: border-color 0.2s;
        }
        .bf-textarea:focus { border-color: #39FF1466; }
        .bf-textarea::placeholder { color: #444; }

        .chip {
          display: inline-flex; align-items: center;
          padding: 6px 14px; border-radius: 999px;
          border: 1px solid #2a2a2a; background: #141414;
          font-size: 12px; color: #888; cursor: pointer;
          transition: all 0.15s; user-select: none;
        }
        .chip.on { background: #39FF1415; border-color: #39FF1466; color: #39FF14; }
        .chip:hover { border-color: #39FF1433; }

        .step-dot {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Mono', monospace; font-size: 10px;
          border: 1px solid #2a2a2a; background: #141414; color: #555;
          transition: all 0.2s; flex-shrink: 0;
        }
        .step-dot.done { background: #39FF1422; border-color: #39FF1466; color: #39FF14; }
        .step-dot.active { background: #39FF14; border-color: #39FF14; color: #000; font-weight: 700; }

        .btn-primary {
          background: #39FF14; color: #000; border: none;
          border-radius: 8px; padding: 14px 28px;
          font-family: 'Space Mono', monospace; font-size: 12px;
          font-weight: 700; letter-spacing: 1px; cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.85; }

        .btn-ghost {
          background: transparent; color: #555; border: 1px solid #2a2a2a;
          border-radius: 8px; padding: 14px 28px;
          font-family: 'Space Mono', monospace; font-size: 12px;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: #39FF1433; color: #aaa; }

        .resumo-row {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 12px;
          padding: 12px 0; border-bottom: 1px solid #1a1a1a;
          font-size: 13px;
        }
        .resumo-label { color: #555; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 1px; min-width: 140px; }
        .resumo-value { color: #ccc; text-align: right; }

        .field-label {
          font-size: 11px; color: #555; font-family: 'Space Mono', monospace;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px;
          display: block;
        }

        .progress-bar {
          height: 2px; background: #1a1a1a; border-radius: 999px; overflow: hidden;
          margin-bottom: 40px;
        }
        .progress-fill {
          height: 100%; background: linear-gradient(90deg, #39FF14, #00e5a0);
          border-radius: 999px; transition: width 0.4s ease;
        }

        .card { background: #141414; border: 1px solid #222; border-radius: 12px; padding: 24px; }

        .youtube-conditional {
          margin-top: 16px;
          padding: 20px;
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      `}</style>

      {/* HEADER */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#39FF14", marginBottom: 10 }}>
              BRIEFING · SE7ELAB
            </p>
            <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, lineHeight: 1, color: "#fff", letterSpacing: -1 }}>
              CONTA PRA<br />
              <span className="glow-green" style={{ color: "#39FF14" }}>A GENTE</span>
            </h1>
            <p style={{ marginTop: 12, color: "#555", fontSize: 13 }}>
              Preencha com calma — quanto mais detalhe, melhor o resultado.
            </p>
          </div>
          <Logo size={40} />
        </div>

        {/* Progress */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Step indicators */}
        <div style={{ display: "flex", gap: 8, marginBottom: 40, overflowX: "auto", paddingBottom: 4 }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div className={`step-dot ${i < step ? "done" : i === step ? "active" : ""}`}>
                {i < step ? "✓" : s.label}
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 20, height: 1, background: i < step ? "#39FF1444" : "#1a1a1a" }} />
              )}
            </div>
          ))}
        </div>

        {/* Step title */}
        {!enviado && (
          <div style={{ marginBottom: 32 }}>
            <div className="section-label">{steps[step].title}</div>
            <p style={{ fontSize: 13, color: "#555" }}>{steps[step].subtitle}</p>
          </div>
        )}
      </div>

      {/* FORM BODY */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 80px" }}>

        {enviado ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: "#39FF14", lineHeight: 1 }}>RECEBIDO</p>
            <p style={{ color: "#555", marginTop: 16, fontSize: 14 }}>Briefing enviado com sucesso. Giovanni vai entrar em contato em breve.</p>
          </div>
        ) : (
          <>
            {/* ─── STEP 0: EMPRESA ─── */}
            {step === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label className="field-label">Nome da empresa *</label>
                  <input className="bf-input" placeholder="Ex: Avenza Tecnologia" value={data.empresa} onChange={e => set("empresa", e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Segmento / setor *</label>
                  <input className="bf-input" placeholder="Ex: Tecnologia B2B, Alimentação, RPG..." value={data.segmento} onChange={e => set("segmento", e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Site atual</label>
                  <input className="bf-input" placeholder="https://..." value={data.site} onChange={e => set("site", e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Redes sociais ativas</label>
                  <input className="bf-input" placeholder="@empresa no Instagram, LinkedIn, etc." value={data.redesSociais} onChange={e => set("redesSociais", e.target.value)} />
                </div>
              </div>
            )}

            {/* ─── STEP 1: PÚBLICO ─── */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label className="field-label">Descreva seu cliente ideal *</label>
                  <textarea className="bf-textarea" placeholder="Ex: Diretores de TI em empresas com mais de 200 funcionários, foco em SP e região..." value={data.publicoAlvo} onChange={e => set("publicoAlvo", e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Modelo de mercado *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {mercadoOpts.map(o => (
                      <div key={o} className={`chip ${(data.mercado).includes(o) ? "on" : ""}`} onClick={() => toggle("mercado", o)}>{o}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="field-label">Ticket médio aproximado</label>
                  <input className="bf-input" placeholder="Ex: R$ 5.000 por contrato, R$ 150/mês..." value={data.ticket} onChange={e => set("ticket", e.target.value)} />
                </div>
              </div>
            )}

            {/* ─── STEP 2: OBJETIVOS ─── */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label className="field-label">Objetivo principal *</label>
                  <textarea className="bf-textarea" placeholder="O que você quer que o marketing resolva? Ex: gerar leads qualificados para o time comercial, construir autoridade no LinkedIn..." value={data.objetivoPrincipal} onChange={e => set("objetivoPrincipal", e.target.value)} />
                </div>
                <div>
                  <label className="field-label">KPIs que fazem sentido pra você *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {kpiOpts.map(o => (
                      <div key={o} className={`chip ${(data.kpis).includes(o) ? "on" : ""}`} onClick={() => toggle("kpis", o)}>{o}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="field-label">Prazo para começar *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {prazoOpts.map(o => (
                      <div key={o} className={`chip ${data.prazo === o ? "on" : ""}`} onClick={() => set("prazo", o)}>{o}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 3: CONTEÚDO ─── */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label className="field-label">Serviços de interesse *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {servicoOpts.map(o => (
                      <div key={o} className={`chip ${(data.servicos).includes(o) ? "on" : ""}`} onClick={() => toggle("servicos", o)}>{o}</div>
                    ))}
                  </div>
                </div>

                {/* YouTube condicional */}
                {data.servicos.includes("YouTube") && (
                  <div className="youtube-conditional">
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#39FF14", letterSpacing: 2 }}>DETALHES — YOUTUBE</p>
                    <div>
                      <label className="field-label">Formato dos vídeos</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {youtubeFormatoOpts.map(o => (
                          <div key={o} className={`chip ${data.youtubeFormato === o ? "on" : ""}`} onClick={() => set("youtubeFormato", o)}>{o}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="field-label">Frequência esperada</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {youtubeFreqOpts.map(o => (
                          <div key={o} className={`chip ${data.youtubeFrequencia === o ? "on" : ""}`} onClick={() => set("youtubeFrequencia", o)}>{o}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="field-label">Quem é responsável pela gravação?</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {youtubeRespOpts.map(o => (
                          <div key={o} className={`chip ${data.youtubeResponsavel === o ? "on" : ""}`} onClick={() => set("youtubeResponsavel", o)}>{o}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="field-label">Já tem vídeos gravados para publicar?</label>
                      <textarea className="bf-textarea" placeholder="Descreva o que já tem pronto..." value={data.youtube} onChange={e => set("youtube", e.target.value)} />
                    </div>
                  </div>
                )}

                <div>
                  <label className="field-label">Tom de comunicação *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {tomOpts.map(o => (
                      <div key={o} className={`chip ${(data.tom).includes(o) ? "on" : ""}`} onClick={() => toggle("tom", o)}>{o}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="field-label">Referências visuais ou de conteúdo</label>
                  <textarea className="bf-textarea" placeholder="Links, perfis, marcas que você admira ou quer se parecer..." value={data.referencias} onChange={e => set("referencias", e.target.value)} />
                </div>
              </div>
            )}

            {/* ─── STEP 4: OPERACIONAL ─── */}
            {step === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label className="field-label">Disponibilidade para contato *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {dispOpts.map(o => (
                      <div key={o} className={`chip ${data.disponibilidade === o ? "on" : ""}`} onClick={() => set("disponibilidade", o)}>{o}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="field-label">Melhor canal de contato *</label>
                  <input className="bf-input" placeholder="WhatsApp, e-mail, Slack..." value={data.contato} onChange={e => set("contato", e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Emite nota fiscal? *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {nfOpts.map(o => (
                      <div key={o} className={`chip ${data.nf === o ? "on" : ""}`} onClick={() => set("nf", o)}>{o}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="field-label">Observações adicionais</label>
                  <textarea className="bf-textarea" placeholder="Qualquer coisa relevante que não coubesse nas perguntas anteriores..." value={data.observacoes} onChange={e => set("observacoes", e.target.value)} />
                </div>
              </div>
            )}

            {/* ─── STEP 5: RESUMO ─── */}
            {step === 5 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div className="card">
                  {[
                    ["EMPRESA",         data.empresa],
                    ["SEGMENTO",        data.segmento],
                    ["SITE",            data.site || "—"],
                    ["REDES SOCIAIS",   data.redesSociais || "—"],
                    ["PÚBLICO-ALVO",    data.publicoAlvo],
                    ["MERCADO",         data.mercado.join(", ") || "—"],
                    ["TICKET MÉDIO",    data.ticket || "—"],
                    ["OBJETIVO",        data.objetivoPrincipal],
                    ["KPIs",            data.kpis.join(", ") || "—"],
                    ["PRAZO",           data.prazo || "—"],
                    ["SERVIÇOS",        data.servicos.join(", ") || "—"],
                    ...(data.servicos.includes("YouTube") ? [
                      ["YT · FORMATO",    data.youtubeFormato || "—"],
                      ["YT · FREQUÊNCIA", data.youtubeFrequencia || "—"],
                      ["YT · GRAVAÇÃO",   data.youtubeResponsavel || "—"],
                    ] : []),
                    ["TOM",             data.tom.join(", ") || "—"],
                    ["REFERÊNCIAS",     data.referencias || "—"],
                    ["DISPONIBILIDADE", data.disponibilidade || "—"],
                    ["CONTATO",         data.contato],
                    ["NOTA FISCAL",     data.nf || "—"],
                    ["OBSERVAÇÕES",     data.observacoes || "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="resumo-row">
                      <span className="resumo-label">{label}</span>
                      <span className="resumo-value">{value}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "#444", textAlign: "center" }}>
                  Revise as informações acima antes de enviar.
                </p>
              </div>
            )}

            {/* NAV BUTTONS */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, gap: 12 }}>
              {step > 0 ? (
                <button className="btn-ghost" onClick={prev}>← Voltar</button>
              ) : <div />}

              {step < steps.length - 1 ? (
                <button className="btn-primary" onClick={next}>Continuar →</button>
              ) : (
                <>
                  {erro && <p style={{ fontSize: 12, color: "#ff4444", fontFamily: "'Space Mono', monospace" }}>{erro}</p>}
                  <button className="btn-primary" onClick={enviar} disabled={enviando} style={{ opacity: enviando ? 0.6 : 1 }}>
                    {enviando ? "ENVIANDO..." : "ENVIAR BRIEFING ✓"}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1a1a1a", paddingTop: 24 }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#333", letterSpacing: 2 }}>
          SE7ELAB · GIOVANNI DOMINGUES HILARIO
        </p>
        <Logo size={32} />
      </div>
    </div>
  );
}
