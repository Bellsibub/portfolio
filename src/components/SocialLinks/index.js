import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './SocialLinks.module.css';

const SocialLinks = () => {
  return (
    <div className={styles.container}>
      <a rel="noreferrer" target="_blank" href="http://github.com">
        <FontAwesomeIcon icon={brands('github')} />
      </a>
      <a rel="noreferrer" target="_blank" href="http://github.com">
        <FontAwesomeIcon icon={brands('stack-overflow')} />
      </a>
      <a rel="noreferrer" target="_blank" href="http://github.com">
        <FontAwesomeIcon icon={brands('linkedin')} />
      </a>
    </div>
  );
};
export default SocialLinks;
