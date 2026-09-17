import React from 'react';

/**
 * Cosmatica's signature ornamental motif — a single hand-drawn paisley line,
 * used sparingly (hero, section dividers) as the one recurring visual signature.
 * Purely decorative: aria-hidden, never carries content.
 */
const OrnamentalMotif = ({ className = '', flip = false, style = {} }) => (
  <svg
    viewBox="0 0 200 260"
    className={className}
    style={flip ? { transform: 'scaleX(-1)', ...style } : style}
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M100 8 C46 8 22 64 38 116 C50 154 88 162 96 198 C102 224 82 240 56 234 C78 251 118 250 132 224 C150 190 120 172 108 142 C96 112 138 100 150 68 C162 32 142 8 100 8 Z"
      stroke="var(--c-gold)"
      strokeWidth="1.4"
      opacity="0.55"
    />
    <path
      d="M100 38 C77 44 66 74 79 98 C89 116 106 121 109 139"
      stroke="var(--c-gold)"
      strokeWidth="1"
      opacity="0.4"
    />
    <path
      d="M92 60 C84 66 82 78 90 86"
      stroke="var(--c-gold)"
      strokeWidth="0.8"
      opacity="0.35"
    />
    <circle cx="100" cy="22" r="2.5" fill="var(--c-gold)" opacity="0.6" />
    <circle cx="122" cy="46" r="1.5" fill="var(--c-gold)" opacity="0.4" />
    <circle cx="68" cy="52" r="1.5" fill="var(--c-gold)" opacity="0.4" />
  </svg>
);

export default OrnamentalMotif;
