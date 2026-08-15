'use client';

import styled from 'styled-components';
import { toneBg, toneFg, type Tone } from '@/components/basic/tone';

/** Layout primitives for the body of a shutter panel. Shared by every section
 *  so opened details read the same regardless of what was clicked. */

/** Top row of chips (type tag, status, date). */
export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
`;

export const DetailTag = styled.span<{ $tone: Tone }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 6px;
  background: ${p => toneBg(p.theme, p.$tone)};
  color: ${p => toneFg(p.theme, p.$tone)};
`;

/** Plain coloured label, e.g. a status word next to the tag. */
export const DetailStatus = styled.span<{ $tone: Tone }>`
  font-size: 0.72rem;
  font-weight: 600;
  color: ${p => toneFg(p.theme, p.$tone)};
`;

export const DetailMeta = styled.span`
  font-size: 0.72rem;
  color: ${p => p.theme.colors.textMuted};
`;

export const DetailCover = styled.img`
  width: 100%;
  max-height: 260px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 16px;
  display: block;
`;

/** Accented secondary line — author, issuer, platform. */
export const DetailSubtitle = styled.p`
  font-size: 0.85rem;
  font-weight: 500;
  font-style: italic;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 14px;
`;

export const DetailDivider = styled.hr`
  border: none;
  border-top: 1px solid ${p => p.theme.colors.border};
  margin: 0 0 14px;
`;

export const DetailText = styled.p`
  font-size: 0.86rem;
  line-height: 1.7;
  color: ${p => p.theme.colors.textSub};
`;

/** Section heading inside the panel body, e.g. "Tech stack". */
export const DetailLabel = styled.p`
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.textMuted};
  margin: 18px 0 8px;
`;

export const DetailTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

/** Row of call-to-action links at the bottom of the panel. */
export const DetailLinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
`;

export const DetailLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${p => p.theme.colors.accent};
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 9px;
  background: ${p => p.theme.colors.accentSubtle};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.75;
  }
`;
