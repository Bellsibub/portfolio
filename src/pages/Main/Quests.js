import _ from "lodash";
// hooks
import { useSnapshotDB } from "hooks/useSnapshotDB";
// components
import { FilterGroup, ListHeader } from "components";
// layout
import layout from "./Layouts/Quests.module.css";
import { useViewport } from "hooks/useViewport";

const Quests = () => {
  const { width } = useViewport();
  const breakpoint = 725;
  let { documents } = useSnapshotDB("projects", true);
  let { documents: featuredDocs } = useSnapshotDB("projects", false, [
    "featured",
    "==",
    true,
  ]);
  let groupedDocs = _.groupBy(documents, "primarySkill");

  if (documents)
    return (
      <div className={layout.wrapper}>
        <FilterGroup className={layout.filters} />
        <div className={layout.list}>
          {Object.entries(groupedDocs).map(([skillname, projects]) => (
            <ListHeader
              key={skillname}
              list={projects}
              title={skillname}
              projectCount
              accordian
            />
          ))}
          <ListHeader
            featured
            list={featuredDocs}
            title="featured"
            projectCount
            // accordian
          />
        </div>
      </div>
    );
};

export default Quests;
