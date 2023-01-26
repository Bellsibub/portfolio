import { useDB } from 'hooks/useDB';
import { useSnapshotDB } from 'hooks/useSnapshotDB';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import list from 'styles/List.module.css';

const Projects = () => {
  const { addDocument, updateDocument, deleteDocument } = useDB('projects');
  const { documents } = useSnapshotDB('projects', false);
  const navigate = useNavigate();

  const handleAddNewDoc = async () => {
    const res = await addDocument({ title: 'New project', publish: false });
    navigate(res.id);
  };

  return (
    <div>
      {documents && (
        <ul className={list.container}>
          <button onClick={handleAddNewDoc}>create new</button>
          {documents.map((doc) => (
            <li className={list.item} key={doc.id}>
              <p onClick={() => navigate(doc.id)}>{doc.title}</p>
              <div className={list.actions}>
                <FontAwesomeIcon
                  onClick={() =>
                    updateDocument(doc.id, { featured: !doc.featured })
                  }
                  className={doc.featured ? list.active : ''}
                  icon={regular('star')}
                />
                <FontAwesomeIcon
                  onClick={() => deleteDocument(doc.id)}
                  icon={regular('trash-can')}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Projects;
