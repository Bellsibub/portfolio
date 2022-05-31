import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

// hooks

// styles
import styles from './FilterItem.module.css';

let cx = classNames.bind(styles);

const FilterItem = ({ name, handleClick }) => {
  let [searchParams] = useSearchParams();
  let filterParam = searchParams.get('filter');
  let activeParam = filterParam && filterParam.includes(name);
  const [isActive, setIsActive] = useState(activeParam);

  const handleToggle = () => {
    setIsActive(!isActive);
    handleClick(name, isActive);
  };
  
  let buttonClass = cx({
    base: true,
    active: isActive
  })

  return (
    <button onClick={handleToggle} className={buttonClass}>
      {name}
    </button>
  );
};

export default FilterItem;
