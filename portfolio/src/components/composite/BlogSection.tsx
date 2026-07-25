'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { FiEdit3, FiExternalLink } from 'react-icons/fi';
import type { BlogData } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 22px;
`;

const Card = styled.a`
  background: ${p => p.theme.colors.bgCard};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
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

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${p => p.theme.colors.accentSubtle};
  color: ${p => p.theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid ${p => p.theme.colors.accent}22;
`;

const PlatformBadge = styled.span`
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  background: ${p => p.theme.colors.accentSubtle};
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.accent}33;
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

const Description = styled.p`
  font-size: 0.85rem;
  line-height: 1.7;
  color: ${p => p.theme.colors.textMuted};
  flex: 1;
`;

const ReadMore = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${p => p.theme.colors.accent};
  opacity: 0.8;
  align-self: flex-start;

  ${Card}:hover & {
    opacity: 1;
  }
`;

export function BlogSection({ data }: { data: BlogData }) {
  return (
    <Section id="blog">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <Grid>
          {data.items.map(item => (
            <Card key={item.link} href={item.link} target="_blank" rel="noopener noreferrer">
              <CardTop>
                <IconBox>
                  <FiEdit3 size={20} />
                </IconBox>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <PlatformBadge>{item.platform}</PlatformBadge>
                  <DateText>{item.date}</DateText>
                </div>
              </CardTop>
              <Title>{item.title}</Title>
              {item.description && <Description>{item.description}</Description>}
              <ReadMore>
                <FiExternalLink size={12} /> Read article
              </ReadMore>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
