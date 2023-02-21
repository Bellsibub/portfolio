import { useSnapshotDB } from 'hooks/useSnapshotDB';
import { CRUDcharacter } from 'pages';

const Profile = () => {
  const { documents } = useSnapshotDB('character', false);
  if (documents)
    return (
      <>
        <CRUDcharacter data={documents[0]} />
      </>
    );
};

export default Profile;
