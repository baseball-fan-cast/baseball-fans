import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { ContentContext } from '@/context/ContentContextProvider';
import { ISubscriptionPlayer } from '@/types';
import { isEmpty } from '@/helpers/helper';
import { IScheduleData } from './ComingSchedule';
import { LoadingIcon } from './LoadingIcon';
import { Loader } from 'lucide-react';

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

type IDigest = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  playersIds: ISubscriptionPlayer[];
  scheduleData: IScheduleData;
  loading: boolean;
  scheduleDataLoading: boolean;
};

export const Digest = ({
  content,
  playersIds,
  scheduleData,
  loading,
  scheduleDataLoading
}: IDigest) => {
  const { t } = useTranslation();
  const [data, setData] = useState('');
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { selectedFollower } = useContext(ContentContext);

  useEffect(() => {
    if (selectedFollower?.id && content && !isEmpty(content)) {
      console.log('content', content);
      const filtered = content?.filter(({ id }) => id == selectedFollower.id);
      setData(filtered);
    } else {
      setData(content);
    }
  }, [selectedFollower, content]);

  const getKeyGameResultsSection = (data) => {
    if (isEmpty(data)) return null;
    return (
      <div className="pr-4">
        <div className="text-xl font-bold mb-2 uppercase text-blue-900">
          {t('key_game_results')}
        </div>
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
        <div className="text-xl font-bold mb-2 uppercase text-blue-900">
          {t('monthly_analysis')}
        </div>
        <div className="text-md font-bold mt-2 py-3">{t('team_performance_highlights')}</div>
        <div className="text-gray-500">{data['Team Performance Highlights']}</div>
        <div className="text-md font-bold mt-2 py-3">{t('key_player_contributions')}</div>
        <div className="text-gray-500">{data['Key Player Contributions']}</div>
      </div>
    );
  };

  const getDivisionRaceImplications = (data) => {
    if (isEmpty(data)) return null;
    return (
      <div className="border-t-2 py-3 ">
        <div className="text-xl font-bold mb-2 uppercase text-blue-900">
          {t('division_race_implications')}
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
          {t('current_division_standings')}
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

  const getSchedule = (id, isPlayer, hideBorder = false) => {
    const teamId = isPlayer ? playersIds?.find((player) => player.id == id)?.teamId : id;
    const data = scheduleData[teamId];
    const currentTeam = data?.find(
      (item) => teamId == item.teams.away?.team?.id || teamId == item.teams.home?.team?.id
    )?.teams;
    const { away, home } = currentTeam || {};
    const currentTeamName = home?.team?.id == teamId ? home?.team?.name : away?.team?.name;

    return (
      <div className={`${hideBorder ? '' : 'py-3'} ${isPlayer || hideBorder ? '' : 'border-t-2'}`}>
        <div className="text-xl font-bold mb-2 uppercase text-blue-900">{t('schedule')}</div>
        {scheduleDataLoading && <Loader className="animate-spin w-12 h-12 text-blue-500" />}
        {isPlayer && (
          <div className="font-bold">
            {t('current_team')} - {currentTeamName}
          </div>
        )}
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
    if (isEmpty(data) || !data?.length) return null;
    return (
      <div className="p-2">
        {data?.map((team) => {
          return (
            <div key={team.id} className="bg-white p-4 rounded-lg mb-5">
              <div className="text-2xl font-bold mb-2 border-b-2 pb-3">{team.name}</div>
              <div className={`flex  mt-5  ${isMobile ? 'flex-wrap' : ''}`}>
                <div className={`mr-2 ${isMobile ? '' : 'w-[50%] border-r-2'}`}>
                  {getKeyGameResultsSection(team?.keyGameResults)}
                </div>
                <div className={`flex ${isMobile ? 'flex-wrap' : 'w-[50%]'}`}>
                  <div className={` ${isMobile ? '' : 'w-[50%] border-r-2 px-5'}`}>
                    {getMonthlyAnalysis(team?.monthlyAnalysis)}
                    {team.isPlayer
                      ? null
                      : getDivisionRaceImplications(team?.divisionRaceImplications)}
                  </div>
                  <div className={`${isMobile ? '' : 'w-[50%] px-5'}`}>
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

  const renderAllContent = () => {
    if (isEmpty(data) || !data?.length) return null;
    return (
      <div className="flex w-full flex-wrap gap-5 p-2">
        {data?.map((team, idx) => {
          const idxs = [0, 3, 6, 9, 12];
          if (!idxs.includes(idx)) return null;

          return (
            <div key={team.id} className="bg-white p-4 rounded-lg mb-5 w-[500px]">
              <div className="text-2xl font-bold mb-2 border-b-2 pb-3">{team.name}</div>
              <div className="flex mt-5">
                <div className="mr-2">{getKeyGameResultsSection(team?.keyGameResults)}</div>
              </div>
            </div>
          );
        })}
        {data?.map((team, idx) => {
          const idxs = [1, 4, 7, 10, 13];
          if (!idxs.includes(idx)) return null;

          return (
            <div key={team.id} className="bg-white p-4 rounded-lg mb-5 w-[500px]">
              <div className="text-2xl font-bold mb-2 border-b-2 pb-3">{team.name}</div>
              <div className="flex mt-5">
                <div className="px-5">
                  {getMonthlyAnalysis(team?.monthlyAnalysis)}
                  {team.isPlayer
                    ? null
                    : getDivisionRaceImplications(team?.divisionRaceImplications)}
                </div>
              </div>
            </div>
          );
        })}
        {data?.map((team, idx) => {
          const idxs = [2, 5, 8, 11, 14];
          if (!idxs.includes(idx)) return null;

          return (
            <div key={team.id} className="bg-white p-4 rounded-lg mb-5 w-[500px]">
              <div className="text-2xl font-bold mb-2 border-b-2 pb-3">{team.name}</div>
              <div className="flex mt-5">
                <div className=" flex px-5">
                  {team.isPlayer
                    ? null
                    : getCurrentDivisionStandings(team?.currentDivisionStandings)}
                  <div className={`${team.isPlayer ? '' : 'pl-3 border-l-2'}`}>
                    {getSchedule(team.id, team.isPlayer, true)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const renderContent =
    isEmpty(selectedFollower) && data?.length > 1 ? renderAllContent() : renderSingleContent();

  return (
    <div className="">
      {loading ? <LoadingIcon /> : null}
      {!isEmpty(data) && !loading ? renderContent : null}
    </div>
  );
};
