import React, { useState, useContext, useEffect, ReactNode } from 'react';
import { Text } from '@radix-ui/themes';
import Select from 'react-select';
import DataService from '@/services/DataService';
import { ContentContext } from '../context/ContentContextProvider';
import { useTranslation } from 'react-i18next';

type ITeams = {
  id: number;
  name: string;
};
type ITeamsData = {
  teams: ITeams[];
};
type ITeamsResponse = {
  data: ITeamsData;
};

type IPlayers = {
  id: number;
  fullName: string;
};
type IPlayersData = {
  people: IPlayers[];
};
type IPlayersResponse = {
  data: IPlayersData;
};
type IData = {
  label: string | ReactNode;
  options: ITeams[] | IPlayers[];
};

export const CustomSearch = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<IData[]>([]);
  const [teams, setTeams] = useState<ITeams[]>([]);
  const [players, setPlayers] = useState<IPlayers[]>([]);
  const { searchBy, setSearchBy } = useContext(ContentContext);

  const getAllTeams = () => {
    DataService.getAllTeams()
      .then((response: ITeamsResponse) => {
        setTeams(response.data?.teams);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  const getAllPlayers = () => {
    DataService.getAllPlayers()
      .then((response: IPlayersResponse) => {
        const data = response.data?.people.map((player) => {
          return { ...player, name: player.fullName };
        });
        setPlayers(data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    getAllTeams();
    getAllPlayers();
  }, []);

  useEffect(() => {
    setData([
      {
        label: <Text>{t('teams')}</Text>,
        options: [...teams]?.filter((team) => searchBy?.every(({ id }) => id !== team?.id))
      },
      {
        label: <Text>{t('players')}</Text>,
        options: [...players]?.filter((player) => searchBy?.every(({ id }) => id !== player?.id))
      }
    ]);
  }, [searchBy, teams, players]);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 56,
      minHeight: 56
    })
  };
  const handleSelect = (value) => {
    if (!value) return;
    const { id, name, abbreviation, isPlayer, currentTeam } = value || {};
    const teamIcon = isPlayer
      ? `https://midfield.mlbstatic.com/v1/team/${currentTeam?.id}/spots/96`
      : `https://midfield.mlbstatic.com/v1/team/${id}/spots/96`;
    const playerIcon = isPlayer
      ? `https://img.mlbstatic.com/mlb-photos/image/upload/t_w60/t_headshot_silo/v1/people/${id}/headshot/silo/current`
      : null;
    setSearchBy([...searchBy, { id, name, icon: teamIcon, abbreviation, playerIcon }]);
  };

  return (
    <Select
      placeholder={<Text>{t('searchForTeamPlayers')}</Text>}
      name="teams and players"
      options={data}
      styles={customStyles}
      className="min-w-[250px] basic-multi-select whitespace-nowrap h-14"
      classNamePrefix="select"
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option.name}
      onChange={handleSelect}
      isClearable
      value=""
    />
  );
};
