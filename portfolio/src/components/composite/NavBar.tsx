'use client';

import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ThemeToggle } from '@/components/basic/ThemeToggle';
import {
  FiChevronLeft, FiChevronRight,
  FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiMenu, FiX,
  FiBookOpen, FiFolder, FiAward,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';
import type { NavLink } from '@/types/builder';

const COLLAPSED_W = 68;
const EXPANDED_W  = 240;

const LINK_ICONS: Record<string, IconType> = {
  About:       FiUser,
  Skills:      FiCode,
  Experience:  FiBriefcase,
  Books:       FiBookOpen,
  Projects:    FiFolder,
  Credentials: FiAward,
  Contact:     FiMail,
};

/* ─── Sidebar shell ─────────────────────────────────────────────── */
const Sidebar = styled.nav<{ $open: boolean; $mobileOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${p => p.$open ? `${EXPANDED_W}px` : `${COLLAPSED_W}px`};
  background: ${p => p.theme.colors.navBg};
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-right: 1px solid ${p => p.theme.colors.border};
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  transition: width 0.28s ease;
  z-index: 200;
  overflow: hidden;

  /* Mobile: hidden by default, slides in as overlay */
  @media (max-width: 768px) {
    width: ${EXPANDED_W}px;
    transform: ${p => p.$mobileOpen ? 'translateX(0)' : `translateX(-${EXPANDED_W}px)`};
    transition: transform 0.28s ease;
    box-shadow: ${p => p.$mobileOpen ? '4px 0 24px rgba(0,0,0,0.2)' : 'none'};
  }
`;

/* ─── Mobile backdrop ───────────────────────────────────────────── */
const Backdrop = styled.div<{ $visible: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: ${p => p.$visible ? 'block' : 'none'};
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 190;
  }
`;

/* ─── Mobile hamburger (top-left, outside sidebar) ─────────────── */
const MobileBtn = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 180;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: ${p => p.theme.colors.navBg};
    backdrop-filter: blur(12px);
    border: 1px solid ${p => p.theme.colors.border};
    color: ${p => p.theme.colors.text};
    cursor: pointer;
  }
`;

/* ─── Logo row ──────────────────────────────────────────────────── */
const LogoRow = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${p => p.$open ? 'space-between' : 'center'};
  padding: ${p => p.$open ? `0 16px 20px` : `0 0 20px`};
  border-bottom: 1px solid ${p => p.theme.colors.border};
  margin-bottom: 16px;
  min-height: 52px;
`;

const LogoText = styled.a<{ $visible: boolean }>`
  font-size: 1.3rem;
  font-weight: 800;
  color: ${p => p.theme.colors.accent};
  letter-spacing: -0.03em;
  text-decoration: none;
  white-space: nowrap;
  opacity: ${p => p.$visible ? 1 : 0};
  max-width: ${p => p.$visible ? '160px' : '0'};
  overflow: hidden;
  transition: opacity 0.2s ease 0.05s, max-width 0.28s ease;
`;

const CollapseBtn = styled.button`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.bgCard};
  color: ${p => p.theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${p => p.theme.colors.accent};
    color: #fff;
    border-color: ${p => p.theme.colors.accent};
  }

  @media (max-width: 768px) { display: none; }
`;

/* ─── Nav links ─────────────────────────────────────────────────── */
const LinkList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 10px;
  overflow-y: auto;
`;

const NavLinkEl = styled.a<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px ${p => p.$open ? '14px' : '0'};
  justify-content: ${p => p.$open ? 'flex-start' : 'center'};
  border-radius: 10px;
  text-decoration: none;
  color: ${p => p.theme.colors.textSub};
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: ${p => p.theme.colors.accent};
    background: ${p => p.theme.colors.accentSubtle};
  }

  /* On mobile sidebar is always "expanded" style */
  @media (max-width: 768px) {
    padding: 11px 14px;
    justify-content: flex-start;
  }
`;

const LinkLabel = styled.span<{ $open: boolean }>`
  opacity: ${p => p.$open ? 1 : 0};
  max-width: ${p => p.$open ? '140px' : '0'};
  overflow: hidden;
  transition: opacity 0.18s ease 0.08s, max-width 0.28s ease;

  @media (max-width: 768px) {
    opacity: 1;
    max-width: 140px;
  }
`;

/* ─── Bottom (theme toggle) ─────────────────────────────────────── */
const BottomRow = styled.div<{ $open: boolean }>`
  padding: 16px ${p => p.$open ? '18px' : '0'} 0;
  border-top: 1px solid ${p => p.theme.colors.border};
  display: flex;
  justify-content: ${p => p.$open ? 'flex-start' : 'center'};
  transition: padding 0.28s ease;

  @media (max-width: 768px) {
    padding: 16px 18px 0;
    justify-content: flex-start;
  }
`;

/* ─── Component ─────────────────────────────────────────────────── */
interface NavBarProps {
  logo: string;
  links: NavLink[];
}

export function NavBar({ logo, links }: NavBarProps) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Keep CSS variable in sync for content offset */
  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth <= 768;
      const w = isMobile ? 0 : open ? EXPANDED_W : COLLAPSED_W;
      document.documentElement.style.setProperty('--sidebar-w', `${w}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [open]);

  return (
    <>
      {/* Mobile hamburger */}
      <MobileBtn
        onClick={() => setMobileOpen(o => !o)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </MobileBtn>

      {/* Mobile backdrop */}
      <Backdrop $visible={mobileOpen} onClick={() => setMobileOpen(false)} />

      {/* Sidebar */}
      <Sidebar $open={open} $mobileOpen={mobileOpen}>
        {/* Logo + collapse toggle */}
        <LogoRow $open={open}>
          <LogoText href="#" $visible={open}>{logo}</LogoText>
          <CollapseBtn
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {open ? <FiChevronLeft size={13} /> : <FiChevronRight size={13} />}
          </CollapseBtn>
        </LogoRow>

        {/* Nav links */}
        <LinkList>
          {links.map(l => {
            const Icon = LINK_ICONS[l.label] ?? FiHome;
            return (
              <NavLinkEl
                key={l.label}
                href={l.href}
                $open={open}
                title={!open ? l.label : undefined}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} />
                <LinkLabel $open={open}>{l.label}</LinkLabel>
              </NavLinkEl>
            );
          })}
        </LinkList>

        {/* Theme toggle */}
        <BottomRow $open={open}>
          <ThemeToggle />
        </BottomRow>
      </Sidebar>
    </>
  );
}
