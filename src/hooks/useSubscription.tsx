import { useContext, useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { ISubscriptionPlayer, ISubscriptionResponse, ISubscriptionTeam } from '@/types';
import { ContentContext } from '@/context/ContentContextProvider';
import { getIcon } from '@/helpers/helper';

export const useSubscription = () => {
  const [subscriptionTeams, setSubscriptionTeams] = useState<ISubscriptionTeam[]>([]);
  const [subscriptionPlayers, setSubscriptionPlayers] = useState<ISubscriptionPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  const { allPlayers } = useContext(ContentContext);

  const getSubscription = () => {
    setLoading(true);
    DataService.getSubscription()
      .then((response: ISubscriptionResponse) => {
        console.log('HOME', response?.data?.teams);
        const teams = response?.data?.teams?.map((item) => {
          const { icon } = getIcon({}, item?.id, false) || {};
          return {
            ...item,
            icon
          };
        });
        const players = response?.data?.players?.map((item) => {
          const teamId = allPlayers.find((allPl) => allPl?.id == item.id)?.teamId;
          const { icon, playerIcon } = getIcon({ id: teamId }, item?.id, !item.teamName) || {};

          return {
            ...item,
            teamId,
            icon,
            playerIcon
          };
        });
        setSubscriptionTeams(teams);
        setSubscriptionPlayers(players);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSubscription();
  }, [allPlayers]);

  return { subscriptionTeams, subscriptionPlayers, loading };
};
