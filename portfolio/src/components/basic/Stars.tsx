'use client';

import styled from 'styled-components';
import { FiStar } from 'react-icons/fi';

const STAR_COLOR = '#f59e0b';

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Star = styled.span<{ $filled: boolean }>`
  display: flex;
  align-items: center;
  color: ${p => (p.$filled ? STAR_COLOR : p.theme.colors.border)};
`;

interface StarsProps {
  count: number;
  total?: number;
  size?: number;
  className?: string;
}

/** Filled/empty star rating. */
export function Stars({ count, total = 5, size = 14, className }: StarsProps) {
  return (
    <Row className={className} title={`${count} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <Star key={i} $filled={i < count}>
          <FiStar size={size} fill={i < count ? STAR_COLOR : 'none'} />
        </Star>
      ))}
    </Row>
  );
}
