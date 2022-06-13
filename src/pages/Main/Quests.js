// hooks
import { useSnapshotDB } from 'hooks/useSnapshotDB';
// components
import { FilterGroup } from 'components';

const Quests = () => {
  let { documents } = useSnapshotDB('projects', true);

  return (
    <>
      <FilterGroup />
      {documents ? (
        <>
          {documents.map((d) => (
            <div key={d.id}>
              {d.title} - {d.skills}
            </div>
          ))}
        </>
      ) : (
        <div>no documents found</div>
      )}
    </>
  );
};

export default Quests;
