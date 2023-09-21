import GlobalContext from './GlobalContext';
import useFetchMeal from '../hooks/useFetchMeal';

type UserProviderProps = {
  children: React.ReactNode;
};

export default function ContextProvider({ children }: UserProviderProps) {
  const { getApi, resultsApi } = useFetchMeal();

  return (
    <GlobalContext.Provider value={ { getApi, resultsApi } }>
      {children}
    </GlobalContext.Provider>
  );
}
