'use client';

import {
  FiGithub, FiLinkedin, FiTwitter, FiExternalLink, FiMail,
  FiSun, FiMoon, FiMonitor, FiServer, FiDatabase, FiCloud,
  FiMenu, FiX, FiArrowRight, FiCheck,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';

export const iconMap: Record<string, IconType> = {
  FiGithub, FiLinkedin, FiTwitter, FiExternalLink, FiMail,
  FiSun, FiMoon, FiMonitor, FiServer, FiDatabase, FiCloud,
  FiMenu, FiX, FiArrowRight, FiCheck,
};

export function DynamicIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}
