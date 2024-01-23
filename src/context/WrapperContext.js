import { createContext, useState } from "react";

export const WrapperContext = createContext();

export const WrapperProvider = ({ children }) => {
  const [height, setHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <WrapperContext.Provider
      value={([height, setHeight], [scrollProgress, setScrollProgress])}
    >
      {children}
    </WrapperContext.Provider>
  );
};
