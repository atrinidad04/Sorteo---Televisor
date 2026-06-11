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
    name: 'Albert',
    teams: [
      { name: 'Portugal', nameEn: 'Portugal', flag: '🇵🇹', countryCode: 'PT' },
      { name: 'Cuba', nameEn: 'Cuba', flag: '🇨🇺', countryCode: 'CU' },
      { name: 'RD Congo', nameEn: 'DR Congo', flag: '🇨🇩', countryCode: 'CD' },
    ],
  },
  {
    id: 2,
    name: 'Alexander',
    teams: [
      { name: 'Senegal', nameEn: 'Senegal', flag: '🇸🇳', countryCode: 'SN' },
      { name: 'Australia', nameEn: 'Australia', flag: '🇦🇺', countryCode: 'AU' },
      { name: 'Austria', nameEn: 'Austria', flag: '🇦🇹', countryCode: 'AT' },
    ],
  },
  {
    id: 3,
    name: 'Betzaler',
    teams: [
      { name: 'Canadá', nameEn: 'Canada', flag: '🇨🇦', countryCode: 'CA' },
      { name: 'España', nameEn: 'Spain', flag: '🇪🇸', countryCode: 'ES' },
      { name: 'Inglaterra', nameEn: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', countryCode: 'GB-ENG' },
    ],
  },
  {
    id: 4,
    name: 'César',
    teams: [
      { name: 'Marruecos', nameEn: 'Morocco', flag: '🇲🇦', countryCode: 'MA' },
      { name: 'Cabo Verde', nameEn: 'Cape Verde', flag: '🇨🇻', countryCode: 'CV' },
      { name: 'Bélgica', nameEn: 'Belgium', flag: '🇧🇪', countryCode: 'BE' },
    ],
  },
  {
    id: 5,
    name: 'Chantal R',
    teams: [
      { name: 'Uruguay', nameEn: 'Uruguay', flag: '🇺🇾', countryCode: 'UY' },
      { name: 'Argentina', nameEn: 'Argentina', flag: '🇦🇷', countryCode: 'AR' },
      { name: 'Curazao', nameEn: 'Curacao', flag: '🇨🇼', countryCode: 'CW' },
    ],
  },
  {
    id: 6,
    name: 'Daniel',
    teams: [
      { name: 'México', nameEn: 'Mexico', flag: '🇲🇽', countryCode: 'MX' },
      { name: 'Tokio', nameEn: 'Togo', flag: '🇹🇬', countryCode: 'TG' },
      { name: 'Egipto', nameEn: 'Egypt', flag: '🇪🇬', countryCode: 'EG' },
    ],
  },
  {
    id: 7,
    name: 'Félix',
    teams: [
      { name: 'Uzbekistán', nameEn: 'Uzbekistan', flag: '🇺🇿', countryCode: 'UZ' },
      { name: 'Brasil', nameEn: 'Brazil', flag: '🇧🇷', countryCode: 'BR' },
      { name: 'Sudáfrica', nameEn: 'South Africa', flag: '🇿🇦', countryCode: 'ZA' },
    ],
  },
  {
    id: 8,
    name: 'Gabriel',
    teams: [
      { name: 'Rumania', nameEn: 'Romania', flag: '🇷🇴', countryCode: 'RO' },
      { name: 'Ecuador', nameEn: 'Ecuador', flag: '🇪🇨', countryCode: 'EC' },
      { name: 'Croacia', nameEn: 'Croatia', flag: '🇭🇷', countryCode: 'HR' },
    ],
  },
  {
    id: 9,
    name: 'Humberto',
    teams: [
      { name: 'Francia', nameEn: 'France', flag: '🇫🇷', countryCode: 'FR' },
      { name: 'Arabia Saudí', nameEn: 'Saudi Arabia', flag: '🇸🇦', countryCode: 'SA' },
      { name: 'Ghana', nameEn: 'Ghana', flag: '🇬🇭', countryCode: 'GH' },
    ],
  },
  {
    id: 10,
    name: 'Isabel',
    teams: [
      { name: 'Túnez', nameEn: 'Tunisia', flag: '🇹🇳', countryCode: 'TN' },
      { name: 'Noruega', nameEn: 'Norway', flag: '🇳🇴', countryCode: 'NO' },
      { name: 'Irak', nameEn: 'Iraq', flag: '🇮🇶', countryCode: 'IQ' },
    ],
  },
  {
    id: 11,
    name: 'Joel',
    teams: [
      { name: 'Nueva Zelanda', nameEn: 'New Zealand', flag: '🇳🇿', countryCode: 'NZ' },
      { name: 'Corea del Sur', nameEn: 'South Korea', flag: '🇰🇷', countryCode: 'KR' },
      { name: 'Colombia', nameEn: 'Colombia', flag: '🇨🇴', countryCode: 'CO' },
    ],
  },
  {
    id: 12,
    name: 'Luis',
    teams: [
      { name: 'Alemania', nameEn: 'Germany', flag: '🇩🇪', countryCode: 'DE' },
      { name: 'Suiza', nameEn: 'Switzerland', flag: '🇨🇭', countryCode: 'CH' },
      { name: 'Rep. Checa', nameEn: 'Czech Republic', flag: '🇨🇿', countryCode: 'CZ' },
    ],
  },
  {
    id: 13,
    name: 'Mabel',
    teams: [
      { name: 'España', nameEn: 'Spain', flag: '🇪🇸', countryCode: 'ES' },
      { name: 'Bélgica', nameEn: 'Belgium', flag: '🇧🇪', countryCode: 'BE' },
      { name: 'Paraguay', nameEn: 'Paraguay', flag: '🇵🇾', countryCode: 'PY' },
    ],
  },
  {
    id: 14,
    name: 'Pedro',
    teams: [
      { name: 'Estados Unidos', nameEn: 'United States', flag: '🇺🇸', countryCode: 'US' },
      { name: 'Países Bajos', nameEn: 'Netherlands', flag: '🇳🇱', countryCode: 'NL' },
      { name: 'Panamá', nameEn: 'Panama', flag: '🇵🇦', countryCode: 'PA' },
    ],
  },
  {
    id: 15,
    name: 'Ricardo',
    teams: [
      { name: 'Jordania', nameEn: 'Jordan', flag: '🇯🇴', countryCode: 'JO' },
      { name: 'Eslovenia', nameEn: 'Slovenia', flag: '🇸🇮', countryCode: 'SI' },
      { name: 'Irán', nameEn: 'Iran', flag: '🇮🇷', countryCode: 'IR' },
    ],
  },
  {
    id: 16,
    name: 'Sugeiry',
    teams: [
      { name: 'Turquía', nameEn: 'Turkey', flag: '🇹🇷', countryCode: 'TR' },
      { name: 'Costa de Marfil', nameEn: "Ivory Coast", flag: '🇨🇮', countryCode: 'CI' },
      { name: 'Bosnia', nameEn: 'Bosnia and Herzegovina', flag: '🇧🇦', countryCode: 'BA' },
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
