import { useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { INewsItems, INewsResponse } from '@/types';

export const useNews = () => {
  const [data, setData] = useState<INewsItems[]>([]);
  const [loading, setLoading] = useState(true);

  const getNews = () => {
    setLoading(true);
    DataService.getNews()
      .then((response: INewsResponse) => {
        setData(response?.data?.items);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getNews();
  }, []);

  return { data, loading };
};
