// ============================================================
// PARTICIPANTS DATA — Sorteo Mundial 2026
// ============================================================
// Team names must match TheSportsDB team names for proper lookup

export interface TeamEntry {
  name: string;          // Display name (Spanish)
  nameEn: string;        // English name for API lookup
  flag: string;          // Flag emoji fallback
  countryCode: string;   // ISO 3166-1 alpha-2
}

export interface Participant {
  id: number;
  name: string;
  teams: TeamEntry[];
}

export const PARTICIPANTS: Participant[] = [
  {
    id: 1,
    name: 'Chantal R',
    teams: [
      { name: 'Uruguay', nameEn: 'Uruguay', flag: '🇺🇾', countryCode: 'UY' },
      { name: 'Argentina', nameEn: 'Argentina', flag: '🇦🇷', countryCode: 'AR' },
      { name: 'Curazao', nameEn: 'Curaçao', flag: '🇨🇼', countryCode: 'CW' },
    ],
  },
  {
    id: 2,
    name: 'Joel',
    teams: [
      { name: 'Nueva Zelanda', nameEn: 'New Zealand', flag: '🇳🇿', countryCode: 'NZ' },
      { name: 'Corea del Sur', nameEn: 'South Korea', flag: '🇰🇷', countryCode: 'KR' },
      { name: 'Colombia', nameEn: 'Colombia', flag: '🇨🇴', countryCode: 'CO' },
    ],
  },
  {
    id: 3,
    name: 'Félix',
    teams: [
      { name: 'Uzbekistán', nameEn: 'Uzbekistan', flag: '🇺🇿', countryCode: 'UZ' },
      { name: 'Brasil', nameEn: 'Brazil', flag: '🇧🇷', countryCode: 'BR' },
      { name: 'Sudáfrica', nameEn: 'South Africa', flag: '🇿🇦', countryCode: 'ZA' },
    ],
  },
  {
    id: 4,
    name: 'Alexander',
    teams: [
      { name: 'Senegal', nameEn: 'Senegal', flag: '🇸🇳', countryCode: 'SN' },
      { name: 'Australia', nameEn: 'Australia', flag: '🇦🇺', countryCode: 'AU' },
      { name: 'Austria', nameEn: 'Austria', flag: '🇦🇹', countryCode: 'AT' },
    ],
  },
  {
    id: 5,
    name: 'Daniel',
    teams: [
      { name: 'México', nameEn: 'Mexico', flag: '🇲🇽', countryCode: 'MX' },
      { name: 'Suecia', nameEn: 'Sweden', flag: '🇸🇪', countryCode: 'SE' },
      { name: 'Egipto', nameEn: 'Egypt', flag: '🇪🇬', countryCode: 'EG' },
    ],
  },
  {
    id: 6,
    name: 'Pedro',
    teams: [
      { name: 'Estados Unidos', nameEn: 'USA', flag: '🇺🇸', countryCode: 'US' },
      { name: 'Países Bajos', nameEn: 'Netherlands', flag: '🇳🇱', countryCode: 'NL' },
      { name: 'Panamá', nameEn: 'Panama', flag: '🇵🇦', countryCode: 'PA' },
    ],
  },
  {
    id: 7,
    name: 'Luis',
    teams: [
      { name: 'Alemania', nameEn: 'Germany', flag: '🇩🇪', countryCode: 'DE' },
      { name: 'Suiza', nameEn: 'Switzerland', flag: '🇨🇭', countryCode: 'CH' },
      { name: 'República Checa', nameEn: 'Czech Republic', flag: '🇨🇿', countryCode: 'CZ' },
    ],
  },
  {
    id: 8,
    name: 'César',
    teams: [
      { name: 'Marruecos', nameEn: 'Morocco', flag: '🇲🇦', countryCode: 'MA' },
      { name: 'Cabo Verde', nameEn: 'Cape Verde', flag: '🇨🇻', countryCode: 'CV' },
      { name: 'Irak', nameEn: 'Iraq', flag: '🇮🇶', countryCode: 'IQ' },
    ],
  },
  {
    id: 9,
    name: 'Mabel',
    teams: [
      { name: 'Argelia', nameEn: 'Algeria', flag: '🇩🇿', countryCode: 'DZ' },
      { name: 'Bélgica', nameEn: 'Belgium', flag: '🇧🇪', countryCode: 'BE' },
      { name: 'Paraguay', nameEn: 'Paraguay', flag: '🇵🇾', countryCode: 'PY' },
    ],
  },
  {
    id: 10,
    name: 'Humberto',
    teams: [
      { name: 'Francia', nameEn: 'France', flag: '🇫🇷', countryCode: 'FR' },
      { name: 'Arabia Saudita', nameEn: 'Saudi Arabia', flag: '🇸🇦', countryCode: 'SA' },
      { name: 'Ghana', nameEn: 'Ghana', flag: '🇬🇭', countryCode: 'GH' },
    ],
  },
  {
    id: 11,
    name: 'Gabriel',
    teams: [
      { name: 'Escocia', nameEn: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', countryCode: 'GB-SCT' },
      { name: 'Ecuador', nameEn: 'Ecuador', flag: '🇪🇨', countryCode: 'EC' },
      { name: 'Croacia', nameEn: 'Croatia', flag: '🇭🇷', countryCode: 'HR' },
    ],
  },
  {
    id: 12,
    name: 'Sugeiry',
    teams: [
      { name: 'Turquía', nameEn: 'Turkey', flag: '🇹🇷', countryCode: 'TR' },
      { name: 'Costa de Marfil', nameEn: 'Ivory Coast', flag: '🇨🇮', countryCode: 'CI' },
      { name: 'Bosnia y Herzegovina', nameEn: 'Bosnia-Herzegovina', flag: '🇧🇦', countryCode: 'BA' },
    ],
  },
  {
    id: 13,
    name: 'Ricardo',
    teams: [
      { name: 'Jordania', nameEn: 'Jordan', flag: '🇯🇴', countryCode: 'JO' },
      { name: 'España', nameEn: 'Spain', flag: '🇪🇸', countryCode: 'ES' },
      { name: 'Irán', nameEn: 'Iran', flag: '🇮🇷', countryCode: 'IR' },
    ],
  },
  {
    id: 14,
    name: 'Betzaler',
    teams: [
      { name: 'Canadá', nameEn: 'Canada', flag: '🇨🇦', countryCode: 'CA' },
      { name: 'Japón', nameEn: 'Japan', flag: '🇯🇵', countryCode: 'JP' },
      { name: 'Inglaterra', nameEn: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', countryCode: 'GB-ENG' },
    ],
  },
  {
    id: 15,
    name: 'Albert',
    teams: [
      { name: 'Portugal', nameEn: 'Portugal', flag: '🇵🇹', countryCode: 'PT' },
      { name: 'Catar', nameEn: 'Qatar', flag: '🇶🇦', countryCode: 'QA' },
      { name: 'República del Congo', nameEn: 'Republic of the Congo', flag: '🇨🇬', countryCode: 'CG' },
    ],
  },
  {
    id: 16,
    name: 'Isabel',
    teams: [
      { name: 'Túnez', nameEn: 'Tunisia', flag: '🇹🇳', countryCode: 'TN' },
      { name: 'Noruega', nameEn: 'Norway', flag: '🇳🇴', countryCode: 'NO' },
      { name: 'Haití', nameEn: 'Haiti', flag: '🇭🇹', countryCode: 'HT' },
    ],
  },
];

// Build a fast lookup: englishTeamName (lowercase) -> participant
export function buildTeamOwnerMap(): Map<string, Participant[]> {
  const map = new Map<string, Participant[]>();
  for (const p of PARTICIPANTS) {
    for (const t of p.teams) {
      const key = t.nameEn.toLowerCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
  }
  return map;
}
