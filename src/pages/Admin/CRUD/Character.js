import { useDB } from 'hooks/useDB';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import styles from './CRUD.module.css';

const OPTSpronouns = [
  { value: 'she/her', label: 'she/her' },
  { value: 'he/him', label: 'he/him' },
  { value: 'they/them', label: 'they/them' },
];

const formatDate = (date) => {
  let t = moment(date, 'DD MMM YYYY');
  return t.format('yyyy-MM-DD');
};

const Character = ({ data }) => {
  const { updateDocument, response } = useDB('character');

  const [val, setVals] = useState({
    name: '',
    pronouns: '',
    dob: '',
    location: '',
    traits: [],
    interests: [],
    skills: {
      other: [],
      tools: [],
    },
  });
  const [OPTStraits, setOPTStraits] = useState([]);
  const [OPTSinterests, setOPTSinterests] = useState([]);
  const [OPTSskillsOther, setOPTSskillsOther] = useState([]);
  const [OPTSskillsTools, setOPTSskillsTools] = useState([]);

  useEffect(() => {
    if (data) {
      setVals({
        name: data.name || '',
        pronouns: data.pronouns || '',
        dob: formatDate(data.dob) || '',
        location: data.location || '',
        traits: data.traits || [],
        interests: data.interests || [],
        skills: {
          other: data.skills.other || [],
          tools: data.skills.tools || [],
        },
      });
      setOPTStraits(
        data.traits.map((trait) => {
          return { value: trait, label: trait };
        })
      );
      setOPTSinterests(
        data.interests.map((interest) => {
          return { value: interest, label: interest };
        })
      );
      setOPTSskillsOther(
        data.skills.other.map((other) => {
          return { value: other, label: other };
        })
      );
      setOPTSskillsTools(
        data.skills.tools.map((tools) => {
          return { value: tools, label: tools };
        })
      );
    }
  }, [data]);

  const handleChange = (target, field, multi, deep) => {
    if (target === null) {
      setVals({ ...val, [field]: null });
      return;
    }
    if (multi) {
      let _target = target.map((d) => {
        return d.value;
      });
      if (deep) {
        let st = field.split('.');
        setVals({ ...val, skills: { ...val.skills, [st[1]]: _target } });
      } else {
        setVals({ ...val, [field]: _target });
      }
    } else {
      setVals({ ...val, [field]: target.value });
    }
  };

  const handleSubmit = async () => {
    await updateDocument(data.id, {
      ...val,
      dob: moment(val.dob).format('DD MMM YYYY'),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <label>Name</label>
        <input
          type="text"
          value={val.name}
          onChange={(e) => handleChange(e.target, 'name')}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Pronouns</label>
        <Select
          classNamePrefix="react-select"
          isClearable
          value={{ label: val.pronouns, value: val.pronouns }}
          options={OPTSpronouns}
          onChange={(option) => handleChange(option, 'pronouns')}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>d.o.b</label>
        <input
          type="date"
          value={val.dob}
          onChange={(e) => handleChange(e.target, 'dob')}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Location</label>
        <input
          type="text"
          value={val.location}
          onChange={(e) => handleChange(e.target, 'location')}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Traits</label>
        <CreatableSelect
          classNamePrefix="react-select"
          isMulti
          value={
            val.traits.length > 0
              ? val.traits.map((d) => {
                  return { label: d, value: d };
                })
              : []
          }
          options={OPTStraits}
          onChange={(option) => handleChange(option, 'traits', true)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Interests</label>
        <CreatableSelect
          classNamePrefix="react-select"
          isMulti
          value={
            val.interests.length > 0
              ? val.interests.map((d) => {
                  return { label: d, value: d };
                })
              : []
          }
          options={OPTSinterests}
          onChange={(option) => handleChange(option, 'interests', true)}
        />
      </div>
      <h5>SKILLS</h5>
      <div className={styles.inputWrapper}>
        <label>Other</label>
        <CreatableSelect
          classNamePrefix="react-select"
          isMulti
          value={
            val.skills.other.length > 0
              ? val.skills.other.map((d) => {
                  return { label: d, value: d };
                })
              : []
          }
          options={OPTSskillsOther}
          onChange={(option) =>
            handleChange(option, 'skills.other', true, true)
          }
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Tools</label>
        <CreatableSelect
          classNamePrefix="react-select"
          isMulti
          value={
            val.skills.tools.length > 0
              ? val.skills.tools.map((d) => {
                  return { label: d, value: d };
                })
              : []
          }
          options={OPTSskillsTools}
          onChange={(option) =>
            handleChange(option, 'skills.tools', true, true)
          }
        />
      </div>

      <button onClick={handleSubmit} disabled={response.loading}>
        submit
      </button>
    </div>
  );
};

export default Character;
