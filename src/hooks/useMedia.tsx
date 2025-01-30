import { useContext, useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { IHighlightClipsGamesData, IHighlightClipsResponse } from '@/types';
import { ContentContext } from '@/context/ContentContextProvider';
import { useSubscription } from './useSubscription';

export const useMedia = () => {
  const [data, setData] = useState<IHighlightClipsGamesData[]>([]);
  const [loading, setLoading] = useState(false);

  const { headlines, setHeadlines, headlinesLoading, setHeadlinesLoading, searchBy } =
    useContext(ContentContext);
  const { subscriptionTeams: teams, subscriptionPlayers: players } = useSubscription();

  const groupBy = [...searchBy, ...players, ...teams];

  const getHighlightClips = async () => {
    if (loading) return null;
    if (!groupBy.length) return null;
    setHeadlinesLoading(true);
    setLoading(true);
    await DataService.getMedia()
      .then((response: IHighlightClipsResponse) => {
        const { games } = response?.data || {};
        const groupedData = groupBy?.reduce((result, item) => {
          const id = item?.isPlayer ? item?.teamId : item?.id;
          result[id] = [...games]?.filter(({ teams }) => teams[0].id == id || teams[1].id == id);
          return result;
        }, {});
        setData(groupedData);
        setHeadlines(groupedData);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setHeadlinesLoading(false);
        setLoading(false);
      });
  };

  const getHighlightClipById = async (id) => {
    if (loading) return null;
    setHeadlinesLoading(true);
    setLoading(true);
    await DataService.getMediaByTeamId(id)
      .then((response: IHighlightClipsResponse) => {
        const { games = [] } = response?.data || {};

        const groupedData = groupBy?.reduce((result, item) => {
          const id = item?.isPlayer ? item?.teamId : item?.id;
          result[id] = [...games]?.filter(({ teams }) => teams[0].id == id || teams[1].id == id);
          return result;
        }, {});
        setData({ ...groupedData, ...data });
        setHeadlines({ ...groupedData, ...data });
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setHeadlinesLoading(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchBy.length) {
      const ids = searchBy.map(({ id }) => id).join(',');
      getHighlightClipById(ids);
    } else {
      getHighlightClips();
    }
  }, [searchBy, players, teams]);

  return { data, headlines, headlinesLoading };
};
