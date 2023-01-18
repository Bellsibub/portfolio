import _ from 'lodash';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import classNames from 'classnames/bind';

// components
import ListItem from 'components/ListItem';
// styling
import styles from './ListHeader.module.css';

let cx = classNames.bind(styles);

const ProjectCount = ({ count }) => {
  return (
    <h5 className={styles.subinfo}>
      {count} {count === 1 ? 'project' : 'projects'}
    </h5>
  );
};

const ListHeader = ({ list, title, accordian, ...subinfo }) => {
  const [open, setOpen] = useState(
    subinfo.featured ? true : accordian ? false : true
  );

  const handleToggle = () => {
    if (accordian) setOpen(!open);
  };

  let headerClass = cx({
    header: true,
    accordian: accordian,
  });

  return (
    <ul className={styles.container}>
      <div className={headerClass} onClick={handleToggle}>
        {accordian && (
          <FontAwesomeIcon
            icon={open ? solid('caret-up') : solid('caret-down')}
            className={styles.icon}
          />
        )}
        <h2 className={styles.title}>{title}</h2>
        {subinfo.projectCount && <ProjectCount count={_.size(list)} />}
      </div>
      {open && (
        <>
          {list.map((doc) => (
            <li key={doc.id} className={styles.listItem}>
              <ListItem item={doc} />
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default ListHeader;
