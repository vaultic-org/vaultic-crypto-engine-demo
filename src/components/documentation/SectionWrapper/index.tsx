import { SectionWrapperProps } from '../types';
import { styles } from '../styles';

export const SectionWrapper = ({ children }: SectionWrapperProps) => (
  <section className={styles.sectionWrapper}>
    <div className={styles.sectionContent}>
      {children}
    </div>
  </section>
);

export default SectionWrapper; 