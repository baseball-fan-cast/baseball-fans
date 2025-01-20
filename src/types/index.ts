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
