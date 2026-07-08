'use client';

import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container } from '@/components/basic/Container';
import { Button } from '@/components/basic/Button';
import { DynamicIcon } from '@/components/basic/IconMap';
import type { HeroData } from '@/types/builder';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${p => p.theme.colors.bg};
  padding-top: 68px;
`;

const Content = styled.div`
  max-width: 700px;
  animation: ${fadeUp} 0.7s ease both;
`;

const Greeting = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 8px;
`;

const Name = styled.h1`
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 16px;
  background: linear-gradient(135deg, ${p => p.theme.colors.text} 40%, ${p => p.theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const RoleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  min-height: 36px;
`;

const RolePrefix = styled.span`
  font-size: 1.15rem;
  font-weight: 500;
  color: ${p => p.theme.colors.textSub};
`;

const RoleText = styled.span<{ $visible: boolean }>`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${p => p.theme.colors.accent};
  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: ${p => (p.$visible ? 'translateY(0)' : 'translateY(-8px)')};
  transition: opacity 0.35s ease, transform 0.35s ease;
  display: inline-block;
`;

const Description = styled.p`
  font-size: 1.08rem;
  line-height: 1.85;
  color: ${p => p.theme.colors.textMuted};
  max-width: 560px;
  margin-bottom: 40px;
`;

const CTARow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  margin-bottom: 52px;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialLink = styled.a`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.colors.textMuted};
  border: 1px solid ${p => p.theme.colors.border};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: ${p => p.theme.colors.accent};
    border-color: ${p => p.theme.colors.accent};
    background: ${p => p.theme.colors.accentSubtle};
    transform: translateY(-3px);
  }
`;

export function HeroSection({ data }: { data: HeroData }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % data.roles.length);
        setVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(id);
  }, [data.roles.length]);

  return (
    <Section id="home">
      <Container>
        <Content>
          <Greeting>{data.greeting}</Greeting>
          <Name>{data.name}</Name>
          <RoleRow>
            <RolePrefix>I&apos;m a</RolePrefix>
            <RoleText $visible={visible}>{data.roles[roleIndex]}</RoleText>
          </RoleRow>
          <Description>{data.description}</Description>
          <CTARow>
            <Button href={data.cta.href} $variant="primary">{data.cta.label}</Button>
            <Button href={data.secondary.href} $variant="outline" target="_blank" rel="noopener noreferrer" download>{data.secondary.label}</Button>
          </CTARow>
          <SocialRow>
            {data.social.map(s => (
              <SocialLink
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
              >
                <DynamicIcon name={s.icon} size={20} />
              </SocialLink>
            ))}
          </SocialRow>
        </Content>
      </Container>
    </Section>
  );
}
