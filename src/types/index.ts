export type ITeams = {
  id: number | string;
  name: string;
  locationName: string;
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
