import { createContext, useContext } from "react";

export const RootStoreContext = createContext(null);

export const useStores = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error("не обернули в провайдер");
  }

  return context;
};
