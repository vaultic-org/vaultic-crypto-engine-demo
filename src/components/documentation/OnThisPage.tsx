import { useEffect, useState } from 'react';

interface Section {
  id: string;
  text: string;
  element: HTMLElement;
}

interface OnThisPageProps {
  containerRef?: React.RefObject<HTMLElement | HTMLDivElement | null>;
  headingSelector?: string;
  className?: string;
}

export const OnThisPage = ({
  containerRef,
  headingSelector = 'h1[id], h2[id], h3[id]',
  className = '',
}: OnThisPageProps) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Detect sections in the page
  useEffect(() => {
    const findSections = () => {
      const container = containerRef?.current || document;
      const headings = Array.from(container.querySelectorAll(headingSelector)) as HTMLElement[];
      
      const sectionsFound = headings.map(heading => ({
        id: heading.id,
        text: heading.textContent || '',
        element: heading
      })).filter(section => section.id);
      
      setSections(sectionsFound);
    };

    findSections();
    
    // Observe changes in the DOM that could add new sections
    const observer = new MutationObserver(findSections);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [containerRef, headingSelector]);

  // Follow the scrolling and update the active section
  useEffect(() => {
    if (sections.length === 0) return;

    const observerOptions = {
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    sections.forEach(section => {
      observer.observe(section.element);
    });
    
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length <= 1) return null;

  return (
    <div className={`hidden lg:block fixed right-4 top-28 w-56 z-40 ${className}`}>
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-3 border border-gray-800/50 shadow-xl">
        <div className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
          On this page
        </div>
        <ul className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`block px-2 py-1 rounded-md text-sm transition-colors ${
                  activeId === section.id
                    ? 'text-blue-400 bg-blue-900/40 font-medium'
                    : 'text-gray-400 hover:text-blue-400 hover:bg-blue-900/30'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                  // Update the URL without reloading the page
                  window.history.pushState(null, '', `#${section.id}`);
                }}
              >
                {section.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OnThisPage; 