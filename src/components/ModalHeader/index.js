import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './ModalHeader.module.css';
import line from 'styles/Line.module.css';
import Tags from 'components/Tags';

const SubheadProject = ({ data }) => {
  return (
    <>
      <Tags content={data.skills} primary={data.primarySkill} />
      <div className={styles.links}>
        <a rel="noreferrer" target="_blank" href={data.linkGithub}>
          <FontAwesomeIcon icon={brands('github')} />
        </a>
        <a rel="noreferrer" target="_blank" href={data.linkProject}>
          <FontAwesomeIcon icon={solid('arrow-up-right-from-square')} />
        </a>
      </div>
    </>
  );
};

const SubheadSkills = ({ data }) => {
  return <h5 className={styles.subtitle}>{data.type}</h5>;
};

const SubheadEquipment = ({ data }) => {
  return (
    <>
      <h5 className={styles.subtitle}>{data.company}</h5>
      <h5 className={styles.duration}>{data.duration}</h5>
    </>
  );
};

const ModalHeader = ({ data, collection }) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `linear-gradient(100deg, rgba(18,25,30,1) 0%, rgba(32,43,51,1) 45%, rgba(32,43,51,0.7201609531772575) 75%, rgba(16,26,34,0) 100%), url(${data.featuredImage})`,
      }}
    >
      <h2 className={styles.title}>{data.title}</h2>
      <div className={line.accent} />
      {(() => {
        switch (collection) {
          case 'projects':
            return <SubheadProject data={data} />;
          case 'skills':
            return <SubheadSkills data={data} />;
          case 'equipment':
            return <SubheadEquipment data={data} />;
          default:
            return <></>;
        }
      })()}
    </div>
  );
};

export default ModalHeader;
