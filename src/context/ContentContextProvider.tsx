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
  selectedFollower: any;
  setSelectedFollower: (data: any) => void;
};

const initialValue = {
  searchData: null,
  setSearchData: () => {},
  searchBy: [],
  setSearchBy: () => {},
  followers: [],
  setFollowers: () => {},
  selectedFollower: {},
  setSelectedFollower: () => {}
};

const ContentContext = createContext<IGameContext>(initialValue);

const ContentContextProvider = ({ children }: Props) => {
  const [searchData, setSearchData] = useState(null);
  const [searchBy, setSearchBy] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [selectedFollower, setSelectedFollower] = useState({});

  const value = useMemo(() => {
    return {
      searchData,
      setSearchData,
      searchBy,
      setSearchBy,
      followers,
      setFollowers,
      selectedFollower,
      setSelectedFollower
    };
  }, [
    searchData,
    setSearchData,
    searchBy,
    setSearchBy,
    followers,
    setFollowers,
    selectedFollower,
    setSelectedFollower
  ]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export { ContentContext, ContentContextProvider };
