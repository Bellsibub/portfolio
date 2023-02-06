import styles from './OtherSkills.module.css';

const OtherSkills = ({ list }) => {
  if (list)
    return (
      <div className={styles.container}>
        <div className={styles.subSection}>
          <h4>Tools</h4>
          <ul>
            {list.tools.map((skill) => (
              <li>{skill}</li>
            ))}
          </ul>
        </div>
        <div className={styles.subSection}>
          <h4>Other</h4>
          <ul>
            {list.other.map((skill) => (
              <li>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default OtherSkills;
