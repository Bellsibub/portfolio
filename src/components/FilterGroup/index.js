import { useSearchParams } from 'react-router-dom';
import _ from 'lodash';

// hooks

// components
import FilterItem from 'components/FilterItem';

// styles

const FilterGroup = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let filterParams = searchParams.get('filter');

  const toggleFilter = (filtername, active) => {
    let _filterGroup = filterParams ? filterParams.split(',') : [];
    if (!active) {
      _filterGroup.push(filtername);
    } else {
      _filterGroup = _.pull(_filterGroup, filtername);
    }
    if (_filterGroup.length === 0) {
      setSearchParams({});
    } else {
      setSearchParams({ filter: _filterGroup.toString(',') });
    }
  };

  return (
    <div>
      <FilterItem name="react" handleClick={toggleFilter} />
      <FilterItem name="backend" handleClick={toggleFilter} />
    </div>
  );
};

export default FilterGroup;
