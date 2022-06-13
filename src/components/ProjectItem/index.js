import { Link, useLocation } from 'react-router-dom';

import styles from './ProjectItem.module.css';

const ProjectItem = ({ project }) => {
  let location = useLocation();

  return (
    <>
      <Link
        to={`/quests/${project.id}`}
        state={{ backgroundLocation: location }}
      >
        {project.title} - {project.skills}
      </Link>
    </>
  );
};
export default ProjectItem;
