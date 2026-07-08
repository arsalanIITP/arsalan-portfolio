export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    bg: string;
    bgAlt: string;
    bgCard: string;
    text: string;
    textSub: string;
    textMuted: string;
    accent: string;
    accentHover: string;
    accentSubtle: string;
    border: string;
    shadow: string;
    navBg: string;
  };
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    bg: '#ffffff',
    bgAlt: '#f8fafc',
    bgCard: '#ffffff',
    text: '#0f172a',
    textSub: '#334155',
    textMuted: '#64748b',
    accent: '#6366f1',
    accentHover: '#4f46e5',
    accentSubtle: '#eef2ff',
    border: '#e2e8f0',
    shadow: '0 4px 24px rgba(0,0,0,0.07)',
    navBg: 'rgba(255,255,255,0.85)',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    bg: '#0f172a',
    bgAlt: '#1e293b',
    bgCard: '#1e293b',
    text: '#f1f5f9',
    textSub: '#cbd5e1',
    textMuted: '#94a3b8',
    accent: '#818cf8',
    accentHover: '#6366f1',
    accentSubtle: '#1e1b4b',
    border: '#334155',
    shadow: '0 4px 24px rgba(0,0,0,0.3)',
    navBg: 'rgba(15,23,42,0.85)',
  },
};
