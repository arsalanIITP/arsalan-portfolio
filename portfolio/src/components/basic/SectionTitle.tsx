'use client';

import styled from 'styled-components';

const Wrapper = styled.div<{ $center?: boolean }>`
  margin-bottom: 56px;
  text-align: ${p => p.$center ? 'center' : 'left'};
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
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionTitle({ title, subtitle, center }: SectionTitleProps) {
  return (
    <Wrapper $center={center}>
      {subtitle && <Eyebrow>{subtitle}</Eyebrow>}
      <Title>{title}</Title>
    </Wrapper>
  );
}
