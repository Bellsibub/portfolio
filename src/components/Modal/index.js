import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import Popup from 'reactjs-popup';

// hooks
import { useDocument } from 'hooks/useDocument';

import styles from './Modal.module.css';
import ProjectContent from 'components/ProjectContent';
import SkillsContent from 'components/SkillsContent';

const Modal = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [open, setOpen] = useState(true);
  const collection = location.pathname.includes('quests')
    ? 'projects'
    : location.pathname.includes('skills')
    ? 'skills'
    : null;
  let { document } = useDocument(collection);
  const closeModal = () => {
    setOpen(false);
    navigate(location.state.backgroundLocation);
  };

  return (
    <>
      {document && (
        <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
          <div className={styles.container}>
            <button type="button" className={styles.close} onClick={closeModal}>
              &times;
            </button>
            <div className={styles.header}>{document.title}</div>
            <div className={styles.content}>
              {(() => {
                switch (collection) {
                  case 'projects':
                    return <ProjectContent data={document} />;
                  case 'skills':
                    return <SkillsContent data={document} />;

                  default:
                    return <></>;
                }
              })()}
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};
export default Modal;
