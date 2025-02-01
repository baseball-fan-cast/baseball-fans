/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPlayers } from '@/types';
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
  headlines: any;
  setHeadlines: (data: any) => void;
  headlinesLoading: boolean;
  setHeadlinesLoading: (data: any) => void;
  highlightClips: any;
  setHighlightClips: (data: any) => void;
  teamSchedule: any;
  setTeamSchedule: (data: any) => void;
  filterBy: any;
  setFilterBy: (data: any) => void;
  allPlayers: [];
  setAllPlayers: (data: any) => void;
  selectedLatestNews: false;
  setSelectedLatestNews: (flag: boolean) => void;
  activeStep: number;
  setActiveStep: (data: any) => void;
};

const initialValue = {
  searchData: null,
  setSearchData: () => {},
  searchBy: [],
  setSearchBy: () => {},
  followers: [],
  setFollowers: () => {},
  selectedFollower: {},
  setSelectedFollower: () => {},
  headlines: {},
  setHeadlines: () => {},
  headlinesLoading: true,
  setHeadlinesLoading: () => {},
  highlightClips: [],
  setHighlightClips: () => {},
  teamSchedule: [],
  setTeamSchedule: () => {},
  filterBy: [],
  setFilterBy: () => {},
  allPlayers: [],
  setAllPlayers: () => {},
  selectedLatestNews: false,
  setSelectedLatestNews: () => {},
  activeStep: 0,
  setActiveStep: () => {},
};

const ContentContext = createContext<IGameContext>(initialValue);

const ContentContextProvider = ({ children }: Props) => {
  const [searchData, setSearchData] = useState(null);
  const [searchBy, setSearchBy] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [selectedFollower, setSelectedFollower] = useState({});
  const [headlines, setHeadlines] = useState({});
  const [headlinesLoading, setHeadlinesLoading] = useState(true);
  const [highlightClips, setHighlightClips] = useState({});
  const [teamSchedule, setTeamSchedule] = useState([]);
  const [filterBy, setFilterBy] = useState<string[]>([]);
  const [allPlayers, setAllPlayers] = useState<IPlayers[]>([]);
  const [selectedLatestNews, setSelectedLatestNews] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const value = useMemo(() => {
    return {
      searchData,
      setSearchData,
      searchBy,
      setSearchBy,
      followers,
      setFollowers,
      selectedFollower,
      setSelectedFollower,
      headlines,
      setHeadlines,
      headlinesLoading,
      setHeadlinesLoading,
      highlightClips,
      setHighlightClips,
      teamSchedule,
      setTeamSchedule,
      filterBy,
      setFilterBy,
      allPlayers,
      setAllPlayers,
      selectedLatestNews,
      setSelectedLatestNews,
      activeStep, setActiveStep
    };
  }, [
    searchData,
    setSearchData,
    searchBy,
    setSearchBy,
    followers,
    setFollowers,
    selectedFollower,
    setSelectedFollower,
    headlines,
    setHeadlines,
    headlinesLoading,
    setHeadlinesLoading,
    highlightClips,
    setHighlightClips,
    teamSchedule,
    setTeamSchedule,
    filterBy,
    setFilterBy,
    allPlayers,
    setAllPlayers,
    selectedLatestNews,
    setSelectedLatestNews,
    activeStep, setActiveStep
  ]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export { ContentContext, ContentContextProvider };
