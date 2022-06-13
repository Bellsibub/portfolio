// hooks
import { useSnapshotDB } from 'hooks/useSnapshotDB';
// components
import { FilterGroup, ProjectItem } from 'components';

const Quests = () => {
  let { documents } = useSnapshotDB('projects', true);

  return (
    <>
      <FilterGroup />
      {documents ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <ProjectItem project={doc} />
            </li>
          ))}
        </ul>
      ) : (
        <div>no documents found</div>
      )}
    </>
  );
};

export default Quests;
