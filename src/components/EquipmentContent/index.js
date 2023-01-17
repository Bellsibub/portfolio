// styles
import Tags from 'components/Tags'
import line from 'styles/Line.module.css'

const EquipmentContent = ({data}) => {
  if (data) return (
    <>
      <p>{data.description}</p>
      <div className={line.base} />
      <h4>Skills used and/or learned</h4>
      <Tags content={data.skills} />
    </>
  )
}

export default EquipmentContent