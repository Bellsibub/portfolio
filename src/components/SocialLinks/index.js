import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './SocialLinks.module.css';

const SocialLinks = () => {
  return (
    <div className={styles.container}>
      <a rel="noreferrer" target="_blank" href="https://github.com/Bellsibub">
        <FontAwesomeIcon icon={brands('github')} />
      </a>
      <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/bellsibub/">
        <FontAwesomeIcon icon={brands('linkedin')} />
      </a>
    </div>
  );
};
export default SocialLinks;
