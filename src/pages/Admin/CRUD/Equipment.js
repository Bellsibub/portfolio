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
  const { document: character } = useDocument(
    'character',
    'IubhuDbfpetly9OUHZ2M'
  );
  const { document } = useDocument('equipment', id);
  const { updateDocument, response } = useDB('equipment');

  const [skillOptions, setSkillOptions] = useState([]);
  const [otherSkillOptions, setOtherSkillOptions] = useState([]);
  const [toolsOptions, setToolsOptions] = useState([]);
  const [val, setValues] = useState({
    title: '',
    company: '',
    start: '',
    end: '',
    description: '',
    skills: [],
    otherSkills: [],
    tools: [],
    media: [],
    featuredImage: '',
  });

  const [medias, setMedias] = useState([]);

  useEffect(() => {
    if (document) {
      setValues({
        title: document.title || '',
        company: document.company || '',
        start: document.start || '',
        end: document.end || '',
        description: document.description || '',
        skills: document.skills || [],
        otherSkills: document.otherSkills || [],
        tools: document.tools || [],
        media: document.media || [],

        featuredImage: document.featuredImage || '',
      });
      setMedias(document.media || []);
    }
    // set skill options
    if (skills) {
      let _skills = skills;
      setSkillOptions(
        _skills.map((skill) => {
          return { value: skill.title, label: skill.title };
        })
      );
    }
    // set other skill options
    if (character) {
      console.log(character);
      let _otherSkills = character.skills.other;
      let _tools = character.skills.tools;
      setOtherSkillOptions(
        _otherSkills.map((skill) => {
          return { value: skill, label: skill };
        })
      );
      setToolsOptions(
        _tools.map((skill) => {
          return { value: skill, label: skill };
        })
      );
    }
  }, [character, document, skills]);

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
          <label>start</label>
          <input
            type="date"
            value={val.start}
            onChange={(e) => handleChange(e.target, 'start')}
          />
          <label>end</label>
          <input
            type="date"
            value={val.end}
            onChange={(e) => handleChange(e.target, 'end')}
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
        <h5>other skills</h5>
        <div className={styles.inputWrapper}>
          <Select
            classNamePrefix="react-select"
            isMulti
            value={
              val.otherSkills.length > 0
                ? val.otherSkills.map((d) => {
                    return { label: d, value: d };
                  })
                : []
            }
            options={otherSkillOptions}
            onChange={(option) => handleChange(option, 'otherSkills', true)}
          />
        </div>
        <h5>tools</h5>
        <div className={styles.inputWrapper}>
          <Select
            classNamePrefix="react-select"
            isMulti
            value={
              val.tools.length > 0
                ? val.tools.map((d) => {
                    return { label: d, value: d };
                  })
                : []
            }
            options={toolsOptions}
            onChange={(option) => handleChange(option, 'tools', true)}
          />
        </div>
        <h5>media</h5>
        <h6>
          select what media should be shown via star, click on media and submit
          to remove
        </h6>
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
