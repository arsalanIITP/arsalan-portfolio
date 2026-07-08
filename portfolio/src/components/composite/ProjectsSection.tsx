'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { ProjectCard } from './ProjectCard';
import type { ProjectsData } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bgAlt};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
`;

export function ProjectsSection({ data }: { data: ProjectsData }) {
  return (
    <Section id="projects">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <Grid>
          {data.items.map(p => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
