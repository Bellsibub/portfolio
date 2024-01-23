import styles from "./Tags.module.css";
import _ from "lodash";

const Tags = ({ content, primary }) => {
  return (
    <div className={styles.container}>
      {content && (
        <>
          {primary && (
            <div key={primary} className={styles.tag + " " + styles.primary}>
              {primary}
            </div>
          )}
          {_.pull(content, primary).map((skill) => (
            <div key={skill} className={styles.tag}>
              {skill}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Tags;
