import { MediaGrid, MediaSelect } from 'components';
import { useDB } from 'hooks/useDB';
import { useDocument } from 'hooks/useDocument';
import { useSnapshotDB } from 'hooks/useSnapshotDB';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

// styling
import styles from './CRUD.module.css';

const Equipment = () => {
  const { id } = useParams();
  const { documents: skills } = useSnapshotDB('skills');
  const { document } = useDocument('equipment', id);
  const { updateDocument, response } = useDB('equipment');

  const [skillOptions, setSkillOptions] = useState([]);
  const [val, setValues] = useState({
    title: '',
    company: '',
    duration: '',
    description: '',
    skills: [],
    media: [],
    featuredImage: '',
  });

  const [medias, setMedias] = useState([]);

  useEffect(() => {
    if (document) {
      setValues({
        title: document.title || '',
        company: document.company || '',
        duration: document.duration || '',
        description: document.description || '',
        skills: document.skills || [],
        media: document.media || [],

        featuredImage: document.featuredImage || '',
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

  const handleMediaSelect = (media, remove) => {
    if (remove) {
      setMedias([...medias, media]);
    } else {
      let t = [...medias];
      _.pull(t, media);
      setMedias([...t]);
    }
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
      // setPrimarySkillOptions([...target]);
    } else {
      setValues({ ...val, [field]: target.value });
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
        <div className={styles.inputWrapper}>
          <label>Company name</label>
          <input
            type="text"
            value={val.company}
            onChange={(e) => handleChange(e.target, 'company')}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label>Description</label>
          <textarea
            value={val.description}
            onChange={(e) => handleChange(e.target, 'description')}
            cols="60"
            rows="10"
          />
        </div>
        <h5>dates</h5>
        <div className={styles.inputWrapper}>
          <label>duration</label>
          <input
            type="text"
            value={val.duration}
            onChange={(e) => handleChange(e.target, 'duration')}
          />
        </div>
        <h5>skills</h5>
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
        <h5>media</h5>
        <h6>select what media should be shown via star, click on media and submit to remove</h6>
        <MediaGrid
          featuredImage={val.featuredImage}
          media={val.media}
          handleMediaSelect={handleMediaSelect}
          handleFeatureSelect={handleFeatureSelect}
        />
        <MediaSelect type="equipment" />
        <button onClick={handleSubmit} disabled={response.loading}>
          submit
        </button>
      </div>
    );
};

export default Equipment;
