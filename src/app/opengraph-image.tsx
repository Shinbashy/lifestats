import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "LifeStats - Your Life in Numbers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative grid dots */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexWrap: "wrap",
            opacity: 0.06,
          }}
        >
          {Array.from({ length: 300 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "#94a3b8",
                }}
              />
            </div>
          ))}
        </div>

        {/* Accent glow - top right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Accent glow - bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Top section: Logo + stat badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              L
            </div>
            <span
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: "#f1f5f9",
                letterSpacing: "-0.02em",
              }}
            >
              LifeStats
            </span>
          </div>

          {/* Floating stat pills */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { icon: "♥", label: "2.8B", desc: "heartbeats" },
              { icon: "🌕", label: "380+", desc: "full moons" },
              { icon: "🌍", label: "584M", desc: "miles in space" },
            ].map((stat) => (
              <div
                key={stat.desc}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "12px 18px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span style={{ fontSize: 20 }}>{stat.icon}</span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#c4b5fd",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </span>
                <span style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: "20px",
            marginTop: -10,
          }}
        >
          <div
            style={{
              fontSize: 54,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: 800,
            }}
          >
            Your Life in
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #c084fc)",
                backgroundClip: "text",
                color: "transparent",
                marginLeft: 14,
              }}
            >
              Numbers
            </span>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#94a3b8",
              maxWidth: 650,
              lineHeight: 1.5,
            }}
          >
            Discover 50+ fascinating statistics about your life
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "rgba(99,102,241,0.15)",
              borderRadius: 30,
              border: "1px solid rgba(99,102,241,0.25)",
            }}
          >
            <span style={{ fontSize: 15, color: "#a5b4fc", fontWeight: 600 }}>
              Enter your birthday →
            </span>
          </div>
          <span style={{ fontSize: 16, color: "#64748b", fontWeight: 500 }}>
            getlifestats.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
