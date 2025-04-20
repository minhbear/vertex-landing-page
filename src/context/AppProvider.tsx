"use client";

import React, { FC, ReactNode, useContext, createContext } from "react";
import "@/language";

const INITIAL_STATE = {} as AppContextProps;

const AppContext = createContext(INITIAL_STATE);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

interface AppProviderProps {
  children: ReactNode;
  listBlogData: any;
}

interface AppContextProps {}
