import { arrayUnion } from 'firebase/firestore';
import { useDB } from 'hooks/useDB';
import { useStorage } from 'hooks/useStorage';
import _ from 'lodash';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';

import styles from './MediaSelect.module.css';

const MediaSelect = ({ type }) => {
  const { id } = useParams();
  const { document } = useStorage(type);
  const { updateDocument } = useDB(type);
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleSelect = (m) => {
    let selectedIndex = _.findIndex(selected, (s) => s.url === m.url);
    if (selectedIndex !== -1) {
      let temp = [...selected];
      _.pullAt(temp, selectedIndex);
      setSelected([...temp]);
    } else {
      setSelected([...selected, { ...m, mobile: m.path.includes('mobile') }]);
    }
  };

  const handleConfirm = async () => {
    await updateDocument(id, { media: arrayUnion(...selected) });
    setOpen(false);
    setSelected([]);
  };

  if (document)
    return (
      <>
        <Popup
          closeOnDocumentClick
          closeOnEscape
          modal
          open={isOpen}
          trigger={<button>Select media</button>}
          onClose={() => setSelected([])}
        >
          <div className={styles.container}>
            <button onClick={() => setOpen(!isOpen)}>close</button>
            <h2>select images</h2>
            <div className={styles.content}>
              {document.map((doc, i) => (
                <div
                  key={doc.path}
                  className={
                    styles.item +
                    `${
                      _.findIndex(selected, (s) => s.url === doc.url) !== -1
                        ? ' ' + styles.active
                        : ''
                    }`
                  }
                  onClick={() => handleSelect(doc)}
                >
                  {doc.type.includes('image') ? (
                    <img
                      className={styles.image}
                      src={doc.url}
                      alt={doc.alt || `respresentation of the ${type}`}
                    />
                  ) : doc.type.includes('video') ? (
                    <video className={styles.image}>
                      <source src={doc.url} type="video/mp4" />
                      Your browser does not support the video tag
                    </video>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
            <button onClick={handleConfirm}>confirm</button>
          </div>
        </Popup>
      </>
    );
};

export default MediaSelect;
