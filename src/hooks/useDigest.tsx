import { useContext, useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { ContentContext } from '@/context/ContentContextProvider';
import { useTranslation } from 'react-i18next';
import { useSubscription } from './useSubscription';

export const useDigest = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const { searchBy } = useContext(ContentContext);
  const { i18n } = useTranslation();
  const { subscriptionTeams: teamIds, subscriptionPlayers: playersIds } = useSubscription();

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
  }, [i18n.language, searchBy]);

  return { data, loading };
};
