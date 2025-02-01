import React, { useContext, useEffect, useState } from 'react';
import { Text, Flex, Link } from '@radix-ui/themes';
import { ContentContext } from '@/context/ContentContextProvider';
import { useTranslation } from 'react-i18next';
import { LoadingIcon } from './LoadingIcon';

export const Headlines = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const language = localStorage.getItem('LANG') || 'en';
  const {
    selectedFollower,
    headlines: content,
    headlinesLoading: loading
  } = useContext(ContentContext);

  useEffect(() => {
    if (selectedFollower?.id) {
      setData({ [`${selectedFollower?.name}`]: content[selectedFollower?.name] });
    } else {
      setData(content);
    }
  }, [selectedFollower, loading]);

  const translatedDescription = `description${language?.toUpperCase()}`;
  if (!data || !Object.entries(data).length) return null;

  return (
    <div className="bg-white p-4 rounded-lg">
      <Text as="div" className="font-bold my-2 text-xl">
        {t('headlines')}
      </Text>
      {loading ? (
        <LoadingIcon />
      ) : (
        Object.entries(data)?.map(([key = '', content = []]) => (
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
