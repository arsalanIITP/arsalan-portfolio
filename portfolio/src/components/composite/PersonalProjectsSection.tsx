'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { Badge } from '@/components/basic/Badge';
import { ShutterList, ShutterRow, StatusDot } from '@/components/basic/ShutterList';
import {
  DetailHeader, DetailTag, DetailDivider, DetailText,
  DetailLabel, DetailTagRow, DetailLinkRow, DetailLink,
} from '@/components/basic/ShutterDetail';
import type { Tone } from '@/components/basic/tone';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import type { PersonalProjectsData, PersonalProject } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bgAlt};
`;

const statusTone = (status?: string): Tone =>
  status === 'Active' ? 'success' : status === 'In Progress' ? 'warn' : 'muted';

function ProjectDetail({ proj }: { proj: PersonalProject }) {
  return (
    <div>
      {proj.status && (
        <DetailHeader>
          <DetailTag $tone={statusTone(proj.status)}>{proj.status}</DetailTag>
        </DetailHeader>
      )}
      <DetailDivider />
      <DetailText>{proj.description}</DetailText>

      {proj.tags.length > 0 && (
        <>
          <DetailLabel>Tech stack</DetailLabel>
          <DetailTagRow>
            {proj.tags.map(t => <Badge key={t}>{t}</Badge>)}
          </DetailTagRow>
        </>
      )}

      {(proj.github || proj.live) && (
        <DetailLinkRow>
          {proj.github && (
            <DetailLink href={proj.github} target="_blank" rel="noopener noreferrer">
              <FiGithub size={12} /> Source
            </DetailLink>
          )}
          {proj.live && (
            <DetailLink href={proj.live} target="_blank" rel="noopener noreferrer">
              <FiExternalLink size={12} /> Live
            </DetailLink>
          )}
        </DetailLinkRow>
      )}
    </div>
  );
}

export function PersonalProjectsSection({ data }: { data: PersonalProjectsData }) {
  return (
    <Section id="projects">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <ShutterList>
          {data.items.map((proj, i) => (
            <ShutterRow
              key={proj.name}
              id={`project-${i}`}
              tone={statusTone(proj.status)}
              icon={<FiFolder size={16} />}
              title={proj.name}
              subtitle={proj.tags.join(' · ')}
              tag={proj.status}
              meta={proj.status ? <StatusDot $tone={statusTone(proj.status)} title={proj.status} /> : undefined}
              content={<ProjectDetail proj={proj} />}
            />
          ))}
        </ShutterList>
      </Container>
    </Section>
  );
}
