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

export const Headlines = ({ subscriptions }: { subscriptions: ISubscriptionData }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<ISubscriptionsData>({});
  const [content, setContent] = useState<ISubscriptionsData>({});
  const { players = [], teams = [] } = subscriptions;
  const [loading, setLoading] = useState(false);

  const language = localStorage.getItem('LANG') || 'en';
  const defaultCount = 4;

  const { headlines, selectedFollower, searchBy, headlinesLoading } = useContext(ContentContext);

  const getData = () => {
    const subscriptionsData = [...players, ...teams, ...searchBy]?.reduce((result, curr) => {
      const id = curr.isPlayer ? curr.teamId : curr.id;

      const currentTeam = headlines?.find(
        (item) => id == item.teams[0]?.id || id == item.teams[1]?.id
      )?.teams;
      const currentTeamName = currentTeam[0]?.id == id ? currentTeam[0].name : currentTeam[1].name;

      const name = curr.isPlayer ? curr.fullName : curr.name;

      result[name] = headlines
        ?.filter(({ teams }) => teams?.[0]?.id === id || teams?.[1]?.id === id)
        ?.map(({ media }) => {
          const { description, highlightId: id, headline } = media;
          return { description, id, headline, currentTeamName };
        })
        ?.slice(0, defaultCount);
      return result;
    }, {});
    if (!isEmpty(subscriptionsData) && !loading) {
      getTranslatedContent(subscriptionsData);
    }
  };

  const getTranslatedContent = async (data: ISubscriptionsData) => {
    setLoading(true);
    const content = !isEmpty(data) ? JSON.stringify(data) : [];
    const prompt = `Translate only description field from the array and add as new field "descriptionES" for es language and "descriptionJA" for ja language`;
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
              {content?.map((item, index) => (
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
