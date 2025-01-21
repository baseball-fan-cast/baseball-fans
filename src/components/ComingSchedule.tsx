import React, { useEffect, useState, useContext } from 'react';
import { Box, Text, Flex, Link } from '@radix-ui/themes';
import DataService from '@/services/DataService';
import { useTranslation } from 'react-i18next';
import { IScheduleResponse, ITeamData } from '@/types';
import { ContentContext } from '@/context/ContentContextProvider';

export type GroupedDate = {
  gameDate: string;
  teams: ITeamData;
};

export type IScheduleData = {
  [key: number]: GroupedDate[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ComingSchedule = ({ subscriptions }: { subscriptions: any }) => {
  const { t } = useTranslation();
  const { selectedFollower } = useContext(ContentContext);

  const [scheduleData, setScheduleData] = useState<IScheduleData>({});
  const [content, setContent] = useState<IScheduleData>({});

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
  const getSeasonSchedule = () => {
    const groupBy = subscriptions?.map((sub) => sub.id);
    DataService.getSeasonSchedule()
      .then((response: IScheduleResponse) => {
        const groupedData = groupBy?.reduce((result, id) => {
          result[id] = response?.data
            ?.filter(
              (item) => item.teams?.away?.team?.id === id || item.teams?.home?.team?.id === id
            )
            ?.map(({ gameDate, teams }) => {
              return { gameDate, teams };
            });
          return result;
        }, {}) as IScheduleData;
        setScheduleData(groupedData);
        setContent(groupedData);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    if (subscriptions?.length > 0) {
      getSeasonSchedule();
    }
  }, [subscriptions]);

  useEffect(() => {
    if (selectedFollower?.id) {
      setScheduleData({ [`${selectedFollower?.id}`]: content[selectedFollower?.id] });
    } else {
      setScheduleData(content);
    }
  }, [selectedFollower]);

  return (
    <Box className="basis-1/2">
      <Text as="div" className="font-bold my-2 text-xl">
        {t('coming_schedule')}
      </Text>
      {Object.entries(scheduleData).map(([key, data]) => {
        return (
          <Flex direction="column" className="my-3" key={key}>
            <Text className="my-2">
              {data[0]?.teams?.away?.team.id == key
                ? data[0]?.teams?.away?.team.name
                : data[0]?.teams?.home?.team.name}
            </Text>
            <ul className="list-disc list-inside">
              {data?.map((item, index) => (
                <li key={index}>
                  <Link href="#" size="1" color="indigo" className="list-disc" key={index}>
                    {`${monthNames[new Date(item?.gameDate)?.getMonth()]} ${new Date(item?.gameDate)?.getDate()}  - vs `}
                    {key != item.teams.away?.team?.id ? item.teams.away?.team?.name : ''}
                    {key != item.teams.home?.team?.id ? item.teams.home?.team?.name : ''}
                    {` at ${new Date(item?.gameDate).toLocaleString('en-US', { hour: 'numeric', hour12: true })?.toLocaleLowerCase()} EST`}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
        );
      })}
    </Box>
  );
};
