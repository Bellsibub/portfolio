import { useSnapshotDB } from "hooks/useSnapshotDB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import styles from "./CharacterInfo.module.css";
import line from "styles/Line.module.css";

const CharacterInfo = () => {
  const { documents: info } = useSnapshotDB("character", false);

  if (info)
    return (
      <>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={solid("keyboard")} />
        </div>
        <div className={styles.container}>
          <div className={styles.headings}>
            <h3>class</h3>
            <h3>PROGRAMMER</h3>
          </div>
          <div className={line.base} />
          <ul className={styles.list}>
            <li>
              <h5>Name</h5>
              <p>
                {info[0].name} <span>({info[0].pronouns})</span>
              </p>
            </li>
            <li>
              <h5>d.o.b</h5>
              <p>{info[0].dob}</p>
            </li>
            <li>
              <h5>location</h5>
              <p>{info[0].location}</p>
            </li>
            <li>
              <h5>+ traits</h5>
              {info[0].traits.map((val) => (
                <p key={val}>{val}</p>
              ))}
            </li>
            <li>
              <h5>+ interests</h5>
              {info[0].interests.map((val) => (
                <p key={val}>{val}</p>
              ))}
            </li>
          </ul>
        </div>
      </>
    );
};

export default CharacterInfo;
