import { useDB } from 'hooks/useDB';
import { useDocument } from 'hooks/useDocument';
import { useSnapshotDB } from 'hooks/useSnapshotDB';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

// styling
import styles from './CRUD.module.css';

const Project = () => {
  const { id } = useParams();
  const { documents: skills } = useSnapshotDB('skills');
  const { document } = useDocument('projects', id);
  const { updateDocument } = useDB('projects');

  const [skillOptions, setSkillOptions] = useState([]);
  const [primarySkillOptions, setPrimarySkillOptions] = useState([]);
  const [val, setValues] = useState({
    title: '',
    linkGithub: '',
    linkProject: '',
    descriptionShort: '',
    descriptionLong: '',
    skills: [],
    primarySkill: '',
  });

  useEffect(() => {
    if (document) {
      setValues({
        title: document.title || '',
        linkGithub: document.linkGithub || '',
        linkProject: document.linkProject || '',
        descriptionShort: document.descriptionShort || '',
        descriptionLong: document.descriptionLong || '',
        skills: document.skills || '',
        primarySkill: document.primarySkill || '',
      });
    }
    if (skills) {
      let _skills = skills;
      setSkillOptions(
        _skills.map((skill) => {
          return { value: skill.title, label: skill.title };
        })
      );
    }
  }, [document, skills]);

  const handleSubmit = () => {
    console.log(val);
    updateDocument(id, val);
  };

  const handleChange = (target, field, multi) => {
    if (target === null) {
      setValues({ ...val, [field]: null });
      return;
    }
    if (multi) {
      let _target = target.map((d) => {
        return d.value;
      });
      setValues({ ...val, [field]: _target });
      setPrimarySkillOptions([...target]);
    } else {
      setValues({ ...val, [field]: target.value });
    }
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
        <h5>Links</h5>
        <div className={styles.inputWrapper}>
          <label>Github</label>
          <input
            type="text"
            value={val.linkGithub}
            onChange={(e) => handleChange(e.target, 'linkGithub')}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label>Project</label>
          <input
            type="text"
            value={val.linkProject}
            onChange={(e) => handleChange(e.target, 'linkProject')}
          />
        </div>
        <h5>Skills</h5>
        <div className={styles.inputWrapper}>
          <Select
            classNamePrefix="react-select"
            isMulti
            value={val.skills.map((d) => {
              return { label: d, value: d };
            })}
            options={skillOptions}
            onChange={(option) => handleChange(option, 'skills', true)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label>Primary skill</label>
          <Select
            classNamePrefix="react-select"
            isClearable
            value={{ label: val.primarySkill, value: val.primarySkill }}
            options={primarySkillOptions}
            onChange={(option) => handleChange(option, 'primarySkill')}
          />
        </div>
        <h5>Text</h5>
        <div className={styles.inputWrapper}>
          <label>Short description</label>
          <textarea
            value={val.descriptionShort}
            onChange={(e) => handleChange(e.target, 'descriptionShort')}
            cols="60"
            rows="10"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label>Long description</label>
          <textarea
            value={val.descriptionLong}
            onChange={(e) => handleChange(e.target, 'descriptionLong')}
            cols="60"
            rows="10"
          />
        </div>

        <h5>Media</h5>
        <button onClick={handleSubmit}>submit</button>
      </div>
    );
};

export default Project;
