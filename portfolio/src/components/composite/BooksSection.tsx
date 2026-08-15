'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { ShutterList, ShutterRow, StatusDot } from '@/components/basic/ShutterList';
import {
  DetailHeader, DetailTag, DetailStatus, DetailCover, DetailSubtitle,
  DetailDivider, DetailText, DetailLinkRow, DetailLink,
} from '@/components/basic/ShutterDetail';
import type { Tone } from '@/components/basic/tone';
import { FiExternalLink, FiBookOpen, FiFileText } from 'react-icons/fi';
import type { BooksData, BookEntry } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bg};
`;

/** Papers are amber, books use the accent — a consistent type signal. */
const entryTone = (item: BookEntry): Tone => (item.category === 'Paper' ? 'warn' : 'accent');

const statusTone = (status: string): Tone =>
  status === 'Read' ? 'success' : status === 'Reading' ? 'warn' : 'muted';

function BookDetail({ item }: { item: BookEntry }) {
  const [imgError, setImgError] = useState(false);
  const isPaper = item.category === 'Paper';
  const showImg = !!(item.image && !imgError);

  return (
    <div>
      {showImg && (
        <DetailCover src={item.image} alt={item.title} onError={() => setImgError(true)} />
      )}
      <DetailHeader>
        <DetailTag $tone={entryTone(item)}>
          {isPaper ? <FiFileText size={11} /> : <FiBookOpen size={11} />}
          {item.category}
        </DetailTag>
        <DetailStatus $tone={statusTone(item.status)}>{item.status}</DetailStatus>
      </DetailHeader>
      <DetailSubtitle>{item.author}</DetailSubtitle>
      <DetailDivider />
      <DetailText>{item.description}</DetailText>
      {item.link && (
        <DetailLinkRow>
          <DetailLink href={item.link} target="_blank" rel="noopener noreferrer">
            <FiExternalLink size={12} /> {isPaper ? 'Read paper' : 'View book'}
          </DetailLink>
        </DetailLinkRow>
      )}
    </div>
  );
}

export function BooksSection({ data }: { data: BooksData }) {
  return (
    <Section id="books">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <ShutterList>
          {data.items.map((item, i) => (
            <ShutterRow
              key={item.title}
              id={`book-${i}`}
              tone={entryTone(item)}
              icon={item.category === 'Paper' ? <FiFileText size={16} /> : <FiBookOpen size={16} />}
              title={item.title}
              subtitle={item.author}
              tag={item.category}
              meta={<StatusDot $tone={statusTone(item.status)} title={item.status} />}
              content={<BookDetail item={item} />}
            />
          ))}
        </ShutterList>
      </Container>
    </Section>
  );
}
