import React from 'react';

interface FlagProps {
  countryCode: string;
  emoji: string;
  size?: number;
  className?: string;
}

/**
 * Renders a country flag using flagcdn.com CDN with emoji fallback.
 * Supports standard ISO 3166-1 alpha-2 codes.
 */
export const Flag: React.FC<FlagProps> = ({ countryCode, emoji, size = 20, className = '' }) => {
  const [imgError, setImgError] = React.useState(false);

  // Normalize special codes
  const normalCode = countryCode
    .split('-')[0]  // handle GB-ENG → GB, etc.
    .toLowerCase()
    .replace(/[^a-z]/g, '');

  // Special overrides for codes not on flagcdn
  const flagOverrides: Record<string, string> = {
    'gbeng': 'gb', // England uses GB flag fallback
    'cd': 'cd',
  };
  const code = flagOverrides[normalCode] ?? normalCode;

  if (imgError || code.length !== 2) {
    return <span className={`flag-emoji ${className}`} style={{ fontSize: size * 0.8 }}>{emoji}</span>;
  }

  return (
    <img
      src={`https://flagcdn.com/${size * 2}x${Math.round(size * 1.5)}/2x/${code}.png`}
      alt={emoji}
      width={size}
      height={Math.round(size * 0.75)}
      className={`flag-img ${className}`}
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};
