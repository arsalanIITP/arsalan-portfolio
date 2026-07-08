'use client';

import styled, { css } from 'styled-components';

type Variant = 'primary' | 'outline' | 'ghost';

interface ButtonProps {
  $variant?: Variant;
}

export const Button = styled.a<ButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${theme.colors.accent};
          color: #ffffff;
          border: 2px solid ${theme.colors.accent};
          &:hover {
            background: ${theme.colors.accentHover};
            border-color: ${theme.colors.accentHover};
            transform: translateY(-2px);
            box-shadow: 0 6px 20px ${theme.colors.accent}44;
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${theme.colors.accent};
          border: 2px solid ${theme.colors.accent};
          &:hover {
            background: ${theme.colors.accentSubtle};
            transform: translateY(-2px);
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.textSub};
          border: 2px solid transparent;
          padding: 8px;
          &:hover {
            color: ${theme.colors.accent};
            background: ${theme.colors.accentSubtle};
          }
        `;
    }
  }}
`;
