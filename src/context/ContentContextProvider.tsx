/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, ReactNode, useMemo, useState } from 'react';

type Props = {
  children?: ReactNode;
};

type IGameContext = {
  searchData: any;
  setSearchData: (data: any) => void;
  searchBy: any;
  setSearchBy: (data: any) => void;
  followers: any;
  setFollowers: (data: any) => void;
};

const initialValue = {
  searchData: null,
  setSearchData: () => {},
  searchBy: [],
  setSearchBy: () => {},
  followers: [],
  setFollowers: () => {}
};

const ContentContext = createContext<IGameContext>(initialValue);

const ContentContextProvider = ({ children }: Props) => {
  const [searchData, setSearchData] = useState(null);
  const [searchBy, setSearchBy] = useState([]);
  const [followers, setFollowers] = useState([]);

  const value = useMemo(() => {
    return {
      searchData,
      setSearchData,
      searchBy,
      setSearchBy,
      followers,
      setFollowers
    };
  }, [searchData, setSearchData, searchBy, setSearchBy, followers, setFollowers]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export { ContentContext, ContentContextProvider };
