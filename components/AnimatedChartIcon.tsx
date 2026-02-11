export default function AnimatedChartIcon({ size = 64 }) {
    return (
        <div style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg
                viewBox="0 0 100 100"
                width={size}
                height={size}
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
            >
                <style>{`
          @keyframes growBar1 {
            0%, 100% { transform: scaleY(0.85); }
            50% { transform: scaleY(1); }
          }
          @keyframes growBar2 {
            0%, 100% { transform: scaleY(0.9); }
            50% { transform: scaleY(1); }
          }
          @keyframes growBar3 {
            0%, 100% { transform: scaleY(0.88); }
            50% { transform: scaleY(1); }
          }
          @keyframes arrowPulse {
            0%, 100% { transform: translateY(0px); opacity: 1; }
            50% { transform: translateY(-3px); opacity: 0.85; }
          }
          @keyframes arrowDash {
            0%   { stroke-dashoffset: 130; }
            65%  { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 0; }
          }

          .bar1 {
            transform-origin: 28px 82px;
            animation: growBar1 1.8s ease-in-out infinite 0s;
          }
          .bar2 {
            transform-origin: 50px 82px;
            animation: growBar2 1.8s ease-in-out infinite 0.15s;
          }
          .bar3 {
            transform-origin: 72px 82px;
            animation: growBar3 1.8s ease-in-out infinite 0.3s;
          }
          .arrow-line {
            stroke-dasharray: 130;
            stroke-dashoffset: 130;
            animation:
              arrowDash 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards,
              arrowPulse 1.8s ease-in-out 1.4s infinite;
          }
        `}</style>

                <defs>
                    <filter id="barShadow" x="-20%" y="-10%" width="150%" height="130%">
                        <feDropShadow dx="1.5" dy="2" stdDeviation="1.5" floodColor="#00000022" />
                    </filter>

                    {/*
            orient="auto" rotates the arrowhead to match the final segment direction.
            refX="3.5" places the polygon tip exactly at the polyline endpoint.
          */}
                    <marker
                        id="arrowHead"
                        markerWidth="4"
                        markerHeight="4"
                        refX="3.5"
                        refY="2"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <polygon points="0,0 4,2 0,4" fill="#3DBD82" />
                    </marker>
                </defs>

                {/* Bar 1 — Yellow */}
                <g className="bar1" filter="url(#barShadow)">
                    <rect x="18" y="62" width="20" height="20" rx="3" fill="#F5C842" />
                    <rect x="35" y="64" width="3" height="18" rx="1.5" fill="#D4A916" opacity="0.6" />
                    <rect x="18" y="62" width="20" height="4" rx="2" fill="#FFE57A" opacity="0.7" />
                </g>

                {/* Bar 2 — Red/Pink */}
                <g className="bar2" filter="url(#barShadow)">
                    <rect x="40" y="48" width="20" height="34" rx="3" fill="#F07070" />
                    <rect x="57" y="50" width="3" height="32" rx="1.5" fill="#C94040" opacity="0.55" />
                    <rect x="40" y="48" width="20" height="4" rx="2" fill="#FFAAAA" opacity="0.6" />
                </g>

                {/* Bar 3 — Blue */}
                <g className="bar3" filter="url(#barShadow)">
                    <rect x="62" y="34" width="20" height="48" rx="3" fill="#5DC9E8" />
                    <rect x="79" y="36" width="3" height="46" rx="1.5" fill="#2AA8C8" opacity="0.55" />
                    <rect x="62" y="34" width="20" height="4" rx="2" fill="#A8EEFF" opacity="0.6" />
                </g>

                {/*
          Line shifted up ~8px. The marker-end arrowhead auto-orients to the
          final segment (65,26 → 78,11) so it always connects flush to the tip.
        */}
                <polyline
                    className="arrow-line"
                    points="10,64 24,47 37,54 51,33 65,26 78,11"
                    fill="none"
                    stroke="#3DBD82"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd="url(#arrowHead)"
                />
            </svg>
        </div>
    );
}