'use client';

import styled from 'styled-components';

export const Badge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${p => p.theme.colors.accentSubtle};
  color: ${p => p.theme.colors.accent};
  border: 1px solid ${p => p.theme.colors.accent}33;
`;
