'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';
import { useShutter } from '@/contexts/ShutterContext';

const Trigger = styled.button`
  all: unset;
  display: block;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
`;

interface LinkToShutterProps {
  /** Unique id — clicking the same id again toggles the shutter closed. */
  id: string;
  /** Shown in the shutter's header once opened. */
  shutterTitle?: ReactNode;
  /** Rendered inside the shutter body once opened. */
  content: ReactNode;
  /** The clickable trigger itself (e.g. a row or a plain link). */
  children: ReactNode;
  className?: string;
}

/**
 * A basic building block: wraps arbitrary content and, on click, opens a
 * shared slide-in shutter with the given title/content. Opening another
 * LinkToShutter swaps the shutter's content in place; clicking the same
 * one again (or the shutter's close button) closes it.
 */
export function LinkToShutter({ id, shutterTitle, content, children, className }: LinkToShutterProps) {
  const { activeId, open, close } = useShutter();
  const isActive = activeId === id;

  const handleClick = () => {
    if (isActive) {
      close();
    } else {
      open({ id, title: shutterTitle, content });
    }
  };

  return (
    <Trigger type="button" className={className} onClick={handleClick} aria-expanded={isActive}>
      {children}
    </Trigger>
  );
}
