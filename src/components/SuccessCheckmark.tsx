import React, { useState } from 'react';

interface SuccessCheckmarkProps {
  onReplay?: () => void;
}

export const SuccessCheckmark: React.FC<SuccessCheckmarkProps> = ({ onReplay }) => {
  const [animationKey, setAnimationKey] = useState(0);

  const handleTriggerReplay = () => {
    setAnimationKey((prev) => prev + 1);
    if (onReplay) onReplay();
  };

  return (
    <div
      className="relative flex items-center justify-center my-2 cursor-pointer select-none group"
      onClick={handleTriggerReplay}
      title="Click to replay animation"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTriggerReplay();
        }
      }}
    >
      {/* Deep ambient emerald pulse glow */}
      <div
        className="absolute -inset-4 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      {/* Subtle outer ripple ring */}
      <div
        className="absolute -inset-2.5 rounded-full border border-emerald-500/25 transition-transform duration-500 group-hover:scale-105"
        aria-hidden="true"
      />

      {/* Primary SVG checkmark badge */}
      <div
        key={animationKey}
        className="relative z-10 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-[#181a1f] to-[#0e1013] border border-emerald-500/40 shadow-[0_0_35px_-5px_rgba(34,197,94,0.35)] transition-all duration-300 group-hover:shadow-[0_0_45px_0px_rgba(34,197,94,0.55)] group-hover:border-emerald-400/60 animate-scale-bounce"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-12 h-12 md:w-14 md:h-14 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle perimeter circular guide track */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="rgba(34, 197, 94, 0.15)"
            strokeWidth="3.5"
          />

          {/* Self-drawing circle path */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#22c55e"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="animate-circle-draw"
            style={{
              transformOrigin: '50% 50%',
              transform: 'rotate(-90deg)',
            }}
          />

          {/* Self-drawing checkmark path */}
          <path
            d="M29 51.5 L43 65.5 L71 36.5"
            stroke="#22c55e"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-stroke-draw"
          />
        </svg>

        {/* Floating tiny sparkle indicator */}
        <span
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e] animate-ping opacity-75"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
