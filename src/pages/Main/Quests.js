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
    return width > breakpoint ? (
      <div className={layout.wrapper}>
        <FilterGroup className={layout.filters} />
        <div className={layout.list}>
          <ListHeader
            featured
            list={featuredDocs}
            title="featured"
            projectCount
            accordian
          />
          {Object.entries(groupedDocs).map(([skillname, projects]) => (
            <ListHeader
              key={skillname}
              list={projects}
              title={skillname}
              projectCount
              accordian
            />
          ))}
        </div>
      </div>
    ) : (
      <div className={layout.wrapper}>
        <div className={layout.list}>
          <ListHeader
            featured
            list={featuredDocs}
            title="featured"
            projectCount
            accordian
          />
          <FilterGroup className={layout.filters} />
          {Object.entries(groupedDocs).map(([skillname, projects]) => (
            <ListHeader
              key={skillname}
              list={projects}
              title={skillname}
              projectCount
              accordian
            />
          ))}
        </div>
      </div>
    );
};

export default Quests;
