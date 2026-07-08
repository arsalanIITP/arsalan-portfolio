'use client';

import styled from 'styled-components';
import { Badge } from '@/components/basic/Badge';
import { FiGithub, FiExternalLink, FiBriefcase } from 'react-icons/fi';
import type { Project } from '@/types/builder';

const Card = styled.div`
  background: ${p => p.theme.colors.bgCard};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
  box-shadow: ${p => p.theme.colors.shadow};

  &:hover {
    transform: translateY(-6px);
    border-color: ${p => p.theme.colors.accent};
    box-shadow: 0 16px 48px ${p =>
      p.theme.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.12)'};
  }
`;

const ImageArea = styled.div`
  height: 140px;
  background: linear-gradient(
    135deg,
    ${p => p.theme.colors.accentSubtle},
    ${p => p.theme.colors.bgAlt}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.colors.accent};
  opacity: 0.8;
`;

const Body = styled.div`
  padding: 22px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
  margin-bottom: 10px;
  line-height: 1.4;
`;

const Desc = styled.p`
  font-size: 0.88rem;
  line-height: 1.75;
  color: ${p => p.theme.colors.textMuted};
  flex: 1;
  margin-bottom: 16px;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
`;

const LinkRow = styled.div`
  display: flex;
  gap: 16px;
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${p => p.theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover { color: ${p => p.theme.colors.accent}; }
`;

export function ProjectCard({ project }: { project: Project }) {
  const hasGithub = Boolean(project.github);
  const hasLive   = Boolean(project.live);

  return (
    <Card>
      <ImageArea>
        <FiBriefcase size={36} />
      </ImageArea>
      <Body>
        <Title>{project.name}</Title>
        <Desc>{project.description}</Desc>
        <TagRow>
          {project.tags.map(t => <Badge key={t}>{t}</Badge>)}
        </TagRow>
        {(hasGithub || hasLive) && (
          <LinkRow>
            {hasGithub && (
              <IconLink href={project.github} target="_blank" rel="noopener noreferrer">
                <FiGithub size={14} /> Source
              </IconLink>
            )}
            {hasLive && (
              <IconLink href={project.live} target="_blank" rel="noopener noreferrer">
                <FiExternalLink size={14} /> Visit
              </IconLink>
            )}
          </LinkRow>
        )}
      </Body>
    </Card>
  );
}
