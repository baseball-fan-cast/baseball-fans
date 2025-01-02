import React, { ReactNode, useMemo } from 'react';
import UserContext from './GameContext';

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = React.useState(null);
  const [searchBy, setSearchBy] = React.useState([]);

  const value = useMemo(() => {
    return {
      searchData,
      setSearchData,
      searchBy,
      setSearchBy
    };
  }, [searchData, setSearchData, searchBy, setSearchBy]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
