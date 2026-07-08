'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { Badge } from '@/components/basic/Badge';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import type { PersonalProjectsData } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bgAlt};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: ${p => p.theme.colors.bgCard};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: ${p => p.theme.colors.shadow};

  &:hover {
    border-color: ${p => p.theme.colors.accent}66;
    box-shadow: 0 12px 36px ${p => p.theme.colors.accent}14;
    transform: translateY(-4px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const ProjectName = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  background: ${p =>
    p.$status === 'Active'
      ? p.theme.colors.accentSubtle
      : p.$status === 'In Progress'
      ? 'rgba(245,158,11,0.12)'
      : p.theme.colors.border};
  color: ${p =>
    p.$status === 'Active'
      ? p.theme.colors.accent
      : p.$status === 'In Progress'
      ? '#f59e0b'
      : p.theme.colors.textMuted};
  border: 1px solid ${p =>
    p.$status === 'In Progress' ? 'rgba(245,158,11,0.3)' : 'transparent'};
`;

const Description = styled.p`
  font-size: 0.88rem;
  line-height: 1.75;
  color: ${p => p.theme.colors.textMuted};
  flex: 1;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const LinkRow = styled.div`
  display: flex;
  gap: 16px;
  padding-top: 4px;
`;

const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: ${p => p.theme.colors.accent}; }
`;

export function PersonalProjectsSection({ data }: { data: PersonalProjectsData }) {
  return (
    <Section id="projects">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <Grid>
          {data.items.map(proj => (
            <Card key={proj.name}>
              <CardHeader>
                <ProjectName>{proj.name}</ProjectName>
                {proj.status && (
                  <StatusBadge $status={proj.status}>{proj.status}</StatusBadge>
                )}
              </CardHeader>
              <Description>{proj.description}</Description>
              <TagRow>
                {proj.tags.map(t => <Badge key={t}>{t}</Badge>)}
              </TagRow>
              {(proj.github || proj.live) && (
                <LinkRow>
                  {proj.github && (
                    <IconLink href={proj.github} target="_blank" rel="noopener noreferrer">
                      <FiGithub size={14} /> Source
                    </IconLink>
                  )}
                  {proj.live && (
                    <IconLink href={proj.live} target="_blank" rel="noopener noreferrer">
                      <FiExternalLink size={14} /> Live
                    </IconLink>
                  )}
                </LinkRow>
              )}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
