// hooks
import ListItem from 'components/ListItem';
import { useSnapshotDB } from 'hooks/useSnapshotDB';

// styles
import styles from './SkillsContent.module.css';
import line from 'styles/Line.module.css';

const SkillsContent = ({ data }) => {
  let { documents } = useSnapshotDB('projects', false, [
    'skills',
    'array-contains',
    data.title,
  ]);
  return (
    <>
      <p>{data.description}</p>
      <div className={line.base} />
      <h4>Projects</h4>
      {documents && (
        <ul className={styles.list}>
          {documents.map((doc) => (
            <li key={doc.id}>
              <ListItem item={doc} nested />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default SkillsContent;
