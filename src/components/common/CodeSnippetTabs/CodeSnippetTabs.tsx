import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tab, CodeSnippetTabsProps } from './CodeSnipperTabs.types';

const CodeSnippetTabs: React.FC<CodeSnippetTabsProps> = ({ tabs, defaultTab }) => {
  const initialActiveTab = defaultTab ? (tabs.find(tab => tab.label === defaultTab) || tabs[0]) : tabs[0];
  const [activeTab, setActiveTab] = useState<Tab>(initialActiveTab);

  if (!tabs || tabs.length === 0) {
    return <p>No code snippets available.</p>;
  }

  return (
    <div className="code-section rounded-xl overflow-hidden">
      <div className="code-header p-3 flex items-center space-x-1 bg-gray-800 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                        ${activeTab.label === tab.label
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                        }`}
          >
            {tab.icon && <i className={`${tab.icon} mr-2`}></i>}
            {tab.label}
          </button>
        ))}
        <div className="flex-grow"></div> {/* Spacer */}
        <div className="flex items-center space-x-1.5 ml-auto mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-gray-500">{activeTab.language === 'typescript' ? 'example.ts' : 'example.rs'}</span>
      </div>
      <div className="code-content">
        <SyntaxHighlighter
          language={activeTab.language}
          style={vscDarkPlus}
          customStyle={{
            background: 'rgba(15,23,42,0.95)', // Tailwind slate-900 with opacity
            fontSize: '0.9rem', // Slightly smaller font for better fit
            padding: '1.25rem', // p-5
            borderRadius: '0 0 0.75rem 0.75rem', // Rounded bottom corners
            minHeight: '550px',
            maxHeight: '750px',
            overflowY: 'auto',
          }}
          showLineNumbers={false}
          lineNumberStyle={{ color: '#6b7280', fontSize: '0.8rem', paddingRight: '1rem' }} // Tailwind gray-500
        >
          {activeTab.code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeSnippetTabs; 