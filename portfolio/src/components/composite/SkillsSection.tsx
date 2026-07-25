'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@/components/basic/Container';
import { SectionTitle } from '@/components/basic/SectionTitle';
import { DynamicIcon } from '@/components/basic/IconMap';
import { FiSearch, FiX, FiGrid, FiCheck } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import type { SkillsData } from '@/types/builder';

const Section = styled.section`
  padding: 100px 0;
  background: ${p => p.theme.colors.bg};
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 44px;
`;

const SearchWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${p => p.theme.colors.textMuted};
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 11px 40px;
  border-radius: 999px;
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.bgCard};
  color: ${p => p.theme.colors.text};
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${p => p.theme.colors.accent};
  }

  &::placeholder {
    color: ${p => p.theme.colors.textMuted};
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: ${p => p.theme.colors.textMuted};
  cursor: pointer;

  &:hover {
    color: ${p => p.theme.colors.text};
  }
`;

const Suggestions = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${p => p.theme.colors.bgCard};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  box-shadow: ${p => p.theme.colors.shadow};
  list-style: none;
  overflow: hidden;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 10px 16px;
  font-size: 0.85rem;
  color: ${p => p.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &:hover {
    background: ${p => p.theme.colors.accentSubtle};
    color: ${p => p.theme.colors.accent};
  }
`;

const SuggestionCategory = styled.span`
  font-size: 0.7rem;
  color: ${p => p.theme.colors.textMuted};
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${p => (p.$active ? p.theme.colors.accent : p.theme.colors.border)};
  background: ${p => (p.$active ? p.theme.colors.accent : p.theme.colors.bgCard)};
  color: ${p => (p.$active ? p.theme.colors.bgCard : p.theme.colors.text)};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${p => p.theme.colors.accent};
    ${p => !p.$active && `color: ${p.theme.colors.accent};`}
  }
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const CertBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.theme.colors.accent};
  color: ${p => p.theme.colors.bgCard};
  border: 2px solid ${p => p.theme.colors.bg};
`;

const LevelPopover = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${p => p.theme.colors.bgCard};
  border: 1px solid ${p => p.theme.colors.border};
  box-shadow: ${p => p.theme.colors.shadow};
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 50;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-bottom-color: ${p => p.theme.colors.border};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(1px);
    border: 4px solid transparent;
    border-bottom-color: ${p => p.theme.colors.bgCard};
  }
`;

const StarsRow = styled.div`
  display: flex;
  gap: 3px;
`;

const LevelStar = styled.span<{ $filled: boolean }>`
  display: flex;
  font-size: 11px;
  color: ${p => (p.$filled ? '#FFB020' : p.theme.colors.border)};
  opacity: ${p => (p.$filled ? 1 : 0.6)};
`;

const CertName = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  color: ${p => p.theme.colors.text};
  white-space: nowrap;
`;

const SkillCapsule = styled.div`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 999px;
  background: ${p => p.theme.colors.bgCard};
  border: 1px solid ${p => p.theme.colors.border};
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    z-index: 10;
    transform: scale(1.06);
    border-color: ${p => p.theme.colors.accent};
    background: ${p => p.theme.colors.accentSubtle};
    box-shadow: ${p => p.theme.colors.shadow};
  }

  &:hover ${LevelPopover} {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

const SkillName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${p => p.theme.colors.text};
`;

const EmptyState = styled.p`
  text-align: center;
  color: ${p => p.theme.colors.textMuted};
  font-size: 0.9rem;
`;

export function SkillsSection({ data }: { data: SkillsData }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const allSkills = useMemo(
    () =>
      data.categories.flatMap(cat =>
        cat.items.map(item => ({ ...item, category: cat.name }))
      ),
    [data]
  );

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allSkills.filter(
      s =>
        (activeCategory === 'All' || s.category === activeCategory) &&
        s.name.toLowerCase().includes(q)
    );
  }, [allSkills, activeCategory, query]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allSkills.filter(s => s.name.toLowerCase().includes(q)).slice(0, 6);
  }, [allSkills, query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <Section id="skills">
      <Container>
        <SectionTitle title={data.title} subtitle={data.subtitle} center />

        <Controls>
          <SearchWrap ref={wrapRef}>
            <SearchIcon><FiSearch size={16} /></SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search skills..."
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            {query && (
              <ClearButton aria-label="Clear search" onClick={() => setQuery('')}>
                <FiX size={14} />
              </ClearButton>
            )}
            {showSuggestions && suggestions.length > 0 && (
              <Suggestions>
                {suggestions.map(s => (
                  <SuggestionItem
                    key={s.name}
                    onClick={() => {
                      setQuery(s.name);
                      setShowSuggestions(false);
                    }}
                  >
                    {s.name}
                    <SuggestionCategory>{s.category}</SuggestionCategory>
                  </SuggestionItem>
                ))}
              </Suggestions>
            )}
          </SearchWrap>

          <FilterRow>
            <FilterChip
              $active={activeCategory === 'All'}
              onClick={() => setActiveCategory('All')}
            >
              <FiGrid size={14} /> All
            </FilterChip>
            {data.categories.map(cat => (
              <FilterChip
                key={cat.name}
                $active={activeCategory === cat.name}
                onClick={() => setActiveCategory(cat.name)}
              >
                <DynamicIcon name={cat.icon} size={14} /> {cat.name}
              </FilterChip>
            ))}
          </FilterRow>
        </Controls>

        {filteredSkills.length > 0 ? (
          <TagCloud>
            {filteredSkills.map(s => (
              <SkillCapsule key={s.name}>
                <SkillName>{s.name}</SkillName>
                <LevelPopover>
                  <StarsRow>
                    {Array.from({ length: 5 }).map((_, i) =>
                      i < s.level ? (
                        <LevelStar key={i} $filled>
                          <FaStar />
                        </LevelStar>
                      ) : (
                        <LevelStar key={i} $filled={false}>
                          <FaRegStar />
                        </LevelStar>
                      )
                    )}
                  </StarsRow>
                  {s.certified && s.certificateName && (
                    <CertName>
                      <FiCheck size={11} /> {s.certificateName}
                    </CertName>
                  )}
                </LevelPopover>
                {s.certified && (
                  <CertBadge aria-hidden="true">
                    <FiCheck size={11} />
                  </CertBadge>
                )}
              </SkillCapsule>
            ))}
          </TagCloud>
        ) : (
          <EmptyState>No skills match &ldquo;{query}&rdquo;.</EmptyState>
        )}
      </Container>
    </Section>
  );
}
