// Make sure you also wrap the root of your application in the new ViewportProvider, so that the newly rewritten useViewport Hook will have access to the Context when used further down in the component tree.


import { createContext, useEffect, useState } from 'react';

export const ViewportContext = createContext();

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  
  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  );
  
};