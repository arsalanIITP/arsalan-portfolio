export interface NavLink {
  label: string;
  href: string;
}

export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface HeroData {
  greeting: string;
  name: string;
  roles: string[];
  description: string;
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
  social: Social[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutData {
  title: string;
  description: string;
  highlights: string[];
  stats: Stat[];
}

export interface SkillItem {
  name: string;
  level: number;
  certified?: boolean;
  certificateName?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  items: SkillItem[];
}

export interface SkillsData {
  title: string;
  subtitle: string;
  categories: SkillCategory[];
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  live: string;
  featured: boolean;
}

export interface ProjectsData {
  title: string;
  subtitle: string;
  items: Project[];
}

export interface ExperienceProject {
  name: string;
  period: string;
  description: string;
  tags: string[];
  live?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  url?: string;
  projects: ExperienceProject[];
}

export interface ExperienceData {
  title: string;
  subtitle: string;
  items: ExperienceItem[];
}

export interface BookEntry {
  title: string;
  author: string;
  category: string;
  status: string;
  description: string;
  image?: string;
  link?: string;
}

export interface BooksData {
  title: string;
  subtitle: string;
  items: BookEntry[];
}

export interface BlogPost {
  title: string;
  platform: string;
  date: string;
  link: string;
  description?: string;
}

export interface BlogData {
  title: string;
  subtitle: string;
  items: BlogPost[];
}

export interface PersonalProject {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  status?: string;
}

export interface PersonalProjectsData {
  title: string;
  subtitle: string;
  items: PersonalProject[];
}

export interface Credential {
  title: string;
  issuer: string;
  date: string;
  type: string;
  description?: string;
  link?: string;
  stars?: number;
}

export interface CredentialsData {
  title: string;
  subtitle: string;
  items: Credential[];
}

export interface ContactData {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  social: Social[];
}

export interface BuilderData {
  meta: {
    siteTitle: string;
    siteDescription: string;
    siteKeywords?: string;
    siteAuthor?: string;
    siteUrl?: string;
    siteLanguage?: string;
    siteImage?: string;
    favicon?: string;
  };
  nav: { logo: string; links: NavLink[] };
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  experience: ExperienceData;
  books: BooksData;
  blog: BlogData;
  personalProjects: PersonalProjectsData;
  credentials: CredentialsData;
  contact: ContactData;
  footer: { text: string; year: string };
}
