import styles from './Tags.module.css';

const Tags = ({ content, primary }) => {
  return (
    <div className={styles.container}>
      {content && (
        <>
          {content.map((skill) => (
            <div
              key={skill}
              className={
                styles.tag + `${skill === primary ? ` ${styles.primary}` : ''}`
              }
            >
              {skill}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Tags;
