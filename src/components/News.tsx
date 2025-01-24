import React, { useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Text, Link } from '@radix-ui/themes';
import { INewsItems, INewsResponse } from '@/types';
import { useMediaQuery } from 'react-responsive';
import { runAi } from '../helpers/index';
import { useTranslation } from 'react-i18next';

export const News = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<INewsItems[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const defaultCount = 4;

  const [loading, setLoading] = useState(true);
  // const [count, setCount] = useState(defaultCount);

  const language = localStorage.getItem('LANG') || 'en';

  const getNews = () => {
    setLoading(true);
    DataService.getNews()
      .then((response: INewsResponse) => {
        const result = response?.data?.items?.map(
          ({ creator, displayDate, title, link, image }) => {
            return {
              creator,
              displayDate,
              title,
              link,
              image
            };
          }
        );
        setData(result);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  const getTranslatedContent = async () => {
    setLoading(true);
    const content = JSON.stringify(data?.slice(0, defaultCount));

    const prompt = `Translate to ${language} language title field from next array ${content}  and return the same structure`;
    const result = await runAi(prompt, language);
    setLoading(false);

    setData(JSON.parse(result?.slice(7, -4)));
  };

  useEffect(() => {
    getTranslatedContent();
  }, [language]);

  return (
    <div className="w-full gap-5 w-10/12">
      <Text as="div" className="font-bold mb-5 text-2xl">
        {t('news')}
      </Text>
      {loading ? <div className="min-h-[250px]">{t('loading')}</div> : null}
      <div className={`w-full gap-5 grid ${isMobile ? '' : 'grid-cols-2 w-10/12 '}`}>
        {!loading &&
          data?.slice(0, defaultCount)?.map((item, idx) => {
            return (
              <div className="border flex gap-5" key={idx}>
                <Avatar className={`flex  ${isMobile ? 'w-full' : 'w-[250px] '}`}>
                  <AvatarImage src={item?.image} alt={item.title} />
                </Avatar>
                <div>
                  <Link href={item.link} size="1" color="indigo" className="list-disc">
                    {item.title}
                  </Link>
                  <Text as="div">{`${t('by')} ${item.creator}`}</Text>
                  <Text as="div">{new Date(item?.displayDate).toUTCString()}</Text>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
