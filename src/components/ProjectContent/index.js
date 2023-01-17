

// components
import Carousel from "components/Carousel"

// styles
import line from 'styles/Line.module.css'

const ProjectContent = ({ data }) => {
  if(data) return (
    <>
      <Carousel media={data.media} />
      <div className={line.base} />
      <h4>Summary</h4>
      <p>{data.descriptionLong}</p>
    </>
  )
}
export default ProjectContent