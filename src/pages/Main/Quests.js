import _ from 'lodash';
// hooks
import { useSnapshotDB } from 'hooks/useSnapshotDB';
// components
import { FilterGroup, ListHeader } from 'components';
// layout
import layout from './Layouts/Quests.module.css';

const Quests = () => {
  let { documents } = useSnapshotDB('projects', true);
  let { documents: featuredDocs } = useSnapshotDB('projects', false, [
    'featured',
    '==',
    true,
  ]);
  let groupedDocs = _.groupBy(documents, 'primarySkill');

  if (featuredDocs)
    return (
      <div className={layout.wrapper}>
        <FilterGroup className={layout.filters} />
        {groupedDocs ? (
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
        ) : (
          <div>no documents found</div>
        )}
      </div>
    );
};

export default Quests;
