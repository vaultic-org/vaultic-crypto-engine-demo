import { ReactNode } from 'react';

export interface Tab {
  id: string;
  label: string;
}

export interface InfoBlockProps {
  icon?: React.ReactNode;
  color: 'green' | 'yellow' | 'blue';
  title: string;
  children: ReactNode;
}

export interface SectionWrapperProps {
  children: React.ReactNode;
}

export interface CodeExampleProps {
  language: string;
  title: string;
  code: string;
  badge?: string;
}

export interface TabContentProps {
  activeTab: string;
}

export interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
} 