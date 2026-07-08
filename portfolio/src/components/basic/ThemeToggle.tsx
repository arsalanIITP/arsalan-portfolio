'use client';

import styled from 'styled-components';
import { useThemeMode } from '@/contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const Btn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.theme.colors.accentSubtle};
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${p => p.theme.colors.accent};
    color: #ffffff;
    border-color: ${p => p.theme.colors.accent};
  }
`;

export function ThemeToggle() {
  const { mode, toggle } = useThemeMode();
  return (
    <Btn onClick={toggle} aria-label="Toggle theme">
      {mode === 'light' ? <FiMoon size={17} /> : <FiSun size={17} />}
    </Btn>
  );
}
