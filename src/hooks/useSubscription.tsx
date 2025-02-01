import { useContext, useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { ISubscriptionPlayer, ISubscriptionResponse, ISubscriptionTeam } from '@/types';
import { getIcon } from '@/helpers/helper';
import { ContentContext } from '@/context/ContentContextProvider';

export const useSubscription = () => {
  const [subscriptionTeams, setSubscriptionTeams] = useState<ISubscriptionTeam[]>([]);
  const [subscriptionPlayers, setSubscriptionPlayers] = useState<ISubscriptionPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const { setFollowers } = useContext(ContentContext);

  const getSubscription = () => {
    setLoading(true);
    DataService.getSubscription()
      .then((response: ISubscriptionResponse) => {
        const teams = response?.data?.teams?.map((item) => {
          const { icon } = getIcon({}, item?.id, false) || {};
          return {
            ...item,
            icon
          };
        });
        const players = response?.data?.players?.map((item) => {
          const { icon, playerIcon } = getIcon({ id: item.teamId }, item?.id, !item.teamName) || {};

          return {
            ...item,
            icon,
            playerIcon,
            name: item?.name || item?.fullName
          };
        });
        setSubscriptionTeams(teams);
        setSubscriptionPlayers(players);
        setFollowers([...teams, ...players]);
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
  }, []);

  return { subscriptionTeams, subscriptionPlayers, loading };
};
