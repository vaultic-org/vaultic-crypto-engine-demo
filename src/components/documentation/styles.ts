export const styles = {
  sectionWrapper: "w-full min-h-[50vh] flex items-center justify-center bg-transparent",
  sectionContent: "w-full max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl shadow-lg px-8 py-10",
  
  infoBlock: (color: string) => `flex items-start gap-3 bg-gray-900 border-l-4 border-${color}-500 rounded-lg p-4 mb-2`,
  infoIcon: (color: string) => `fas fa-${color}-400 mt-1`,
  infoTitle: (color: string) => `font-semibold text-${color}-400 mb-1`,
  infoContent: "text-sm text-gray-300",
  
  tabButton: (isActive: boolean) => `
    px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-colors
    ${isActive 
      ? 'bg-white/10 text-white' 
      : 'text-gray-400 hover:text-white hover:bg-white/5'
    }
  `,
  
  mobileTabButton: (isActive: boolean) => `
    px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
    ${isActive 
      ? 'bg-white/10 text-white' 
      : 'text-gray-400 hover:text-white hover:bg-white/5'
    }
  `,
  
  navigationContainer: "lg:w-64 flex-shrink-0",
  navigationSticky: "lg:sticky lg:top-24",
  mobileNavigation: "lg:hidden mb-6 overflow-x-auto",
  mobileTabList: "flex gap-2 pb-2",
  desktopTabList: "hidden lg:flex flex-col gap-1",
  
  mainContent: "flex-1",
  proseContainer: "prose prose-invert max-w-none",
  
  pageContainer: "min-h-screen bg-gray-900 text-white overflow-x-hidden",
  contentContainer: "flex flex-col lg:flex-row max-w-[1400px] mx-auto px-4 lg:px-8 py-12 gap-12",
  
  heading1: "text-3xl font-bold text-white mb-4",
  heading2: "text-xl font-semibold text-white mb-2",
  paragraph: "text-lg text-gray-300 leading-relaxed mb-6",
  list: "space-y-2 text-gray-300 mb-8",
  listItem: "flex items-start gap-3",
  listBullet: "text-blue-400 mt-1",
  
  codeBlock: "bg-gray-800 p-4 rounded-md mb-6 font-mono",
  codePre: "text-sm text-gray-300",
  
  securityNotice: "bg-red-500/10 border border-red-500/20 rounded-xl p-4",
  securityIcon: "text-red-400 mt-1",
  securityTitle: "font-semibold text-red-400 mb-1",
  securityContent: "text-sm text-gray-300",
  
  container: 'min-h-screen bg-gray-900 text-white overflow-x-hidden',
  content: 'flex-1 prose prose-invert max-w-none',
} as const; 