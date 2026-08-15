'use client';

import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { ShutterList, ShutterRow, RowMeta } from '@/components/basic/ShutterList';
import {
  DetailHeader, DetailTag, DetailMeta, DetailDivider,
  DetailText, DetailLinkRow, DetailLink,
} from '@/components/basic/ShutterDetail';
import { FiEdit3, FiExternalLink } from 'react-icons/fi';
import type { Tone } from '@/components/basic/tone';
import type { BlogData, BlogPost } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bg};
`;

/** The publishing platform is the meaningful axis here, so it drives the
 *  tag and colour rather than a constant "Article" label on every row. */
const platformTone = (platform: string): Tone =>
  platform === 'Medium' ? 'warn' : 'accent';

function BlogDetail({ item }: { item: BlogPost }) {
  return (
    <div>
      <DetailHeader>
        <DetailTag $tone={platformTone(item.platform)}>
          <FiEdit3 size={11} />
          {item.platform}
        </DetailTag>
        <DetailMeta>{item.date}</DetailMeta>
      </DetailHeader>
      <DetailDivider />
      <DetailText>
        {item.description ?? `Published on ${item.platform}. Open the article to read the full post.`}
      </DetailText>
      <DetailLinkRow>
        <DetailLink href={item.link} target="_blank" rel="noopener noreferrer">
          <FiExternalLink size={12} /> Read article
        </DetailLink>
      </DetailLinkRow>
    </div>
  );
}

export function BlogSection({ data }: { data: BlogData }) {
  return (
    <Section id="blog">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />
        <ShutterList>
          {data.items.map((item, i) => (
            <ShutterRow
              key={item.link}
              id={`blog-${i}`}
              tone={platformTone(item.platform)}
              icon={<FiEdit3 size={16} />}
              title={item.title}
              tag={item.platform}
              meta={<RowMeta>{item.date}</RowMeta>}
              content={<BlogDetail item={item} />}
            />
          ))}
        </ShutterList>
      </Container>
    </Section>
  );
}
