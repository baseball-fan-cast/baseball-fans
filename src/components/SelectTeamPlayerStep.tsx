/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { CustomSearch } from './CustomSearch';
import { ContentContext } from '@/context/ContentContextProvider';
import { AvatarBadge } from './AvatarBadge';
import DataService from '@/services/DataService';
import { IPlayers, ITeams, ITeamsResponse } from '@/types';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export const SelectTeamPlayerStep = () => {
  const { t } = useTranslation();
  const { followers, setFollowers } = useContext(ContentContext);
  const [teams, setTeams] = useState<ITeams[]>([]);
  const [players, setPlayers] = useState<IPlayers[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<ITeams[]>([]);
  const [viewPlayers, setViewPlayers] = useState(false);
  const [selectedTeamDetail, setSelectedTeamDetail] = useState<ITeams>();

  const getAllTeams = async () => {
    await DataService.getAllTeams()
      .then((response: ITeamsResponse) => {
        setTeams(response?.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  const getPlayersByTeam = async (team) => {
    await DataService.getPlayersByTeam(team)
      .then((response: any) => {
        setPlayers(response.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  useEffect(() => {
    setSelectedTeam(followers);
  }, [followers]);

  const onSelectTeam = (team) => {
    if (selectedTeam?.some(({ id }) => id === team.id)) {
      const filterSelect = selectedTeam.filter(({ id }) => id !== team.id);
      setSelectedTeam(filterSelect);
      const filteredFollowers = followers.filter(({ id }) => id !== team.id);
      setFollowers(filteredFollowers);
    } else {
      const { id, name, abbreviation, currentTeam, teamName } = team || {};
      const teamIcon = !teamName
        ? `https://midfield.mlbstatic.com/v1/team/${currentTeam?.id}/spots/96`
        : `https://midfield.mlbstatic.com/v1/team/${id}/spots/96`;
      const playerIcon = !teamName
        ? `https://img.mlbstatic.com/mlb-photos/image/upload/t_w60/t_headshot_silo/v1/people/${id}/headshot/silo/current`
        : null;

      const follow = { id, name, icon: teamIcon, abbreviation, playerIcon };
      setSelectedTeam([...selectedTeam, ...[team]]);
      setFollowers([...followers, follow]);
    }
  };

  const onSelectPlayers = async (team) => {
    const { id } = team;
    getPlayersByTeam(id);
    setViewPlayers(true);
    setSelectedTeamDetail(team);
  };

  const renderTeams = () => (
    <div className="flex flex-wrap gap-4 mt-9 m-auto">
      {teams?.slice(0, 20)?.map((team) => {
        return (
          <div
            className={`p-4 border rounded-md relative min-w-[250px] ${selectedTeam.find(({ id }) => id === team?.id) ? 'bg-slate-50' : 'bg-white'}`}
            key={team.id}
          >
            <Avatar className="flex justify-center">
              <AvatarImage src={`https://midfield.mlbstatic.com/v1/team/${team?.id}/spots/96`} />
            </Avatar>
            <input
              id="checkbox"
              type="checkbox"
              value=""
              onClick={() => onSelectTeam(team)}
              checked={!!selectedTeam.find(({ id }) => id === team?.id)}
              className="absolute right-2 top-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 rounded-lx focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <Text as="div">{team?.locationName}</Text>
            <Text as="div" className="font-bold">
              {team.name}
            </Text>
            <Button
              className="my-3 flex justify-center align-center"
              onClick={() => onSelectPlayers(team)}
            >
              <Text className="text-slate-500">{t('view_players')}</Text>
              <ChevronRight />
            </Button>
          </div>
        );
      })}
    </div>
  );

  const renderPlayers = () => (
    <div>
      <div className="flex gap-4 mt-9 items-center justify-between">
        <div className="flex items-center gap-2" onClick={() => setViewPlayers(false)}>
          <ChevronLeft />
          <Avatar className="flex justify-center pl-3">
            <AvatarImage
              className="bg-red-700 rounded-full"
              src={`https://midfield.mlbstatic.com/v1/team/${selectedTeamDetail?.id}/spots/50`}
            />
          </Avatar>
          <Text>{selectedTeamDetail?.name}</Text>
        </div>
        <div
          className={`px-9 py-1 align-center border rounded-md bg-slate-50  ${followers.find(({ id }) => id === selectedTeamDetail?.id) ? 'bg-slate-50' : 'bg-white'}`}
        >
          <Button onClick={() => onSelectTeam(selectedTeamDetail)}>
            <Text className="font-bold">{t('following')}</Text>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-9 m-auto">
        {players?.slice(0, 20)?.map((person) => {
          return (
            <div
              className={`p-4 border rounded-md relative min-w-[250px] py-9 ${selectedTeam.find(({ id }) => id === person?.id) ? 'bg-slate-50' : 'bg-white'}`}
              key={person.id}
            >
              <Avatar className="flex justify-center">
                <AvatarImage
                  className="bg-red-700 rounded-full"
                  src={`https://img.mlbstatic.com/mlb-photos/image/upload/t_w60/t_headshot_silo/v1/people/${person.id}/headshot/silo/current`}
                />
              </Avatar>
              <input
                id="checkbox"
                type="checkbox"
                value=""
                onClick={() => onSelectTeam({ ...person, name: person.fullName })}
                checked={!!selectedTeam.find(({ id }) => id === person?.id)}
                className="absolute right-2 top-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 rounded-lx focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <Text as="div" className="text-center mt-4">
                {person.fullName?.split(' ')[0]}
              </Text>
              <Text as="div" className="font-bold text-center">
                {person.fullName?.split(' ')[1]}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-ful gap-1 min-h-[300px]">
      <Text className="text-2xl font-bold mb-2">{t('select_team')}</Text>
      <Flex align="center" className="gap-4 my-3" wrap="wrap">
        {followers?.map(({ name, icon, playerIcon, abbreviation }) => (
          <AvatarBadge
            key={name}
            content={name}
            isClearable
            data={[
              { src: icon, fallback: abbreviation },
              ...(playerIcon ? [{ src: playerIcon, fallback: abbreviation }] : [])
            ]}
          />
        ))}
      </Flex>
      <div className="w-3/6 m-auto">
        <CustomSearch isFollowing />
      </div>
      {viewPlayers ? renderPlayers() : renderTeams()}
    </div>
  );
};
