import React, { useState, useContext, useEffect } from 'react';
import { Text } from '@radix-ui/themes';
import Select from 'react-select';
import DataService from '@/services/DataService';
import gameContext from '../context/GameContext';
import { useTranslation } from 'react-i18next';

export const CustomSearch = () => {
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>([]);
  const [teams, setTeams] = useState<never[]>([]);
  const [players, setPlayers] = useState<never[]>([]);
  const { searchBy, setSearchBy } = useContext(gameContext);

  const getAllTeams = () => {
    DataService.getAllTeams()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setTeams(response.data?.teams);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  const getAllPlayers = () => {
    DataService.getAllPlayers()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
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
    setData([
      {
        label: 'Teams',
        options: teams
      },
      {
        label: 'Players',
        options: players
      }
    ]);
  }, []);

  useEffect(() => {
    if (searchBy.length) {
      const filteredTeams = [...teams]?.filter((team) =>
        searchBy?.every(({ id }) => id !== team?.id)
      );

      const filteredPlayers = [...players]?.filter((player) =>
        searchBy?.every(({ id }) => id !== player?.id)
      );
      setData([
        {
          label: 'Teams',
          options: filteredTeams
        },
        {
          label: 'Players',
          options: filteredPlayers
        }
      ]);
    }
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
    />
  );
};
