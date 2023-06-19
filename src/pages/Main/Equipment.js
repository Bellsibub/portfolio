// hooks
import { CharacterInfo, ListHeader } from "components";
import { useSnapshotDB } from "hooks/useSnapshotDB";
// layout
import layout from "./Layouts/Equipment.module.css";

const Equipment = () => {
  let { documents } = useSnapshotDB("equipment", false, null, [
    "start",
    "desc",
  ]);

  return (
    <div className={layout.wrapper}>
      
      <div className={layout.list}>
        {documents ? (
          <ListHeader title="" list={documents} />
        ) : (
          <div>no documents found</div>
        )}
      </div>
    </div>
  );
};

export default Equipment;
