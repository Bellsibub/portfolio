// hooks
import { CharacterInfo, ListHeader } from 'components';
import { useSnapshotDB } from 'hooks/useSnapshotDB';
// layout
import layout from './Layouts/Character.module.css';

const Character = () => {
  let { documents } = useSnapshotDB('equipment', false, null, [
    'start',
    'desc',
  ]);

  return (
    <div className={layout.wrapper}>
      <div className={layout.infoPanel}>
        <CharacterInfo />
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
