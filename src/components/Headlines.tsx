/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { Text, Flex, Link } from '@radix-ui/themes';
import { ContentContext } from '@/context/ContentContextProvider';
import { useTranslation } from 'react-i18next';
import { ISubscriptionData } from '@/types';
import { LoadingIcon } from './LoadingIcon';
import { runAi } from '../helpers/index';
import { isEmpty } from '@/helpers/helper';

type IData = {
  description: string;
  id: number;
  headline: string;
};
type ISubscriptionsData = {
  [key: string | number]: IData[];
};

export const Headlines = ({
  subscriptions,
  headlines
}: {
  subscriptions: ISubscriptionData;
  headlines: any;
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState<ISubscriptionsData>({});
  const [content, setContent] = useState<ISubscriptionsData>({});
  const { players = [], teams = [] } = subscriptions;
  const [loading, setLoading] = useState(false);

  const language = localStorage.getItem('LANG') || 'en';
  const defaultCount = 3;

  const { selectedFollower, searchBy, headlinesLoading } = useContext(ContentContext);

  const getData = () => {
    if (!isEmpty(headlines)) {
      const subscriptionsData = Object.entries(headlines)?.reduce((acc, [key, content]) => {
        const match = [...players, ...teams, ...searchBy]?.find(
          ({ id, teamId }) => id == key || teamId == key
        );
        const { name, fullName, teamName } = match || {};
        const keyName = name || fullName || teamName;
        acc[keyName] = content?.slice(0, defaultCount).map(({ media }) => {
          const { description, highlightId: id, headline } = media || {};
          return { description, highlightId: id, headline };
        });
        return acc;
      }, {});

      if (!isEmpty(subscriptionsData) && !loading) {
        getTranslatedContent(subscriptionsData);
      }
    }
  };

  const getTranslatedContent = async (data: ISubscriptionsData) => {
    setLoading(true);
    const content = !isEmpty(data) ? JSON.stringify(data) : [];
    const prompt = `Translate only description field from the data and add as new field "descriptionES" for es language and "descriptionJA" for ja language`;
    const result = await runAi(prompt, content);
    setContent(JSON.parse(result));
    setData(JSON.parse(result));
    setLoading(false);
  };

  useEffect(() => {
    if (
      (players?.length > 0 || teams.length > 0 || searchBy?.length > 0) &&
      !selectedFollower?.id
    ) {
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

  const translatedDescription = `description${language?.toUpperCase()}`;

  return (
    <div className="bg-white p-4 rounded-lg">
      <Text as="div" className="font-bold my-2 text-xl">
        {t('headlines')}
      </Text>
      {headlinesLoading || loading ? (
        <LoadingIcon />
      ) : (
        Object.entries(data)?.map(([key, content]) => (
          <Flex direction="column" className="my-3" key={key}>
            {content?.length > 0 ? <Text className="my-2">{key}</Text> : null}
            <ul className="list-disc list-inside">
              {content?.length > 0 &&
                content?.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`https://www.mlb.com/video/${item.id}`}
                      size="1"
                      color="indigo"
                      className="list-disc"
                      key={index}
                      target="_blank"
                    >
                      {item[translatedDescription] || item.description}
                    </Link>
                  </li>
                ))}
            </ul>
          </Flex>
        ))
      )}
    </div>
  );
};
