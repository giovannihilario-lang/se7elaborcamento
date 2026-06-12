import { useState, useRef } from "react";

const prints = {
  feed: [
    { src: "/prints/reel-1.mp4", label: "Reel" },
    { src: "/prints/reel-2.mp4", label: "Reel" },
    { src: "/prints/reel-3.mp4", label: "Reel" },
    { src: "/prints/reel-4.mp4", label: "Reel" },
  ],
  metricas: [
    { src: "/prints/metric-1.png", label: "Alcance" },
    { src: "/prints/metric-2.png", label: "Seguidores" },
    { src: "/prints/metric-3.png", label: "Insights" },
    { src: "/prints/metric-4.png", label: "Insights" },
  ],
  design: [
    { src: "/prints/post-1.png", label: "Post" },
    { src: "/prints/post-2.png", label: "Post" },
    { src: "/prints/post-3.png", label: "Post" },
    { src: "/prints/post-4.png", label: "Post" },
    { src: "/prints/post-5.png", label: "Post" },
    { src: "/prints/post-6.png", label: "Post" },
  ],
};

export const PrintsSection = () => {
  const [active, setActive] = useState<"feed" | "metricas" | "design">("feed");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const tabs: { key: typeof active; label: string; color: string }[] = [
    { key: "feed", label: "Reels", color: "#39FF14" },
    { key: "metricas", label: "Métricas", color: "#00e5a0" },
    { key: "design", label: "Posts", color: "#00cfff" },
  ];

  const current = prints[active];
  const accentColor = tabs.find((t) => t.key === active)!.color;

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  // ── REELS: grade 2 colunas 9:16 ──────────────────────────────────────────
  const ReelsGrid = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {current.map((p, i) => (
        <div
          key={i}
          onClick={() => setLightbox(p.src)}
          style={{
            position: "relative",
            aspectRatio: "9 / 16",
            borderRadius: 12,
            overflow: "hidden",
            border: `1px solid #2a2a2a`,
            cursor: "zoom-in",
            background: "#141414",
            transition: "transform 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
            (e.currentTarget as HTMLDivElement).style.borderColor = accentColor + "66";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
          }}
        >
          <video
  src={p.src}
  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
  muted
  loop
  playsInline
  autoPlay
/>
          {/* Play icon overlay */}
          <div style={{
            position: "absolute", top: 10, right: 10,
            width: 28, height: 28, borderRadius: "50%",
            background: "#00000088",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: 0, height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: `10px solid ${accentColor}`,
              marginLeft: 2,
            }} />
          </div>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "24px 10px 10px",
            background: "linear-gradient(transparent, #000000cc)",
            fontFamily: "'Space Mono', monospace",
            fontSize: 9, color: accentColor,
            letterSpacing: 1.5, textTransform: "uppercase",
          }}>
            {p.label}
          </div>
        </div>
      ))}
    </div>
  );

  // ── POSTS: carrossel horizontal 5:4 ──────────────────────────────────────
  const PostsCarousel = () => (
    <div style={{ position: "relative" }}>
      {/* Setas */}
      {["left", "right"].map((dir) => (
        <button
          key={dir}
          onClick={() => scroll(dir as "left" | "right")}
          style={{
            position: "absolute",
            top: "50%", transform: "translateY(-50%)",
            [dir]: -16,
            zIndex: 10,
            width: 36, height: 36, borderRadius: "50%",
            background: "#1a1a1a",
            border: `1px solid ${accentColor}44`,
            color: accentColor,
            fontSize: 16, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = accentColor + "22")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a1a")}
        >
          {dir === "left" ? "‹" : "›"}
        </button>
      ))}

      {/* Track */}
      <div
        ref={carouselRef}
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: 8,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`.carousel::-webkit-scrollbar { display: none; }`}</style>
        {current.map((p, i) => (
          <div
            key={i}
            onClick={() => setLightbox(p.src)}
            style={{
              flexShrink: 0,
              width: "calc(33.33% - 8px)",
              aspectRatio: "5 / 4",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #2a2a2a",
              cursor: "zoom-in",
              background: "#141414",
              scrollSnapAlign: "start",
              position: "relative",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = accentColor + "66";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
            }}
          >
            <img
              src={p.src}
              alt={p.label}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "20px 12px 10px",
              background: "linear-gradient(transparent, #000000cc)",
              fontFamily: "'Space Mono', monospace",
              fontSize: 9, color: accentColor,
              letterSpacing: 1.5, textTransform: "uppercase",
            }}>
              {p.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── MÉTRICAS: grade quadrada igual antes ──────────────────────────────────
  const MetricasGrid = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
      {current.map((p, i) => (
        <div
          key={i}
          onClick={() => setLightbox(p.src)}
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid #2a2a2a",
            cursor: "zoom-in",
            background: "#141414",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = accentColor + "66";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
          }}
        >
          <img
            src={p.src}
            alt={p.label}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      ))}
    </div>
  );

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
              fontSize: 10, letterSpacing: 2,
              textTransform: "uppercase",
              padding: "6px 16px", borderRadius: 6,
              border: `1px solid ${active === t.key ? t.color + "66" : "#2a2a2a"}`,
              background: active === t.key ? t.color + "15" : "transparent",
              color: active === t.key ? t.color : "#555",
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Render by tab */}
      {active === "feed" && <ReelsGrid />}
      {active === "design" && <PostsCarousel />}
      {active === "metricas" && <MetricasGrid />}

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0,
            background: "#000000ee",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, cursor: "zoom-out", padding: 24,
          }}
        >
          <img
            src={lightbox}
            alt=""
            style={{
              maxWidth: "90vw", maxHeight: "90vh",
              objectFit: "contain", borderRadius: 12,
              border: `1px solid ${accentColor}44`,
            }}
          />
        </div>
      )}
    </div>
  );
};
