import { useDB } from 'hooks/useDB';
import { useSnapshotDB } from 'hooks/useSnapshotDB';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const { addDocument } = useDB('projects');
  const { documents } = useSnapshotDB('projects', false);
  const navigate = useNavigate();

  const handleAddNewDoc = async () => {
    const res = await addDocument({ title: 'New project', publish: false });
    navigate(res.id);
  };

  return (
    <div>
      <button onClick={handleAddNewDoc}>create new</button>
      {documents && (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id} onClick={() => navigate(doc.id)}>
              {doc.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Projects;
