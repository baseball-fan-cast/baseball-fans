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
        if (language != 'en') {
          getTranslatedContent(result);
        }
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

  const getTranslatedContent = async (news: INewsItems[] = []) => {
    setLoading(true);
    const lists = news?.length ? news?.slice(0, defaultCount) : data?.slice(0, defaultCount);
    const content = lists ? JSON.stringify(lists) : [];
    const prompt = `Translate title field from the array and add as new field "title${language?.toUpperCase()}"`;
    const result = await runAi(prompt, content, language);
    setLoading(false);
    setData(JSON.parse(result));
  };

  useEffect(() => {
    if (data.length) {
      const isTranslated = Object.keys(data[0])?.some(
        (title) => title.includes(language?.toUpperCase()) || language == 'en'
      );
      if (!isTranslated) {
        getTranslatedContent();
      }
    }
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
            const translatedTitle = `title${language?.toUpperCase()}`;
            console.log('translatedTitle', translatedTitle, item[translatedTitle]);
            return (
              <div className="border flex gap-5" key={idx}>
                <Avatar className={`flex  ${isMobile ? 'w-full' : 'w-[250px] '}`}>
                  <AvatarImage src={item?.image} alt={item.title} />
                </Avatar>
                <div>
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
    </div>
  );
};
