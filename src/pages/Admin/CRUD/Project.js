import { AddMedia, MediaGrid, MediaSelect, Modal } from 'components';
import { useDB } from 'hooks/useDB';
import { useDocument } from 'hooks/useDocument';
import { useSnapshotDB } from 'hooks/useSnapshotDB';
import _ from 'lodash';
import { useEffect, useState } from 'react';
// import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

// styling
import styles from './CRUD.module.css';

const Project = () => {
  const { id } = useParams();
  const { documents: skills } = useSnapshotDB('skills');
  const { document } = useDocument('projects', id);
  const { updateDocument, response } = useDB('projects');

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
    media: [],
    featuredImage: '',
    featured: false,
  });
  const [medias, setMedias] = useState([]);

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
        media: document.media || [],
        featuredImage: document.featuredImage || '',
        featured: document.featured || false,
      });
      setMedias(document.media || []);
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

  const handleSubmit = async () => {
    let t = { ...val, media: [...medias] };
    await updateDocument(id, t);
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

  const handleMediaSelect = (media, remove) => {
    if (remove) {
      setMedias([...medias, media]);
    } else {
      let t = [...medias];
      _.pull(t, media);
      setMedias([...t]);
    }
  };

  const handleFeatureSelect = (featured) => {
    setValues({ ...val, featuredImage: featured });
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
            value={
              val.skills.length > 0
                ? val.skills.map((d) => {
                    return { label: d, value: d };
                  })
                : []
            }
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
        <h5>Featured</h5>
        <div className={styles.inputWrapper}>
          <input
            type="checkbox"
            checked={val.featured}
            onChange={() => setValues({ ...val, featured: !val.featured })}
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
        <h6>select what should be removed and marked as feature</h6>
        <MediaGrid
          featuredImage={val.featuredImage}
          media={val.media}
          handleMediaSelect={handleMediaSelect}
          handleFeatureSelect={handleFeatureSelect}
        />
        <button onClick={handleSubmit} disabled={response.loading}>submit</button>
        <MediaSelect type="projects" />
      </div>
    );
};

export default Project;
