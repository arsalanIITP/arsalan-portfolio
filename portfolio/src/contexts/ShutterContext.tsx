'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

interface ShutterEntry {
  id: string;
  title?: ReactNode;
  content: ReactNode;
}

interface ShutterContextType {
  activeId: string | null;
  open: (entry: ShutterEntry) => void;
  close: () => void;
}

const ShutterContext = createContext<ShutterContextType>({
  activeId: null,
  open: () => {},
  close: () => {},
});

export const useShutter = () => useContext(ShutterContext);

/* ─── Panel UI ───────────────────────────────────────────────────── */
/* Mobile only: the panel covers most of the screen there, so a tap-to-close
   backdrop makes sense. On desktop it must not exist — the page behind stays
   interactive so clicking another trigger swaps the panel's content. */
const Backdrop = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 490;
    opacity: ${p => (p.$open ? 1 : 0)};
    pointer-events: ${p => (p.$open ? 'auto' : 'none')};
    transition: opacity 0.3s ease;
  }
`;

const Panel = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(460px, 100vw);
  background: ${p => p.theme.colors.bgCard};
  border-left: 1px solid ${p => p.theme.colors.border};
  box-shadow: -12px 0 40px rgba(0, 0, 0, 0.18);
  z-index: 500;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* Fully off-screen when closed, so nothing peeks in at rest. */
  transform: translateX(${p => (p.$open ? '0' : '100%')});
  visibility: ${p => (p.$open ? 'visible' : 'hidden')};
  transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1),
    visibility 0s linear ${p => (p.$open ? '0s' : '0.38s')};

  @media (max-width: 768px) {
    width: min(420px, 92vw);
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 20px 16px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  flex-shrink: 0;
`;

const PanelTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  line-height: 1.4;
`;

const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.bgAlt};
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
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

function ShutterPanel({ entry, open, onClose }: { entry: ShutterEntry | null; open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <>
      <Backdrop $open={open} onClick={onClose} aria-hidden={!open} />
      <Panel $open={open} role="dialog" aria-hidden={!open}>
        <PanelHeader>
          <PanelTitle>{entry?.title}</PanelTitle>
          <CloseBtn onClick={onClose} aria-label="Close">
            <FiX size={16} />
          </CloseBtn>
        </PanelHeader>
        <PanelBody>{entry?.content}</PanelBody>
      </Panel>
    </>
  );
}

/* ─── Provider ───────────────────────────────────────────────────── */
export function ShutterProvider({ children }: { children: ReactNode }) {
  /* `entry` is retained after closing so the panel keeps its content
     while sliding out instead of blanking mid-transition. */
  const [entry, setEntry] = useState<ShutterEntry | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((next: ShutterEntry) => {
    setEntry(next);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ShutterContext.Provider value={{ activeId: isOpen ? entry?.id ?? null : null, open, close }}>
      {children}
      <ShutterPanel entry={entry} open={isOpen} onClose={close} />
    </ShutterContext.Provider>
  );
}
