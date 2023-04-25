import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import { getDirection, getNextPage } from './PageDirection';

// const pageOrders = ['/quests', '/skills', '/', '/character', '/contact'];

// const getDirection = (currentPage, nextPage) => {
//   let cP = pageOrders.indexOf(currentPage);
//   let nP = pageOrders.indexOf(nextPage);
//   if (cP === -1 || nP === -1) return null;
//   return nP === cP ? null : nP > cP ? -1 : 1;
// };

// const getNextPage = (currentPage, direction) => {
//   let cP = pageOrders.indexOf(currentPage);
//   let nP = cP + direction;
//   return pageOrders[nP > pageOrders.length - 1 || nP < 0 ? cP : nP];
// };

const pageAnimations = {
  out: (custom) => {
    return { x: custom > 0 ? 1000 : -1000, opacity: 1 };
  },
  in: (custom) => {
    return { x: custom < 0 ? 1000 : -1000, opacity: 0 };
  },
  center: {
    x: 0,
    opacity: 1,
  },
};

const pageTransitions = {
  duration: 0.5,
};

const AnimatedPage = ({ children }) => {
  let navigate = useNavigate();
  let location = useLocation();
  const { pathname, state } = location;

  const hasMount = useRef(false);
  const prevPath = useRef();
  const direction = useRef();

  if (!hasMount.current) {
    // mounted
    hasMount.current = true;
    prevPath.current = pathname;
  } else {
    // update
    if (state && state.nested) {
      prevPath.current = '/quests';
      direction.current = getDirection('/skills', '/quests');
    } else {
      if (prevPath.current !== pathname) {
        direction.current = getDirection(prevPath.current, pathname);
        if (direction.current !== null) {
          prevPath.current = pathname;
        }
      }
    }
  }

  return (
    <AnimatePresence initial={false} exitBeforeEnter custom={direction.current}>
      <motion.main
        key={prevPath.current}
        custom={direction.current}
        initial="in"
        animate="center"
        exit="out"
        variants={pageAnimations}
        transition={pageTransitions}
        className="content-container"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1.5}
        onDragEnd={(e, info) => {
          if (info.velocity.x < -200) {
            navigate(getNextPage(pathname, 1));
          } else if (info.velocity.x > 200) {
            navigate(getNextPage(pathname, -1));
          }
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};
export default AnimatedPage;
