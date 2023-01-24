import { useState, useEffect } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// styling
import styles from './Carousel.module.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

const DirectionalButton = () => {};

const Carousel = ({ media }) => {
  // 0 - left, 1 - right, 2-both
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (current === 0) setDirection(1);
    else if (current + 1 === _.size(media)) setDirection(0);
    else setDirection(2);
  }, [current, media]);

  const changeImage = (dir) => {
    let next = current;
    dir > 0 ? next++ : next--;
    setCurrent(next);
    // console.log(t);
  };

  return (
    <>
      <div className={styles.container}>
        <FontAwesomeIcon
          onClick={() => {
            if (direction !== 1) changeImage(-1);
          }}
          className={
            styles.icon + `${direction === 1 ? '' : ' ' + styles.active}`
          }
          icon={solid('angle-left')}
        />
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
        <FontAwesomeIcon
          onClick={() => {
            if (direction !== 0) changeImage(1);
          }}
          className={
            styles.icon + `${direction === 0 ? '' : ' ' + styles.active}`
          }
          icon={solid('angle-right')}
        />
      </div>
      <div className={styles.selector}>
        {media.map((c, i) => (
          <div
            className={
              styles.select +
              `${current === i ? ' ' + styles.activeSelect : ''}`
            }
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
