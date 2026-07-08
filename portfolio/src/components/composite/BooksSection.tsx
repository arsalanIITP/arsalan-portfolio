'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { FiExternalLink, FiBookOpen, FiFileText } from 'react-icons/fi';
import type { BooksData, BookEntry } from '@/types/builder';

const CARD_H = 360;

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 22px;
`;

/* ─── Flip shell ─────────────────────────────────────────────── */
const CardOuter = styled.div`
  height: ${CARD_H}px;
  perspective: 1200px;
  cursor: pointer;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1);

  ${CardOuter}:hover & {
    transform: rotateY(180deg);
  }
`;

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid ${p => p.theme.colors.border};
  box-shadow: ${p => p.theme.colors.shadow};
`;

/* ─── Front ──────────────────────────────────────────────────── */
const CardFront = styled(CardFace)``;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

/* ─── Book placeholder (no cover image) ─────────────────────── */
const BookCoverPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(150deg, ${p => p.theme.colors.accent}22 0%, ${p => p.theme.colors.bgAlt} 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 28px 20px;
  text-align: center;
`;

const BookPlaceholderIcon = styled.div`
  color: ${p => p.theme.colors.accent};
  opacity: 0.75;
`;

const BookPlaceholderTitle = styled.p`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  line-height: 1.4;
`;

const BookPlaceholderAuthor = styled.p`
  font-size: 0.72rem;
  color: ${p => p.theme.colors.textMuted};
  font-style: italic;
`;

/* ─── Paper placeholder — academic document style ────────────── */
const PaperFront = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fefcf7;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 27px,
    rgba(0, 0, 0, 0.07) 27px,
    rgba(0, 0, 0, 0.07) 28px
  );
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
`;

const PaperHeader = styled.div`
  height: 5px;
  background: ${p => p.theme.colors.accent};
  flex-shrink: 0;
`;

const PaperBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 18px;
  text-align: center;
`;

const PaperIcon = styled.div`
  color: ${p => p.theme.colors.accent};
  opacity: 0.6;
`;

const PaperLabel = styled.span`
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.accent};
  background: ${p => p.theme.colors.accentSubtle};
  border: 1px solid ${p => p.theme.colors.accent}33;
  padding: 2px 8px;
  border-radius: 4px;
`;

const PaperTitle = styled.p`
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.45;
`;

const PaperAuthor = styled.p`
  font-size: 0.7rem;
  color: #555;
  font-style: italic;
  line-height: 1.4;
`;

const FrontOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, transparent 100%);
  padding: 36px 14px 14px;
`;

const FrontTitle = styled.p`
  font-size: 0.83rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.35;
  margin-bottom: 4px;
`;

const FrontAuthor = styled.p`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.65);
`;

const CornerBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.52);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
`;

const StatusDot = styled.div<{ $status: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.25);
  background: ${p =>
    p.$status === 'Read'
      ? '#22c55e'
      : p.$status === 'Reading'
      ? '#f59e0b'
      : '#94a3b8'};
  box-shadow: 0 0 8px
    ${p =>
      p.$status === 'Read'
        ? '#22c55e90'
        : p.$status === 'Reading'
        ? '#f59e0b90'
        : 'transparent'};
`;

/* ─── Back ───────────────────────────────────────────────────── */
const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background: ${p => p.theme.colors.bgCard};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const BackTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const BackCatBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: ${p => p.theme.colors.accentSubtle};
  color: ${p => p.theme.colors.accent};
`;

const BackStatus = styled.span<{ $status: string }>`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${p =>
    p.$status === 'Read'
      ? '#22c55e'
      : p.$status === 'Reading'
      ? '#f59e0b'
      : p.theme.colors.textMuted};
`;

const BackTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 800;
  color: ${p => p.theme.colors.text};
  line-height: 1.35;
`;

const BackAuthor = styled.p`
  font-size: 0.78rem;
  font-weight: 500;
  font-style: italic;
  color: ${p => p.theme.colors.accent};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${p => p.theme.colors.border};
  margin: 2px 0;
`;

const BackDesc = styled.p`
  font-size: 0.79rem;
  line-height: 1.65;
  color: ${p => p.theme.colors.textSub};
  flex: 1;
  overflow-y: auto;
`;

const LinkBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${p => p.theme.colors.accent};
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 8px;
  background: ${p => p.theme.colors.accentSubtle};
  transition: opacity 0.2s;
  align-self: flex-start;
  flex-shrink: 0;
  &:hover { opacity: 0.75; }
`;

/* ─── Card component ─────────────────────────────────────────── */
function BookCard({ item }: { item: BookEntry }) {
  const [imgError, setImgError] = useState(false);
  const isPaper = item.category === 'Paper';
  const showImg = !!(item.image && !imgError);

  return (
    <CardOuter>
      <CardInner>
        {/* Front */}
        <CardFront>
          {showImg ? (
            <>
              <CoverImg
                src={item.image}
                alt={item.title}
                onError={() => setImgError(true)}
              />
              <FrontOverlay>
                <FrontTitle>{item.title}</FrontTitle>
                <FrontAuthor>{item.author}</FrontAuthor>
              </FrontOverlay>
            </>
          ) : isPaper ? (
            <PaperFront>
              <PaperHeader />
              <PaperBody>
                <PaperLabel>Research Paper</PaperLabel>
                <PaperIcon><FiFileText size={36} /></PaperIcon>
                <PaperTitle>{item.title}</PaperTitle>
                <PaperAuthor>{item.author}</PaperAuthor>
              </PaperBody>
            </PaperFront>
          ) : (
            <BookCoverPlaceholder>
              <BookPlaceholderIcon>
                <FiBookOpen size={44} />
              </BookPlaceholderIcon>
              <BookPlaceholderTitle>{item.title}</BookPlaceholderTitle>
              <BookPlaceholderAuthor>{item.author}</BookPlaceholderAuthor>
            </BookCoverPlaceholder>
          )}
          <CornerBadge>{item.category}</CornerBadge>
          <StatusDot $status={item.status} title={item.status} />
        </CardFront>

        {/* Back */}
        <CardBack>
          <BackTopRow>
            <BackCatBadge>
              {isPaper ? <FiFileText size={10} /> : <FiBookOpen size={10} />}
              {item.category}
            </BackCatBadge>
            <BackStatus $status={item.status}>{item.status}</BackStatus>
          </BackTopRow>
          <BackTitle>{item.title}</BackTitle>
          <BackAuthor>{item.author}</BackAuthor>
          <Divider />
          <BackDesc>{item.description}</BackDesc>
          {item.link && (
            <LinkBtn href={item.link} target="_blank" rel="noopener noreferrer">
              <FiExternalLink size={11} /> Read paper
            </LinkBtn>
          )}
        </CardBack>
      </CardInner>
    </CardOuter>
  );
}

/* ─── Section ────────────────────────────────────────────────── */
export function BooksSection({ data }: { data: BooksData }) {
  return (
    <Section id="books">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <Grid>
          {data.items.map(item => (
            <BookCard key={item.title} item={item} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
