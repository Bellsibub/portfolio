import { Link } from 'react-router-dom';

import styles from './ListItem.module.css';
import line from 'styles/Line.module.css';

const ListItem = ({ item }) => {
  return (
    <>
      <Link
        className={styles.container}
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(18,25,30,1) 0%, rgba(32,43,51,1) 45%, rgba(32,43,51,0.7201609531772575) 75%, rgba(16,26,34,0) 100%), url(${item.featuredImage})`,
        }}
        to={`/quests/${item.id}`}
        state={{ backgroundLocation: '/quests' }}
      >
        <h3 className={styles.title}>{item.title}</h3>
        {item.company && <h5 className={styles.subtitle}>{item.company}</h5>}
        {item.duration && (
          <>
            <h5 className={styles.subinfo}>{item.duration}</h5>
            <div className={line.base} />
            <h4 className={styles.skillHeader}>Skills used and/or learned</h4>
          </>
        )}
        {item.descriptionShort && (
          <p className={styles.description}>{item.descriptionShort}</p>
        )}
        {/* TODO: add skill tag component */}
        {item.skills}
      </Link>
    </>
  );
};
export default ListItem;
