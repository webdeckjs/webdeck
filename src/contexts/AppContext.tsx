import { createContext, useContext } from "react";
import { AppContainerType } from "../bootstrap";

export const AppContext = createContext({} as AppContainerType);

export const useAppContext = () => {
  return useContext(AppContext);
};
