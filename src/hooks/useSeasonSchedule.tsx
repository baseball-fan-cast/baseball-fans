import { useContext, useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { IScheduleResponse } from '@/types';
import { ContentContext } from '@/context/ContentContextProvider';
import { IScheduleData } from '@/components/ComingSchedule';
import { useSubscription } from './useSubscription';

export const useSeasonSchedule = () => {
  const [scheduleData, setScheduleData] = useState<IScheduleData>({});

  const [scheduleDataLoading, setScheduleDataLoading] = useState(true);
  const { searchBy, teamSchedule } = useContext(ContentContext);
  const { subscriptionTeams: teamIds, subscriptionPlayers: playersIds } = useSubscription();

  const getSeasonSchedule = () => {
    const groupBy = [...searchBy, ...teamIds, ...playersIds];
    const teamsData = Object.values(teamSchedule);
    const teamsId = teamIds?.map(({id}) => id)?.join(" ,");
    const playersId = playersIds?.map(({ teamId }) => teamId)?.join(" ,");
    const list = teamsId + "," +playersId;
    setScheduleDataLoading(true);
    DataService.getSeasonScheduleByIds(list, playersId)
      .then((response: IScheduleResponse) => {
        const groupedData = groupBy?.reduce((result, item) => {
          const id = item?.isPlayer ? item?.teamId : item?.id;
          const responseData = response?.data || [];
          const teamData = teamsData?.length ? teamsData?.flat() : [];
          result[id] = [...responseData, ...teamData]
            ?.filter(
              (item) => {
              return item.teams?.away?.team?.id === id || item.teams?.home?.team?.id === id || item.teams?.away?.team?.id === item?.teamId || item.teams?.home?.team?.id === item?.teamId
              }
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
      })
      .finally(() => {
        setScheduleDataLoading(false);
      });
  };

  useEffect(() => {
    if(teamIds.length || playersIds.length) {
      getSeasonSchedule();
    }
  }, [searchBy, teamIds, playersIds, teamSchedule]);

  return { scheduleData, scheduleDataLoading };
};
