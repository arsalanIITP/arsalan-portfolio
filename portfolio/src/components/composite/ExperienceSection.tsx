'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { Badge } from '@/components/basic/Badge';
import { FiExternalLink } from 'react-icons/fi';
import type { ExperienceData } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bgAlt};
`;

const TimelineWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 860px;
  margin: 0 auto;
`;

const EntryRow = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 0 20px;
`;

const DotCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Dot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${p => p.theme.colors.accent};
  border: 3px solid ${p => p.theme.colors.bgAlt};
  box-shadow: 0 0 0 2px ${p => p.theme.colors.accent};
  flex-shrink: 0;
  margin-top: 5px;
  z-index: 1;
`;

const Line = styled.div`
  width: 2px;
  flex: 1;
  background: ${p => p.theme.colors.border};
  margin-top: 6px;
  min-height: 24px;
`;

const Content = styled.div<{ $last: boolean }>`
  padding-bottom: ${p => p.$last ? '0' : '52px'};
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const CompanyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CompanyName = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
`;

const CompanyLink = styled.a`
  font-size: 0.8rem;
  color: ${p => p.theme.colors.accent};
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover { opacity: 1; }
`;

const PeriodTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  background: ${p => p.theme.colors.accentSubtle};
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.accent}33;
  white-space: nowrap;
`;

const Role = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${p => p.theme.colors.textSub};
  margin-bottom: 18px;
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ProjectCard = styled.div`
  background: ${p => p.theme.colors.bgCard};
  border: 1px solid ${p => p.theme.colors.border};
  border-left: 3px solid ${p => p.theme.colors.accent}60;
  border-radius: 10px;
  padding: 18px 22px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-left-color: ${p => p.theme.colors.accent};
    box-shadow: 0 4px 20px ${p => p.theme.colors.accent}12;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const ProjectName = styled.h4`
  font-size: 0.92rem;
  font-weight: 700;
  color: ${p => p.theme.colors.text};
`;

const ProjectPeriod = styled.span`
  font-size: 0.76rem;
  color: ${p => p.theme.colors.textMuted};
  white-space: nowrap;
  padding-top: 2px;
`;

const ProjectDesc = styled.p`
  font-size: 0.85rem;
  line-height: 1.75;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 14px;
`;

const ProjectFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const LiveLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${p => p.theme.colors.accent};
  text-decoration: none;
  white-space: nowrap;
  opacity: 0.8;
  transition: opacity 0.2s;
  flex-shrink: 0;
  &:hover { opacity: 1; }
`;

export function ExperienceSection({ data }: { data: ExperienceData }) {
  return (
    <Section id="experience">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <TimelineWrap>
          {data.items.map((item, idx) => {
            const isLast = idx === data.items.length - 1;
            return (
              <EntryRow key={item.company}>
                <DotCol>
                  <Dot />
                  {!isLast && <Line />}
                </DotCol>
                <Content $last={isLast}>
                  <CompanyHeader>
                    <CompanyRow>
                      <CompanyName>{item.company}</CompanyName>
                      {item.url && (
                        <CompanyLink href={item.url} target="_blank" rel="noopener noreferrer">
                          ↗
                        </CompanyLink>
                      )}
                    </CompanyRow>
                    <PeriodTag>{item.period}</PeriodTag>
                  </CompanyHeader>
                  <Role>{item.role}</Role>
                  <ProjectList>
                    {item.projects.map(proj => (
                      <ProjectCard key={proj.name}>
                        <ProjectHeader>
                          <ProjectName>{proj.name}</ProjectName>
                          <ProjectPeriod>{proj.period}</ProjectPeriod>
                        </ProjectHeader>
                        <ProjectDesc>{proj.description}</ProjectDesc>
                        <ProjectFooter>
                          <TagRow>
                            {proj.tags.map(t => <Badge key={t}>{t}</Badge>)}
                          </TagRow>
                          {proj.live && (
                            <LiveLink href={proj.live} target="_blank" rel="noopener noreferrer">
                              <FiExternalLink size={13} /> Visit
                            </LiveLink>
                          )}
                        </ProjectFooter>
                      </ProjectCard>
                    ))}
                  </ProjectList>
                </Content>
              </EntryRow>
            );
          })}
        </TimelineWrap>
      </Container>
    </Section>
  );
}
