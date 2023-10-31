import { useContext, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";

import Popup from "reactjs-popup";

// hooks
import { useDocument } from "hooks/useDocument";

import styles from "./Modal.module.css";
import ProjectContent from "components/ProjectContent";
import SkillsContent from "components/SkillsContent";
import ModalHeader from "components/ModalHeader";
import EquipmentContent from "components/EquipmentContent";
import Footer from "components/Footer";

const Modal = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [open, setOpen] = useState(true);
  const collection = location.pathname.includes("quests")
    ? "projects"
    : location.pathname.includes("skills")
    ? "skills"
    : location.pathname.includes("equipment")
    ? "equipment"
    : null;
  const { document } = useDocument(collection);

  const closeModal = () => {
    setOpen(false);
    navigate(location.state.backgroundLocation);
  };

  return (
    <>
      {document && (
        <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
            <div className={styles.container}>
              <button
                type="button"
                className={styles.closeWrapper}
                onClick={closeModal}
              >
                <FontAwesomeIcon
                  className={styles.closeIcon}
                  icon={regular("circle-xmark")}
                />
              </button>
              <ModalHeader data={document} collection={collection} />
              <div className={styles.content}>
                {(() => {
                  switch (collection) {
                    case "projects":
                      return <ProjectContent data={document} />;
                    case "skills":
                      return <SkillsContent data={document} />;
                    case "equipment":
                      return <EquipmentContent data={document} />;
                    default:
                      return <></>;
                  }
                })()}
              </div>
              <Footer modal />
            </div>
        </Popup>
      )}
    </>
  );
};
export default Modal;
