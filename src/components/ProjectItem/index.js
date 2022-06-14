import { Link, useLocation } from 'react-router-dom';

import styles from './ProjectItem.module.css';

const ProjectItem = ({ project, nested }) => {
  let location = useLocation();

  return (
    <>
      <Link
        to={`/quests/${project.id}`}
        state={{ backgroundLocation: '/quests' }}
        // state={{ backgroundLocation: nested ? location.state.backgroundLocation : location }}
      >
        {project.title} - {project.skills}
      </Link>
    </>
  );
};
export default ProjectItem;
