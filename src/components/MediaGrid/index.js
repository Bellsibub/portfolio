import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import styles from './MediaGrid.module.css';

const MediaGrid = ({
  media,
  handleMediaSelect,
  handleFeatureSelect,
  featuredImage,
}) => {
  const [selected, setSelected] = useState([]);
  const [primary, setPrimary] = useState();

  const handleSelect = (m, i) => {
    if (_.findIndex(selected, (s) => s === i) !== -1) {
      console.log('the image is already selected');
      let temp = [...selected];
      _.pull(temp, i);
      setSelected([...temp]);
      handleMediaSelect(m, true);
    } else {
      setSelected([...selected, i]);
      handleMediaSelect(m);
    }
  };

  const handlePrimary = (m) => {
    if (primary !== m.url) {
      setPrimary(m.url);
      handleFeatureSelect(m.url);
    }
  };

  useEffect(() => {
    if (media) {
      setSelected([]);
      setPrimary(featuredImage || null);
    }
  }, [featuredImage, media]);

  return (
    <div className={styles.container}>
      {media.map((m, i) => (
        <div
          key={m.url}
          className={
            styles.item +
            `${
              _.findIndex(selected, (s) => s === i) !== -1
                ? ' ' + styles.active
                : ''
            }`
          }
        >
          <div
            onClick={() => handlePrimary(m)}
            className={
              styles.feature +
              `${m.url === primary ? ' ' + styles.primary : ''}`
            }
          >
            <FontAwesomeIcon icon={regular('star')} />
          </div>
          {m.type.includes('image') ? (
            <img
              onClick={() => handleSelect(m, i)}
              className={styles.image}
              src={m.url}
              alt={m.alt || 'respresentation of the project'}
            />
          ) : m.type.includes('video') ? (
            <video className={styles.image} onClick={() => handleSelect(m, i)}>
              <source src={m.url} type="video/mp4" />
              Your browser does not support the video tag
            </video>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
