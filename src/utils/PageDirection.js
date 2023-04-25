const pageOrders = ['/quests', '/skills', '/', '/character', '/contact'];

export const getDirection = (currentPage, nextPage) => {
  let cP = pageOrders.indexOf(currentPage);
  let nP = pageOrders.indexOf(nextPage);
  if (cP === -1 || nP === -1) return null;
  return nP === cP ? null : nP > cP ? -1 : 1;
};

/**
 * 
 * @param {string} currentPage pathname
 * @param {number} direction 1 or -1
 * @returns the path of next page
 */
export const getNextPage = (currentPage, direction) => {
  let cP = pageOrders.indexOf(currentPage);
  let nP = cP + direction;
  return pageOrders[nP > pageOrders.length - 1 || nP < 0 ? cP : nP];
};