// styles
import Tags from 'components/Tags';
import line from 'styles/Line.module.css';

const EquipmentContent = ({ data }) => {
  if (data)
    return (
      <>
        <p>{data.description}</p>
        <div className={line.base} />
        <h4>Skills and tools used and/or learned</h4>
        <Tags content={data.skills} />
        <div className={line.base} />
        <h5>Other skills</h5>
        <Tags content={data.otherSkills} />
        <h5>Tools</h5>
        <Tags content={data.tools} />
      </>
    );
};

export default EquipmentContent;
