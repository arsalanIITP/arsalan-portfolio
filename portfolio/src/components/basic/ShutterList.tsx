'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';
import { FiChevronRight } from 'react-icons/fi';
import { LinkToShutter } from '@/components/basic/LinkToShutter';
import { useShutter } from '@/contexts/ShutterContext';
import { toneBg, toneFg, toneDot, type Tone } from '@/components/basic/tone';

/**
 * A compact, vertically-scaling list of entries. Each row opens the shared
 * shutter with its details. Used by every "collection" section so adding many
 * items grows the page linearly instead of into a wall of cards.
 */
export const ShutterList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  background: ${p => p.theme.colors.bgCard};
  box-shadow: ${p => p.theme.colors.shadow};
`;

const RowInner = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  background: ${p => (p.$active ? p.theme.colors.accentSubtle : 'transparent')};
  transition: background 0.16s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${p => p.theme.colors.accentSubtle};
  }
`;

const IconTile = styled.div<{ $tone: Tone }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => toneBg(p.theme, p.$tone)};
  color: ${p => toneFg(p.theme, p.$tone)};
`;

const Main = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;
`;

const TopLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.p`
  font-size: 0.92rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tag = styled.span<{ $tone: Tone }>`
  flex-shrink: 0;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 5px;
  background: ${p => toneBg(p.theme, p.$tone)};
  color: ${p => toneFg(p.theme, p.$tone)};
`;

const Subtitle = styled.p`
  font-size: 0.78rem;
  color: ${p => p.theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const Chevron = styled(FiChevronRight)`
  color: ${p => p.theme.colors.textMuted};
  flex-shrink: 0;
`;

/** Small solid dot for a status indicator on the right of a row. */
export const StatusDot = styled.div<{ $tone: Tone }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${p => toneDot(p.theme, p.$tone)};
`;

/** Muted right-aligned text (dates, platforms) shown before the chevron. */
export const RowMeta = styled.span`
  font-size: 0.75rem;
  color: ${p => p.theme.colors.textMuted};
  white-space: nowrap;

  @media (max-width: 600px) {
    display: none;
  }
`;

interface ShutterRowProps {
  /** Unique across the page — clicking the active row toggles it closed. */
  id: string;
  icon: ReactNode;
  /** Drives the icon tile and tag colours. */
  tone?: Tone;
  title: string;
  subtitle?: string;
  /** Short uppercase type label, e.g. BOOK / PAPER / BADGE. */
  tag?: string;
  /** Extra right-side content (status dot, date) rendered before the chevron. */
  meta?: ReactNode;
  shutterTitle?: ReactNode;
  content: ReactNode;
}

export function ShutterRow({
  id,
  icon,
  tone = 'accent',
  title,
  subtitle,
  tag,
  meta,
  shutterTitle,
  content,
}: ShutterRowProps) {
  const { activeId } = useShutter();

  return (
    <LinkToShutter id={id} shutterTitle={shutterTitle ?? title} content={content}>
      <RowInner $active={activeId === id}>
        <IconTile $tone={tone}>{icon}</IconTile>
        <Main>
          <TopLine>
            <Title>{title}</Title>
            {tag && <Tag $tone={tone}>{tag}</Tag>}
          </TopLine>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Main>
        <Right>
          {meta}
          <Chevron size={16} />
        </Right>
      </RowInner>
    </LinkToShutter>
  );
}
