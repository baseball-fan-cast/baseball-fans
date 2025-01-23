export type ITeams = {
  id: number | string;
  name: string;
  locationName?: string;
  link?: string;
};

export type ITeamsResponse = {
  data: ITeams[];
};

export type IPlayers = {
  id: number;
  fullName: string;
};

export type IPlayersResponse = {
  data: IPlayers[];
};

export type ITeam = {
  team: ITeams;
};

export type ITeamData = {
  away: ITeam;
  home: ITeam;
};
export type ISchedule = {
  gamePk: string;
  gameGuid: string;
  link: string;
  gameType: string;
  season: string;
  gameDate: string;
  officialDate: string;
  teams: ITeamData;
};

export type IScheduleResponse = {
  data: ISchedule[];
};

export type INewsItems = {
  creator: string;
  displayDate: string;
  displayDateEpoch: string;
  image: string;
  link: string;
  pubDate: string;
  title: string;
};

export type INewsData = {
  count: number;
  items: INewsItems[];
  lastUpdated: string;
};

export type INewsResponse = {
  data: INewsData;
};

export type ISubscriptionTeam = {
  allStarStatus?: string;
  id?: number;
  name?: string;
  link?: string;
  season?: number;
};

export type ISubscriptionPlayer = {
  allStarStatus?: string;
  id?: number;
  name?: string;
  link?: string;
  season?: number;
};

export type ISubscriptionData = {
  players: ISubscriptionPlayer[];
  teams: ISubscriptionTeam[];
};
export type ISubscriptionResponse = {
  data: ISubscriptionData;
};
export type IHighlightClipsMedia = {
  date: string;
  url: string;
};

export type IHighlightClipsGamesData = {
  name: string;
  media: IHighlightClipsMedia;
  teams: ISubscriptionTeam[];
};
export type IHighlightClipsData = {
  games: IHighlightClipsGamesData[];
};
export type IHighlightClipsResponse = {
  data: IHighlightClipsData;
};
