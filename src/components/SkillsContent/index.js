// hooks
import ListItem from 'components/ListItem';
import { useSnapshotDB } from 'hooks/useSnapshotDB';

const SkillsContent = ({ data }) => {
  let { documents } = useSnapshotDB('projects', false, [
    'skills',
    'array-contains',
    data.title,
  ]);
  return (
    <>
      {documents && (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <ListItem item={doc} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default SkillsContent;
