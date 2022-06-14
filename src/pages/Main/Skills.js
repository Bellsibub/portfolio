// hooks
import { SkillItem } from 'components';
import { useSnapshotDB } from 'hooks/useSnapshotDB';

const Skills = () => {
  let { documents } = useSnapshotDB('skills');
  return (
    <>
      {documents ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <SkillItem skill={doc} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No skills found</div>
      )}
    </>
  );
};

export default Skills;
