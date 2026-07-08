'use client';

import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { NavBar } from '@/components/composite/NavBar';
import { HeroSection } from '@/components/composite/HeroSection';
import { AboutSection } from '@/components/composite/AboutSection';
import { SkillsSection } from '@/components/composite/SkillsSection';
import { ExperienceSection } from '@/components/composite/ExperienceSection';
import { BooksSection } from '@/components/composite/BooksSection';
import { PersonalProjectsSection } from '@/components/composite/PersonalProjectsSection';
import { CredentialsSection } from '@/components/composite/CredentialsSection';
import { ContactSection } from '@/components/composite/ContactSection';
import { Footer } from '@/components/composite/Footer';
import type { BuilderData } from '@/types/builder';

const GlobalStyle = createGlobalStyle`
  :root { --sidebar-w: 240px; }
  body {
    background: ${p => p.theme.colors.bg};
    color: ${p => p.theme.colors.text};
    transition: background 0.3s ease, color 0.3s ease;
  }
`;

/* Shifts content right by sidebar width; synced via CSS variable */
const PageWrapper = styled.div`
  margin-left: var(--sidebar-w, 240px);
  transition: margin-left 0.28s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

function PortfolioInner({ data }: { data: BuilderData }) {
  return (
    <>
      <GlobalStyle />
      <NavBar logo={data.nav.logo} links={data.nav.links} />
      <PageWrapper>
        <main>
          <HeroSection data={data.hero} />
          <AboutSection data={data.about} />
          <SkillsSection data={data.skills} />
          <ExperienceSection data={data.experience} />
          <BooksSection data={data.books} />
          <PersonalProjectsSection data={data.personalProjects} />
          <CredentialsSection data={data.credentials} />
          <ContactSection data={data.contact} />
        </main>
        <Footer text={data.footer.text} year={data.footer.year} />
      </PageWrapper>
    </>
  );
}

export default function Portfolio({ data }: { data: BuilderData }) {
  return (
    <ThemeContextProvider>
      <PortfolioInner data={data} />
    </ThemeContextProvider>
  );
}
