// hooks
import { ListHeader } from 'components';
import { useSnapshotDB } from 'hooks/useSnapshotDB';

const Skills = () => {
  let { documents } = useSnapshotDB('skills');
  let { documents: character } = useSnapshotDB('character');
  if (documents && character)
    return (
      <>
        <ListHeader
          featured
          list={documents}
          title="Showcased Skills"
          accordian
          skills
        />
        <ListHeader
          featured
          list={character[0].skills}
          title="Other Skills"
          accordian
          otherSkills
        />
      </>
    );
};

export default Skills;
