import React from 'react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Text, Link } from '@radix-ui/themes';
import { INewsItems } from '@/types';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { LoadingIcon } from './LoadingIcon';
import { formatDate } from '@/helpers/helper';

export const News = ({ data, loading }: { data: INewsItems[]; loading: boolean }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const language = localStorage.getItem('LANG') || 'en';

  return (
    <div className="bg-white p-4 rounded-lg min-h-[400px]">
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
                  <Text as="div" className="text-gray-500 pb-2">
                    {formatDate(new Date(item?.displayDate))}
                  </Text>
                  <Text as="div">{`${t('by')} ${item.creator}`}</Text>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
