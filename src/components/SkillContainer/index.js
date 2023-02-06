import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import line from 'styles/Line.module.css';
import styles from './SkillContainer.module.css';

const SkillContainer = ({ list }) => {
  const [skills, setSkills] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    if (list) {
      let t = {};
      let grouped = _.groupBy(list, 'type');
      let sorted = Object.entries(grouped).sort();
      sorted.forEach((val) => {
        t = { ...t, [val[0]]: val[1] };
      });
      setSkills(t);
    }
  }, [list]);

  if (skills)
    return (
      <div className={styles.container}>
        {Object.entries(skills).map(([type, skills]) => (
          <ul className={styles.list} key={type}>
            <h3>{type}</h3>
            <div className={styles.skills}>
              {skills.map((skill) => (
                <li
                  onClick={() =>
                    navigate(`/skills/${skill.id}`, {
                      state: { backgroundLocation: '/skills' },
                    })
                  }
                  className={
                    styles.item +
                    `${type === 'secondary' ? ` ${styles.secondary}` : ''}` +
                    `${type === 'base' ? ` ${styles.base}` : ''}`
                  }
                  key={skill.id}
                >
                  {skill.title}
                </li>
              ))}
            </div>
            {type !== 'secondary' && <div className={line.base} />}
          </ul>
        ))}
      </div>
    );
};

export default SkillContainer;
