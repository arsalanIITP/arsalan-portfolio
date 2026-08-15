import type { Theme } from '@/styles/theme';

/**
 * Semantic colour roles shared by the shutter-list sections. Keeping these in
 * one place means Books / Blog / Projects / Credentials differentiate their
 * entry types with the same visual language.
 */
export type Tone = 'accent' | 'warn' | 'success' | 'muted';

const WARN = '#f59e0b';
const SUCCESS = '#22c55e';

/** Foreground (icon + label) colour. */
export function toneFg(theme: Theme, tone: Tone): string {
  switch (tone) {
    case 'warn':
      return theme.mode === 'light' ? '#b45309' : '#fbbf24';
    case 'success':
      return theme.mode === 'light' ? '#15803d' : '#4ade80';
    case 'muted':
      return theme.colors.textMuted;
    default:
      return theme.colors.accent;
  }
}

/** Tinted background for chips and icon tiles. */
export function toneBg(theme: Theme, tone: Tone): string {
  switch (tone) {
    case 'warn':
      return `${WARN}22`;
    case 'success':
      return `${SUCCESS}22`;
    case 'muted':
      return theme.colors.bgAlt;
    default:
      return theme.colors.accentSubtle;
  }
}

/** Solid dot colour used for status indicators. */
export function toneDot(theme: Theme, tone: Tone): string {
  switch (tone) {
    case 'warn':
      return WARN;
    case 'success':
      return SUCCESS;
    case 'muted':
      return '#94a3b8';
    default:
      return theme.colors.accent;
  }
}
