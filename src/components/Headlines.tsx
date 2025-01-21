import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Flex, Link } from '@radix-ui/themes';
import { ContentContext } from '@/context/ContentContextProvider';

export const Headlines = ({ subscriptions = [] }: { subscriptions: [] }) => {
  const [data, setData] = useState({});
  const [content, setContent] = useState({});

  const { headlines, headlinesLoading, setHeadlinesLoading, selectedFollower } =
    useContext(ContentContext);

  const getData = () => {
    const subscriptionsData = subscriptions?.reduce((result, curr) => {
      result[curr?.name] = Object.values(headlines)
        ?.filter(
          (item) =>
            item.data?.teams?.[0]?.id === curr?.id || item?.data?.teams?.[1]?.id === curr?.id
        )
        ?.map(({ items }) => {
          const { description, id, headline } = items;
          return { description, id, headline };
        });
      return result;
    }, {});
    console.log('subscriptions', subscriptions, Object.values(headlines));

    setContent(subscriptionsData);
    setData(subscriptionsData);
  };

  useEffect(() => {
    if (subscriptions?.length > 0) {
      getData();
    }
  }, [subscriptions, headlinesLoading, setHeadlinesLoading, headlines]);

  useEffect(() => {
    if (selectedFollower?.id) {
      setData({ [`${selectedFollower?.name}`]: content[selectedFollower?.name] });
    } else {
      setData(content);
    }
  }, [selectedFollower]);

  return (
    <Box className="basis-1/2">
      <Text as="div" className="font-bold my-2 text-xl">
        Headlines
      </Text>
      {Object.entries(data)?.map(([key, content]) => (
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
                  {item.description}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
      ))}
    </Box>
  );
};
