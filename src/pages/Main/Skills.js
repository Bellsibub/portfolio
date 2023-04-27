// hooks
import { ListHeader } from 'components';
import { useSnapshotDB } from 'hooks/useSnapshotDB';
import styles from './Layouts/Skills.module.css'
const Skills = () => {
  let { documents } = useSnapshotDB('skills');
  let { documents: character } = useSnapshotDB('character');
  if (documents && character)
    return (
      <div className={styles.wrapper}>
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
      </div>
    );
};

export default Skills;
