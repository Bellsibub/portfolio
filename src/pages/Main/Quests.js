// hooks
import { useSnapshotDB } from 'hooks/useSnapshotDB';
// components
import { FilterGroup } from 'components';

const Quests = () => {
  const { documents, error } = useSnapshotDB('projects');

  return (
    <>
      <FilterGroup />
      {documents ? (
        <>
          {documents.map((d) => (
            <div key={d.id}>{d.title}</div>
          ))}
        </>
      ) : (
        <div>no documents found</div>
      )}
    </>
  );
};

export default Quests;
