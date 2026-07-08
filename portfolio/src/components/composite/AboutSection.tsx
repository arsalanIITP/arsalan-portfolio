'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { FiCheck } from 'react-icons/fi';
import type { AboutData } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bgAlt};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 72px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const Bio = styled.p`
  font-size: 1.05rem;
  line-height: 1.85;
  color: ${p => p.theme.colors.textSub};
  margin-bottom: 32px;
`;

const HighlightList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.95rem;
  color: ${p => p.theme.colors.textSub};
  line-height: 1.5;
`;

const CheckBubble = styled.span`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${p => p.theme.colors.accentSubtle};
  color: ${p => p.theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const StatCard = styled.div<{ $wide?: boolean }>`
  background: ${p => p.theme.colors.bgCard};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  box-shadow: ${p => p.theme.colors.shadow};
  transition: transform 0.25s ease, border-color 0.25s ease;
  grid-column: ${p => (p.$wide ? '1 / -1' : 'auto')};

  &:hover {
    transform: translateY(-5px);
    border-color: ${p => p.theme.colors.accent};
  }
`;

const StatValue = styled.p`
  font-size: 2.4rem;
  font-weight: 800;
  color: ${p => p.theme.colors.accent};
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`;

const StatLabel = styled.p`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export function AboutSection({ data }: { data: AboutData }) {
  return (
    <Section id="about">
      <Container>
        <Grid>
          <div>
            <SectionTitle title={data.title} subtitle="Get to know me" />
            <Bio>{data.description}</Bio>
            <HighlightList>
              {data.highlights.map((h, i) => (
                <HighlightItem key={i}>
                  <CheckBubble><FiCheck size={12} /></CheckBubble>
                  {h}
                </HighlightItem>
              ))}
            </HighlightList>
          </div>
          <StatsGrid>
            {data.stats.map((s, i) => (
              <StatCard key={i} $wide={i === 0}>
                <StatValue>{s.value}</StatValue>
                <StatLabel>{s.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </Grid>
      </Container>
    </Section>
  );
}
