import { Link, useLocation } from 'react-router-dom';

const SkillItem = ({skill}) => {
  let location = useLocation();

  return (
    <>
      <Link
        to={`/skills/${skill.id}`}
        state={{ backgroundLocation: '/skills' }}
      >
        {skill.title}
      </Link>
    </>
  );
}
export default SkillItem