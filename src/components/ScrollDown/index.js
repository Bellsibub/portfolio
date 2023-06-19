import styles from "./ScrollDown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect } from "react";

const ScrollDown = (props) => {
  console.log(props);

  return (
    props.show && (
      <div
        className={
          styles.container + ` ${props.hitBottom ? styles.hide : styles.show}`
        }
      >
        <FontAwesomeIcon icon={solid("arrow-down")} />
      </div>
    )
  );
};

export default ScrollDown;
