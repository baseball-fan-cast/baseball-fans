import React, { useEffect, useState } from 'react';
import DataService from '@/services/DataService';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Text, Link } from '@radix-ui/themes';
import { INewsItems, INewsResponse } from '@/types';

export const News = () => {
  const [data, setData] = useState<INewsItems[]>([]);

  const getNews = () => {
    DataService.getNews()
      .then((response: INewsResponse) => {
        setData(response?.data?.items);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="w-full gap-5 w-10/12">
      <Text as="div" className="font-bold mb-5 text-2xl">
        News
      </Text>

      <div className="w-full gap-5 w-10/12 grid grid-cols-2">
        {data?.map((item, idx) => {
          return (
            <div className="border flex gap-5" key={idx}>
              <Avatar className="w-[250px] flex">
                <AvatarImage src={item?.image} alt={item.title} />
              </Avatar>
              <div>
                <Link href={item.link} size="1" color="indigo" className="list-disc">
                  {item.title}
                </Link>
                <Text as="div">{`By ${item.creator}`}</Text>
                <Text as="div">{new Date(item?.displayDate).toUTCString()}</Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
