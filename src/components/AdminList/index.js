import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';
import { useSnapshotDB } from 'hooks/useSnapshotDB';
import { useDB } from 'hooks/useDB';

import styles from './AdminList.module.css';

const AdminList = ({ type }) => {
  const { addDocument, updateDocument, deleteDocument } = useDB(type);
  const { documents } = useSnapshotDB(type, false);
  const navigate = useNavigate();

  const handleAddNewDoc = async () => {
    const res = await addDocument({ title: `New ${type}`, publish: false });
    navigate(res.id);
  };

  if (documents)
    return (
      <div>
        <ul className={styles.container}>
          <button onClick={handleAddNewDoc}>create new</button>
          {documents.map((doc) => (
            <li className={styles.item} key={doc.id}>
              <p onClick={() => navigate(doc.id)}>{doc.title}</p>
              {doc.type && <span>{doc.type}</span>}
              <div className={styles.actions}>
                {type !== 'equipment' && (
                  <FontAwesomeIcon
                    onClick={() =>
                      updateDocument(doc.id, { featured: !doc.featured })
                    }
                    className={doc.featured ? styles.active : ''}
                    icon={regular('star')}
                  />
                )}
                <FontAwesomeIcon
                  onClick={() => deleteDocument(doc.id)}
                  icon={regular('trash-can')}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default AdminList;
