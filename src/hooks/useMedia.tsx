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
  const [headline, setHeadline] = useState();
  const [headlineLoading, setHeadlineLoading] = useState(false);

  
  const { setHeadlines, setHeadlinesLoading, searchBy, teamSchedule, highlightClips } = useContext(ContentContext);
  const { subscriptionTeams: teams, subscriptionPlayers: players } = useSubscription();

  const groupBy = [...searchBy, ...players, ...teams];
  const defaultCount = 4;

  // const getTranslatedContent = async (data) => {
  //   if (isEmpty(data) || loading) return null;

  //   const subscriptionsData = Object.entries(data)?.reduce((acc, [key, content]) => {
  //     const match = [...players, ...teams, ...searchBy]?.find(
  //       ({ id, teamId }) => id == key || teamId == key
  //     );
  //     const { name, fullName, teamName } = match || {};
  //     const keyName = name || fullName || teamName;
  //     if (!keyName || !content.length) return;
  //     acc[keyName] = content?.map(({ media }) => {
  //       const { description, highlightId: id, headline } = media || {};
  //       return { description, highlightId: id, headline };
  //     });
  //     return acc;
  //   }, {});
  //   if (!subscriptionsData) return;

  //   const content = !isEmpty(subscriptionsData) ? JSON.stringify(subscriptionsData) : [];
  //   const prompt = `Translate only description field from the content and add as a new field "descriptionES" for es language and "descriptionJA" for ja language`;
  //   const result = await runAi(prompt, content);

  //   setHeadlines(subscriptionsData);
  // };

  const getHighlightClips = async () => {
    // if (!groupBy.length || loading) return null;
    setLoading(true);
    setHeadlinesLoading(true);
    setHeadlineLoading(true);
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
        setHeadlines(groupedData);
        setHeadline(groupedData);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setLoading(false);
        setHeadlinesLoading(false);
        setHeadlineLoading(false);

      });
  };

  const getHighlightClipById = async (id) => {
    if (loading) return null;
    setLoading(true);
    setHeadlinesLoading(true);
    setHeadlineLoading(true);
    const teamId = searchBy.map(({ id, teamId }) => teamId ? teamId : id).join(',');
    
    await DataService.getMediaByTeamId(teamId)
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
        setHeadlines({ ...groupedData, ...data });
        setHeadline({ ...groupedData, ...data })
        // getTranslatedContent({ ...groupedData, ...data });
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setLoading(false);
        setHeadlinesLoading(false);
        setHeadlineLoading(false);
      });
  };

  useEffect(() => {
    if (searchBy.length) {
      const ids = searchBy.map(({ id }) => id).join(',');
      getHighlightClipById(ids);
    } else {
      getHighlightClips();
    }
  }, [searchBy, players, teams, teamSchedule, highlightClips]);

  return { data, loading, headlines: headline, headlinesLoading: headlineLoading };
};
