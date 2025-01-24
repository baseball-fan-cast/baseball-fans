import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Flex, Link } from '@radix-ui/themes';
import { ContentContext } from '@/context/ContentContextProvider';
import { useTranslation } from 'react-i18next';
import { ISubscriptionTeam } from '@/types';

type IData = {
  description: string;
  id: number;
  headline: string;
};
type ISubscriptionsData = {
  [key: string | number]: IData[];
};

export const Headlines = ({ subscriptions = [] }: { subscriptions: ISubscriptionTeam[] }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<ISubscriptionsData>({});
  const [content, setContent] = useState<ISubscriptionsData>({});

  const { headlines, selectedFollower, searchBy, headlinesLoading } = useContext(ContentContext);

  const getData = () => {
    const subscriptionsData = [...subscriptions, ...searchBy]?.reduce((result, curr) => {
      result[curr?.name] = headlines
        ?.filter(({ teams }) => teams?.[0]?.id === curr?.id || teams?.[1]?.id === curr?.id)
        ?.map(({ media }) => {
          const { description, highlightId: id, headline } = media;
          return { description, id, headline };
        });
      return result;
    }, {});

    setContent(subscriptionsData);
    setData(subscriptionsData);
  };

  useEffect(() => {
    if ((subscriptions?.length > 0 || searchBy?.length > 0) && !selectedFollower?.id) {
      getData();
    }
  }, [headlines, headlinesLoading, searchBy]);

  useEffect(() => {
    if (selectedFollower?.id) {
      setData({ [`${selectedFollower?.name}`]: content[selectedFollower?.name] });
    } else {
      setData(content);
    }
  }, [selectedFollower]);

  return Object.values(data)?.flat()?.length ? (
    <Box className="basis-1/2">
      <Text as="div" className="font-bold my-2 text-xl">
        {t('headlines')}
      </Text>
      {headlinesLoading ? (
        <div className="min-h-[250px]">Loading ...</div>
      ) : (
        Object.entries(data)?.map(([key, content]) => (
          <Flex direction="column" className="my-3" key={key}>
            {content?.length > 0 ? <Text className="my-2">{key}</Text> : null}
            <ul className="list-disc list-inside">
              {content?.slice(0, 5)?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`https://www.mlb.com/video/${item.id}`}
                    size="1"
                    color="indigo"
                    className="list-disc"
                    key={index}
                    target="_blank"
                  >
                    {item.description}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
        ))
      )}
    </Box>
  ) : null;
};
