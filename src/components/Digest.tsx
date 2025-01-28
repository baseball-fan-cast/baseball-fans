import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import DataService from '@/services/DataService';
import { ContentContext } from '@/context/ContentContextProvider';
import { IScheduleResponse, ISubscriptionPlayer, ISubscriptionTeam } from '@/types';
import { isEmpty } from '@/helpers/helper';
import { IScheduleData } from './ComingSchedule';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const Digest = ({
  teamIds,
  playersIds
}: {
  teamIds: ISubscriptionTeam[];
  playersIds: ISubscriptionPlayer[];
}) => {
  const { i18n } = useTranslation();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  const { selectedFollower, searchBy, teamSchedule } = useContext(ContentContext);
  const [scheduleData, setScheduleData] = useState<IScheduleData>({});

  console.log('playersIds', playersIds);

  const getDigestByIds = (teams, players) => {
    setLoading(true);
    DataService.getDigestByIds(teams, players)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setData(response?.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDigest = () => {
    setLoading(true);
    DataService.getDigest()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setData(response?.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSeasonSchedule = () => {
    const groupBy = [...searchBy, ...teamIds, ...playersIds];
    const teamsData = Object.values(teamSchedule);

    DataService.getSeasonSchedule()
      .then((response: IScheduleResponse) => {
        const groupedData = groupBy?.reduce((result, item) => {
          const id = item?.isPlayer ? item?.teamId : item?.id;

          const responseData = response?.data || [];
          result[id] = [...responseData, ...teamsData]
            ?.filter(
              (item) => item.teams?.away?.team?.id === id || item.teams?.home?.team?.id === id
            )
            ?.map(({ gameDate, teams }) => {
              return { gameDate, teams };
            });
          return result;
        }, {}) as IScheduleData;

        setScheduleData(groupedData);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  console.log('scheduleData', scheduleData);
  useEffect(() => {
    if (searchBy.length > 0) {
      const searchData = searchBy.reduce(
        (acc, item) => {
          const { playerIcon, id } = item;
          const team = !playerIcon ? id : '';
          const player = playerIcon ? id : '';

          acc['teamIds'] = `${acc['teamIds']},${team}`;
          acc['playerIds'] = `${acc['playerIds']},${player}`;
          return acc;
        },
        { teamIds: '', playerIds: '' }
      );

      const teams = teamIds?.map((item) => item.id).join(',') + searchData?.teamIds;
      const players = playersIds?.map((item) => item.id).join(',') + searchData?.playerIds;
      getDigestByIds(teams, players);
    } else {
      getDigest();
    }
    getSeasonSchedule();
  }, [i18n.language, searchBy, teamIds, playersIds]);

  useEffect(() => {
    const { playerIcon, id } = selectedFollower;
    const teamId = !playerIcon ? id : '';
    const playersId = playerIcon ? id : '';
    if (teamId || playersId) {
      getDigestByIds(teamId, playersId);
    }
  }, [selectedFollower]);

  const getKeyGameResultsSection = (data) => {
    if (isEmpty(data)) return null;
    return (
      <div className="pr-4">
        <div className="text-xl font-bold mb-2 uppercase text-blue-900">Key Game Results</div>
        <div className="">
          {data?.map((gameRes) => (
            <div key={gameRes.games} className="py-3">
              <div className="font-bold">
                {gameRes.date} {gameRes.games}
              </div>
              <div className="text-gray-500">{gameRes.description}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getMonthlyAnalysis = (data) => {
    if (isEmpty(data)) return null;
    return (
      <div className="pr-4 pb-3">
        <div className="text-xl font-bold mb-2 uppercase text-blue-900">Monthly Analysis</div>
        <div className="text-md font-bold mt-2 py-3">Team Performance Highlights</div>
        <div className="text-gray-500">{data['Team Performance Highlights']}</div>
        <div className="text-md font-bold mt-2 py-3">Key Player Contributions</div>
        <div className="text-gray-500">{data['Key Player Contributions']}</div>
      </div>
    );
  };

  const getDivisionRaceImplications = (data) => {
    if (isEmpty(data)) return null;
    return (
      <div className="border-t-2 py-3 ">
        <div className="text-xl font-bold mb-2 uppercase text-blue-900">
          Division Race Implications
        </div>
        <div className="text-gray-500">{data.description}</div>
      </div>
    );
  };

  const getCurrentDivisionStandings = (data) => {
    if (isEmpty(data)) return null;
    return (
      <div className="pb-3">
        <div className="text-xl font-bold mb-2 uppercase text-blue-900">
          Current Division Standings
        </div>
        <ol className="list-decimal pl-3">
          {data?.map(({ name, record }) => (
            <li key={name} className="text-gray-500">
              {name} ({record})
            </li>
          ))}
        </ol>
      </div>
    );
  };

  const getSchedule = (id, isPlayer) => {
    const teamId = isPlayer ? playersIds.find((player) => player.id == id)?.teamId : id;
    const data = scheduleData[teamId];
    const currentTeam = data.find(
      (item) => teamId == item.teams.away?.team?.id || teamId == item.teams.home?.team?.id
    )?.teams;
    const { away, home } = currentTeam || {};
    const currentTeamName = home?.team?.id == teamId ? home?.team?.name : away?.team?.name;

    return (
      <div className={`py-3 ${isPlayer ? '' : 'border-t-2'}`}>
        <div className="text-xl font-bold mb-2 uppercase text-blue-900">Schedule</div>
        {isPlayer && <div className="font-bold">Current team - {currentTeamName}</div>}
        <ul className="list-disc list-inside ">
          {data?.slice(0, 5)?.map((item, index) => (
            <li key={index} className="text-gray-500">
              {`${monthNames[new Date(item?.gameDate)?.getMonth()]} ${new Date(item?.gameDate)?.getDate()}  - vs `}
              {teamId != item.teams.away?.team?.id ? item.teams.away?.team?.name : ''}
              {teamId != item.teams.home?.team?.id ? item.teams.home?.team?.name : ''}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSingleContent = () => {
    return (
      <div className="p-2">
        {data?.map((team) => {
          return (
            <div key={team.id} className="bg-white p-4 rounded-lg mb-5">
              <div className="text-2xl font-bold mb-2 border-b-2 pb-3">{team.name}</div>
              <div className="flex mt-5">
                <div className="border-r-2 mr-2  w-[50%]">
                  {getKeyGameResultsSection(team?.keyGameResults)}
                </div>
                <div className="flex w-[50%]">
                  <div className="border-r-2 w-[50%] px-5">
                    {getMonthlyAnalysis(team?.monthlyAnalysis)}
                    {team.isPlayer
                      ? null
                      : getDivisionRaceImplications(team?.divisionRaceImplications)}
                  </div>
                  <div className="w-[50%] px-5">
                    {team.isPlayer
                      ? null
                      : getCurrentDivisionStandings(team?.currentDivisionStandings)}
                    {getSchedule(team.id, team.isPlayer)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="">
      {loading ? (
        <div className="min-h-[250px]">
          <Spinner /> Loading ...
        </div>
      ) : null}
      {data && !loading ? renderSingleContent() : null}
    </div>
  );
};
