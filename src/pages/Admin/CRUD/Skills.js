import { useDB } from 'hooks/useDB';
import { useDocument } from 'hooks/useDocument';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

import styles from './CRUD.module.css';

const typeOptions = [
  { value: 'primary', label: 'primary' },
  { value: 'secondary', label: 'secondary' },
  { value: 'base', label: 'base' },
];

const Skills = () => {
  const { id } = useParams();
  const { document } = useDocument('skills', id);
  const { updateDocument, response } = useDB('skills');

  const [val, setValues] = useState({
    title: '',
    description: '',
    featured: false,
    type: '',
  });

  useEffect(() => {
    if (document) {
      setValues({
        title: document.title || '',
        description: document.description || '',
        featured: document.featured || false,
        type: document.type || '',
      });
    }
  }, [document]);

  const handleChange = (target, field) => {
    if (target === null) {
      setValues({ ...val, [field]: null });
      return;
    }
    setValues({ ...val, [field]: target.value });
  };

  const handleSubmit = async () => {
    await updateDocument(id, { ...val });
  };

  if (document)
    return (
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <label>Title</label>
          <input
            type="text"
            value={val.title}
            onChange={(e) => handleChange(e.target, 'title')}
          />
        </div>
        <h5>Featured</h5>
        <div className={styles.inputWrapper}>
          <input
            type="checkbox"
            checked={val.featured}
            onChange={() => setValues({ ...val, featured: !val.featured })}
          />
          <span>will show up as filter option on /quests</span>
        </div>
        <h5>Text</h5>
        <div className={styles.inputWrapper}>
          <label>Description</label>
          <textarea
            value={val.description}
            onChange={(e) => handleChange(e.target, 'description')}
            cols="60"
            rows="10"
            />
        </div>
        <div className={styles.inputWrapper}>
          <label>Skill type</label>
          <Select
            classNamePrefix="react-select"
            isClearable
            value={{ label: val.type, value: val.type }}
            options={typeOptions}
            onChange={(option) => handleChange(option, 'type')}
          />
        </div>
        <button onClick={handleSubmit} disabled={response.loading}>
          submit
        </button>
      </div>
    );
};

export default Skills;
