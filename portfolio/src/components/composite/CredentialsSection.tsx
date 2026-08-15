'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { Stars } from '@/components/basic/Stars';
import { ShutterList, ShutterRow, RowMeta } from '@/components/basic/ShutterList';
import {
  DetailHeader, DetailTag, DetailMeta, DetailSubtitle, DetailDivider,
  DetailText, DetailLabel, DetailLinkRow, DetailLink,
} from '@/components/basic/ShutterDetail';
import type { Tone } from '@/components/basic/tone';
import { FiAward, FiStar, FiExternalLink, FiBookmark } from 'react-icons/fi';
import type { CredentialsData, Credential } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bg};
`;

/** Each credential type gets its own icon + colour so the list is scannable. */
const typeTone = (type: string): Tone =>
  type === 'Badge' ? 'warn' : type === 'Certification' ? 'success' : 'accent';

const typeIcon = (type: string, size: number) =>
  type === 'Badge' ? <FiStar size={size} />
  : type === 'Certification' ? <FiAward size={size} />
  : <FiBookmark size={size} />;

const linkLabel = (type: string) =>
  type === 'Badge' ? 'View profile'
  : type === 'Certification' ? 'View certificate'
  : 'Visit institution';

function CredentialDetail({ item }: { item: Credential }) {
  return (
    <div>
      <DetailHeader>
        <DetailTag $tone={typeTone(item.type)}>
          {typeIcon(item.type, 11)}
          {item.type}
        </DetailTag>
        <DetailMeta>{item.date}</DetailMeta>
      </DetailHeader>
      <DetailSubtitle>{item.issuer}</DetailSubtitle>

      {item.stars !== undefined && (
        <>
          <DetailLabel>Rating</DetailLabel>
          <Stars count={item.stars} />
        </>
      )}

      <DetailDivider />
      {item.description && <DetailText>{item.description}</DetailText>}

      {item.link && (
        <DetailLinkRow>
          <DetailLink href={item.link} target="_blank" rel="noopener noreferrer">
            <FiExternalLink size={12} /> {linkLabel(item.type)}
          </DetailLink>
        </DetailLinkRow>
      )}
    </div>
  );
}

export function CredentialsSection({ data }: { data: CredentialsData }) {
  return (
    <Section id="credentials">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <ShutterList>
          {data.items.map((item, i) => (
            <ShutterRow
              key={item.title}
              id={`credential-${i}`}
              tone={typeTone(item.type)}
              icon={typeIcon(item.type, 16)}
              title={item.title}
              subtitle={item.issuer}
              tag={item.type}
              meta={<RowMeta>{item.date}</RowMeta>}
              content={<CredentialDetail item={item} />}
            />
          ))}
        </ShutterList>
      </Container>
    </Section>
  );
}
