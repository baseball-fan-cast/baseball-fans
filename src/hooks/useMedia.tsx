import { useContext, useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { IHighlightClipsGamesData, IHighlightClipsResponse } from '@/types';
import { ContentContext } from '@/context/ContentContextProvider';
import { useSubscription } from './useSubscription';
import { isEmpty } from '@/helpers/helper';
import { runAi } from '../helpers/index';

export const useMedia = () => {
  const [data, setData] = useState<IHighlightClipsGamesData[]>([]);
  const [loading, setLoading] = useState(false);

  const { setHeadlines, setHeadlinesLoading, searchBy } = useContext(ContentContext);
  const { subscriptionTeams: teams, subscriptionPlayers: players } = useSubscription();

  const groupBy = [...searchBy, ...players, ...teams];
  const defaultCount = 4;

  const getTranslatedContent = async (data, prevData = {}) => {
    if (isEmpty(data)) return null;
    setHeadlinesLoading(true);

    const subscriptionsData = Object.entries(data)?.reduce((acc, [key, content]) => {
      const match = [...players, ...teams, ...searchBy]?.find(
        ({ id, teamId }) => id == key || teamId == key
      );
      const { name, fullName, teamName } = match || {};
      const keyName = name || fullName || teamName;
      acc[keyName] = content?.map(({ media }) => {
        const { description, highlightId: id, headline } = media || {};
        return { description, highlightId: id, headline };
      });
      return acc;
    }, {});

    const content = !isEmpty(subscriptionsData) ? JSON.stringify(subscriptionsData) : [];
    const prompt = `Translate only description field from the content and add as a new field "descriptionES" for es language and "descriptionJA" for ja language`;
    const result = await runAi(prompt, content);

    setHeadlinesLoading(false);
    setHeadlines({ ...JSON.parse(result), ...prevData });
  };

  const getHighlightClips = async () => {
    if (!groupBy.length || loading) return null;
    setLoading(true);
    await DataService.getMedia()
      .then((response: IHighlightClipsResponse) => {
        const { games } = response?.data || {};
        const groupedData = groupBy?.reduce((result, item) => {
          const id = item?.isPlayer ? item?.teamId : item?.id;
          result[id] = [...games]
            ?.filter(({ teams }) => teams[0].id == id || teams[1].id == id)
            ?.slice(0, defaultCount);
          return result;
        }, {});
        setData(groupedData);
        getTranslatedContent(groupedData);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getHighlightClipById = async (id) => {
    if (loading) return null;
    setLoading(true);
    await DataService.getMediaByTeamId(id)
      .then((response: IHighlightClipsResponse) => {
        const { games = [] } = response?.data || {};

        const groupedData = groupBy?.reduce((result, item) => {
          const id = item?.isPlayer ? item?.teamId : item?.id;
          result[id] = [...games]
            ?.filter(({ teams }) => teams[0].id == id || teams[1].id == id)
            ?.slice(0, defaultCount);
          return result;
        }, {});
        setData({ ...groupedData, ...data });
        getTranslatedContent(groupedData, data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
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

  return { data, loading };
};
