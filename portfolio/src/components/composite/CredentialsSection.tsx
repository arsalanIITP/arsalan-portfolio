'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { FiAward, FiStar, FiExternalLink } from 'react-icons/fi';
import type { CredentialsData } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 22px;
`;

const Card = styled.div`
  background: ${p => p.theme.colors.bgCard};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: ${p => p.theme.colors.shadow};

  &:hover {
    border-color: ${p => p.theme.colors.accent}66;
    box-shadow: 0 10px 32px ${p => p.theme.colors.accent}12;
    transform: translateY(-3px);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const IconBox = styled.div<{ $isBadge: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${p =>
    p.$isBadge
      ? 'linear-gradient(135deg, #f59e0b22, #f59e0b44)'
      : p.theme.colors.accentSubtle};
  color: ${p => (p.$isBadge ? '#f59e0b' : p.theme.colors.accent)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid ${p => (p.$isBadge ? '#f59e0b33' : p.theme.colors.accent + '22')};
`;

const TypeBadge = styled.span<{ $isBadge: boolean }>`
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  background: ${p =>
    p.$isBadge ? 'rgba(245,158,11,0.12)' : p.theme.colors.accentSubtle};
  color: ${p => (p.$isBadge ? '#f59e0b' : p.theme.colors.accent)};
  border: 1px solid ${p =>
    p.$isBadge ? 'rgba(245,158,11,0.3)' : p.theme.colors.accent + '33'};
`;

const DateText = styled.span`
  font-size: 0.78rem;
  color: ${p => p.theme.colors.textMuted};
  font-weight: 500;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  line-height: 1.4;
`;

const Issuer = styled.p`
  font-size: 0.88rem;
  font-weight: 600;
  color: ${p => p.theme.colors.accent};
`;

const StarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Star = styled.span<{ $filled: boolean }>`
  color: ${p => (p.$filled ? '#f59e0b' : p.theme.colors.border)};
  display: flex;
  align-items: center;
`;

const Description = styled.p`
  font-size: 0.85rem;
  line-height: 1.7;
  color: ${p => p.theme.colors.textMuted};
  flex: 1;
`;

const LinkBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${p => p.theme.colors.accent};
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
  align-self: flex-start;
  &:hover { opacity: 1; }
`;

function Stars({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <StarRow>
      {Array.from({ length: total }).map((_, i) => (
        <Star key={i} $filled={i < count}>
          <FiStar size={14} fill={i < count ? '#f59e0b' : 'none'} />
        </Star>
      ))}
    </StarRow>
  );
}

export function CredentialsSection({ data }: { data: CredentialsData }) {
  return (
    <Section id="credentials">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <Grid>
          {data.items.map(item => {
            const isBadge = item.type === 'Badge';
            const linkLabel = isBadge ? 'View profile' : item.type === 'Certification' ? 'View certificate' : 'Visit institution';
            return (
              <Card key={item.title}>
                <CardTop>
                  <IconBox $isBadge={isBadge}>
                    {isBadge ? <FiStar size={20} /> : <FiAward size={20} />}
                  </IconBox>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <TypeBadge $isBadge={isBadge}>{item.type}</TypeBadge>
                    <DateText>{item.date}</DateText>
                  </div>
                </CardTop>
                <Title>{item.title}</Title>
                <Issuer>{item.issuer}</Issuer>
                {item.stars !== undefined && <Stars count={item.stars} />}
                {item.description && <Description>{item.description}</Description>}
                {item.link && (
                  <LinkBtn href={item.link} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink size={12} /> {linkLabel}
                  </LinkBtn>
                )}
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
