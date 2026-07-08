'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';

const FooterEl = styled.footer`
  padding: 28px 0;
  background: ${p => p.theme.colors.bgAlt};
  border-top: 1px solid ${p => p.theme.colors.border};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Text = styled.p`
  font-size: 0.875rem;
  color: ${p => p.theme.colors.textMuted};
`;

const AccentSpan = styled.span`
  color: ${p => p.theme.colors.accent};
  font-weight: 600;
`;

interface FooterProps {
  text: string;
  year: string;
}

export function Footer({ text, year }: FooterProps) {
  return (
    <FooterEl>
      <Container>
        <Inner>
          <Text>{text}</Text>
          <Text>© <AccentSpan>{year}</AccentSpan> — All rights reserved</Text>
        </Inner>
      </Container>
    </FooterEl>
  );
}
