import { useState, useEffect } from 'react';
import _ from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// styling
import styles from './Carousel.module.css';
import { useViewport } from 'hooks/useViewport';
import CarouselImage from 'components/CarouselImage';

const Carousel = ({ media }) => {
  const { width } = useViewport();
  const breakpoint = 725;
  // 0 - left, 1 - right, 2-both
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dir, setDir] = useState(0);

  useEffect(() => {
    if (current === 0) setDirection(1);
    else if (current + 1 === _.size(media)) setDirection(0);
    else setDirection(2);
  }, [current, media]);

  const changeImage = (direct) => {
    let next = current;
    direct > 0 ? next++ : next--;
    if (next === -1 || next === _.size(media)) return null;
    setDir(direct);
    setCurrent(next);
  };

  const variants = {
    enter: (dir) => {
      return {
        x: dir > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => {
      return {
        x: dir < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };
  if (media)
    return media.length > 1 ? (
      <>
        <div className={styles.container}>
          {width > breakpoint && (
            <FontAwesomeIcon
              onClick={() => {
                if (direction !== 1) changeImage(-1);
              }}
              className={
                styles.icon + `${direction === 1 ? '' : ' ' + styles.active}`
              }
              icon={solid('angle-left')}
            />
          )}
          {media[current].type.includes('image') ? (
            <AnimatePresence initial={false} custom={dir} exitBeforeEnter>
              <motion.img
                className={styles.image}
                src={media[current].url}
                alt={media[current].alt || 'respresentation of the project'}
                key={current}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1.5}
                onDragEnd={(e, { velocity }) => {
                  if (velocity.x < -200) {
                    changeImage(1);
                  } else if (velocity.x > 200) {
                    changeImage(-1);
                  }
                }}
              />
            </AnimatePresence>
          ) : media[current].type.includes('video') ? (
            <AnimatePresence custom={direction} exitBeforeEnter>
              <motion.video
                className={styles.image}
                src={media[current].url}
                type="video/mp4"
                key={current}
                custom={current}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1.5}
                onDragEnd={(e, { velocity }) => {
                  if (velocity.x < -200) {
                    changeImage(1);
                  } else if (velocity.x > 200) {
                    changeImage(-1);
                  }
                }}
              >
                Your browser does not support the video tag
              </motion.video>
            </AnimatePresence>
          ) : (
            <></>
          )}

          {width > breakpoint && (
            <FontAwesomeIcon
              onClick={() => {
                if (direction !== 0) changeImage(1);
              }}
              className={
                styles.icon + `${direction === 0 ? '' : ' ' + styles.active}`
              }
              icon={solid('angle-right')}
            />
          )}
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
    ) : (
      <div className={styles.container}>
        <CarouselImage media={media} current={current} />
      </div>
    );
};

export default Carousel;
