export interface Tab {
    label: string;
    language: string;
    code: string;
    icon?: string; // Optional icon class, e.g., 'fas fa-lock'
}

export interface CodeSnippetTabsProps {
    tabs: Tab[];
    defaultTab?: string; // Label of the default tab
}