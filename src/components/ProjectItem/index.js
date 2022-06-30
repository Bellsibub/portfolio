import { Link } from 'react-router-dom';

import styles from './ProjectItem.module.css';

const ProjectItem = ({ project }) => {
  return (
    <>
      <Link
        to={`/quests/${project.id}`}
        state={{ backgroundLocation: '/quests' }}
      >
        {project.title} - {project.skills}
      </Link>
    </>
  );
};
export default ProjectItem;
