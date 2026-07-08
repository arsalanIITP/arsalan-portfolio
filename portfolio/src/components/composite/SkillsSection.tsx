'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { Badge } from '@/components/basic/Badge';
import { DynamicIcon } from '@/components/basic/IconMap';
import type { SkillsData } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: ${p => p.theme.colors.bgCard};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  padding: 28px;
  transition: all 0.25s ease;
  box-shadow: ${p => p.theme.colors.shadow};

  &:hover {
    border-color: ${p => p.theme.colors.accent};
    transform: translateY(-5px);
    box-shadow: 0 12px 36px ${p => p.theme.colors.accent}20;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${p => p.theme.colors.accentSubtle};
  color: ${p => p.theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CategoryName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export function SkillsSection({ data }: { data: SkillsData }) {
  return (
    <Section id="skills">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <Grid>
          {data.categories.map(cat => (
            <Card key={cat.name}>
              <CardHeader>
                <IconBox><DynamicIcon name={cat.icon} size={20} /></IconBox>
                <CategoryName>{cat.name}</CategoryName>
              </CardHeader>
              <BadgeRow>
                {cat.items.map(item => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </BadgeRow>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
