'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { DynamicIcon } from '@/components/basic/IconMap';
import { FiMail } from 'react-icons/fi';
import type { ContactData } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bg};
`;

const Center = styled.div`
  text-align: center;
  max-width: 580px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.accent};
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: ${p => p.theme.colors.text};
  letter-spacing: -0.02em;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.85;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 44px;
`;

const EmailBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  background: ${p => p.theme.colors.accent};
  color: #ffffff;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-bottom: 52px;

  &:hover {
    background: ${p => p.theme.colors.accentHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 28px ${p => p.theme.colors.accent}44;
  }
`;

const Divider = styled.p`
  font-size: 0.85rem;
  color: ${p => p.theme.colors.textMuted};
  margin-bottom: 20px;
`;

const SocialRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
`;

const SocialBtn = styled.a`
  width: 48px;
  height: 48px;
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

export function ContactSection({ data }: { data: ContactData }) {
  return (
    <Section id="contact">
      <Container>
        <Center>
          <Eyebrow>{data.subtitle}</Eyebrow>
          <Title>{data.title}</Title>
          <Description>{data.description}</Description>
          <EmailBtn href={`mailto:${data.email}`}>
            <FiMail size={20} />
            {data.email}
          </EmailBtn>
          <Divider>or find me on</Divider>
          <SocialRow>
            {data.social.map(s => (
              <SocialBtn
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
              >
                <DynamicIcon name={s.icon} size={20} />
              </SocialBtn>
            ))}
          </SocialRow>
        </Center>
      </Container>
    </Section>
  );
}
