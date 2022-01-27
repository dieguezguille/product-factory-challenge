import React, { createContext, Dispatch, useState } from 'react';

type AppContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues = {
  isLoading: false,
  setIsLoading: () => {},
};

export const appContext = createContext<AppContextType>(defaultValues);

export const AppProvider: React.FC = (props) => {
  const { children } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const contextObject = {
    isLoading,
    setIsLoading,
  };

  return (
    <appContext.Provider value={contextObject}>{children}</appContext.Provider>
  );
};

export default AppProvider;
