import React, { useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Text, Link } from '@radix-ui/themes';
import { INewsItems, INewsResponse } from '@/types';
import { useMediaQuery } from 'react-responsive';
import { runAi } from '../helpers/index';
import { useTranslation } from 'react-i18next';
import { LoadingIcon } from './LoadingIcon';

export const News = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<INewsItems[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const defaultCount = 4;

  const [loading, setLoading] = useState(true);

  const language = localStorage.getItem('LANG') || 'en';

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

  const getTranslatedContent = async (news: INewsItems[] = []) => {
    setLoading(true);
    const content = JSON.stringify(news);
    const prompt = `Translate only description field from the array and add as new field "titleES" for es language and "titleJA" for ja language`;
    const result = await runAi(prompt, content, language);
    setData(JSON.parse(result));
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <Text as="div" className="font-bold mb-5 text-2xl">
        {t('news')}
      </Text>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className={`w-full gap-5 grid ${isMobile ? '' : 'grid-cols-2 w-10/12 '}`}>
          {data?.map((item, idx) => {
            const translatedTitle = `title${language?.toUpperCase()}`;
            return (
              <div className="border gap-5 bg-slate-100 rounded-lg p-4" key={idx}>
                <Avatar className={`rounded-lg ${isMobile ? 'w-full' : 'w-[250px] '}`}>
                  <AvatarImage src={item?.image} alt={item.title} />
                </Avatar>
                <div className="pt-4">
                  <Link href={item.link} size="1" color="indigo" className="list-disc">
                    {item[translatedTitle] || item.title}
                  </Link>
                  <Text as="div">{`${t('by')} ${item.creator}`}</Text>
                  <Text as="div">{new Date(item?.displayDate).toUTCString()}</Text>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
