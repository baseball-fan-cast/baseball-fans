/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext, useEffect, ReactNode } from 'react';
import { Text } from '@radix-ui/themes';
import Select from 'react-select';
import DataService from '@/services/DataService';
import { ContentContext } from '../context/ContentContextProvider';
import { useTranslation } from 'react-i18next';
import { IPlayers, IPlayersResponse, ITeams, ITeamsResponse } from '@/types';

type IData = {
  label: string | ReactNode;
  options: ITeams[] | IPlayers[];
};

export const CustomSearch = ({ isFollowing }: { isFollowing?: boolean }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<IData[]>([]);
  const [teams, setTeams] = useState<ITeams[]>([]);
  const [players, setPlayers] = useState<IPlayers[]>([]);
  const {
    searchBy,
    setSearchBy,
    followers,
    setFollowers,
    teamSchedule = [],
    setTeamSchedule
  } = useContext(ContentContext);

  const getAllTeams = async () => {
    await DataService.getAllTeams()
      .then((response: ITeamsResponse) => {
        setTeams(response?.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  const getAllPlayers = async () => {
    await DataService.getAllPlayers()
      .then((response: IPlayersResponse) => {
        const data = response.data?.map((player) => {
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
    const filterBy = [...searchBy, ...followers];
    setData([
      {
        label: <Text>{t('teams')}</Text>,
        options: [...teams]?.filter((team) => filterBy?.every(({ id }) => id !== team?.id))
      },
      {
        label: <Text>{t('players')}</Text>,
        options: [...players]?.filter((player) => filterBy?.every(({ id }) => id !== player?.id))
      }
    ]);
  }, [searchBy, followers, teams, players]);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 56,
      minHeight: 56
    })
  };

  const getDataByTeamId = async (id) => {
    await DataService.getScheduleByTeamId(id)
      .then((response: any) => {
        setTeamSchedule({ ...teamSchedule, ...{ [`${id}`]: response?.data } });
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };
  const handleSelect = async (value) => {
    if (!value) return;
    const { id, name, abbreviation, isPlayer, currentTeam } = value || {};
    const teamIcon = isPlayer
      ? `https://midfield.mlbstatic.com/v1/team/${currentTeam?.id}/spots/96`
      : `https://midfield.mlbstatic.com/v1/team/${id}/spots/96`;
    const playerIcon = isPlayer
      ? `https://img.mlbstatic.com/mlb-photos/image/upload/t_w60/t_headshot_silo/v1/people/${id}/headshot/silo/current`
      : null;

    if (isFollowing) {
      setFollowers([...followers, { id, name, icon: teamIcon, abbreviation, playerIcon }]);
    } else {
      setSearchBy([...searchBy, { id, name, icon: teamIcon, abbreviation, playerIcon }]);
      await getDataByTeamId(id);
    }
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
