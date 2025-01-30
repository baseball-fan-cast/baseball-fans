import { useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { INewsItems, INewsResponse } from '@/types';
import { runAi } from '../helpers/index';

export const useNews = () => {
  const [data, setData] = useState<INewsItems[]>([]);
  const [loading, setLoading] = useState(true);
  const defaultCount = 4;

  const getTranslatedContent = async (news: INewsItems[] = []) => {
    setLoading(true);
    const content = JSON.stringify(news);
    const prompt = `Translate only description field from the array and add as new field "titleES" for es language and "titleJA" for ja language`;
    const result = await runAi(prompt, content);
    setData(JSON.parse(result));
    setLoading(false);
  };

  const getNews = () => {
    setLoading(true);
    DataService.getNews()
      .then((response: INewsResponse) => {
        const result = response?.data?.items
          ?.map(({ creator, displayDate, title, link, image }) => {
            return {
              creator,
              displayDate,
              title,
              link,
              image
            };
          })
          ?.slice(0, defaultCount);
        getTranslatedContent(result);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  return { data, loading };
};
