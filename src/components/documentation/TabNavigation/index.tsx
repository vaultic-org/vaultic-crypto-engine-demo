import { TabNavigationProps } from '../types';
import { styles } from '../styles';

export const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => (
  <nav className={styles.navigationContainer}>
    <div className={styles.navigationSticky}>
      <div className={styles.mobileNavigation}>
        <div className={styles.mobileTabList}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={styles.mobileTabButton(activeTab === tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.desktopTabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={styles.tabButton(activeTab === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

export default TabNavigation; 