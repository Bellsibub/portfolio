// hooks
import { ListHeader } from 'components';
import { useSnapshotDB } from 'hooks/useSnapshotDB';
// layout
import layout from './Layouts/Character.module.css';

const Character = () => {
  let { documents } = useSnapshotDB('equipment', false);

  return (
    <div className={layout.wrapper}>
      {/* TODO: add characterInfo component */}
      <div
        style={{
          width: '250px',
        }}
      >
        characterinfo
      </div>
      <div className={layout.list}>
        {documents ? (
          <ListHeader title="Equipment" list={documents} />
        ) : (
          <div>no documents found</div>
        )}
      </div>
    </div>
  );
};

export default Character;
