export type ITeams = {
  id: number;
  name: string;
};

export type ITeamsData = {
  teams: ITeams[];
};

export type ITeamsResponse = {
  data: ITeamsData;
};

export type IPlayers = {
  id: number;
  fullName: string;
};

export type IPlayersData = {
  people: IPlayers[];
};

export type IPlayersResponse = {
  data: IPlayersData;
};
