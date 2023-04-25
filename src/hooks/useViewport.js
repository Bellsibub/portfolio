import { useContext } from 'react';
import { ViewportContext } from 'context/ViewportContext';

export const useViewport = () => {
  const { width, height } = useContext(ViewportContext);
  return { width, height };
};
