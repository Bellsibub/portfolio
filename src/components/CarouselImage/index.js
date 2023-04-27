
import styles from './CarouselImage.module.css'

const CarouselImage = ({media, current}) => {
  return (
    <>
      {media[current].type.includes('image') ? (
          <img
            className={styles.image}
            src={media[current].url}
            alt={media[current].alt || 'respresentation of the project'}
          />
        ) : media[current].type.includes('video') ? (
          <video className={styles.image}>
            <source src={media[current].url} type="video/mp4" />
            Your browser does not support the video tag
          </video>
        ) : (
          <></>
        )}
    </>
  )
}

export default CarouselImage

