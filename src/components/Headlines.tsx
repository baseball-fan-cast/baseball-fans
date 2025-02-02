import React, { useContext, useEffect, useState } from 'react';
import { Text, Flex, Link } from '@radix-ui/themes';
import { ContentContext } from '@/context/ContentContextProvider';
import { useTranslation } from 'react-i18next';
import { LoadingIcon } from './LoadingIcon';
import { isEmpty } from '@/helpers/helper';

export const Headlines = ({content, loading}) => {
  const { t } = useTranslation();
  const language = localStorage.getItem('LANG') || 'en';
  const {
    selectedFollower,
  } = useContext(ContentContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedFollower?.id && !isEmpty(content)) {
      const id = selectedFollower?.isPlayer ? selectedFollower?.teamId : selectedFollower?.id;
      setData({ [`${id}`]: content?.[id] });
    } else {
      setData(content);
    }
  }, [selectedFollower, loading, content]);

  useEffect(() => {
    setData(content)
  },[content])

  const translatedDescription = `description${language?.toUpperCase()}`;
  if (!data || !Object.values(data)?.flat()?.length) return null;

  return (
    <div className="bg-white p-4 rounded-lg">
      <Text as="div" className="font-bold my-2 text-xl">
        {t('headlines')}
      </Text>
      {loading ? (
        <LoadingIcon />
      ) : (
        Object.entries(data)?.map(([key = '', content = []]) => { 
          const {teams} = content?.[0] || {};

          const title = teams?.[0].id == key ? teams?.[0].name :  content?.[1]?.teams?.[1].name

          return (
          <Flex direction="column" className="my-3" key={key}>
            {content?.length > 0 ? <Text className="my-2">{title}</Text> : null}
            <ul className="list-disc list-inside">
              {content?.length > 0 &&
                content?.map(({media: item}, index) => {
                  if(!item?.description) return null;
                  return (
                    <li key={index}>
                        <Link
                          href={`https://www.mlb.com/video/${item.highlightId}`}
                          size="1"
                          color="indigo"
                          className="list-disc cursor-pointer"
                          key={index}
                          target="_blank"
                        >
                          {item?.[translatedDescription] || item?.description}
                        </Link>
                      </li>
                    )
                })}
            </ul>
          </Flex>
        )}
        )
      )}
    </div>
  );
};
