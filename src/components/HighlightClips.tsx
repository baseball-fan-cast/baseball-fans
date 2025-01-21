import React, { useEffect, useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import { CustomPlayer } from './CustomPlayer';
import DataService from '@/services/DataService';

export const HighlightClips = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust breakpoint as needed
  // const [data, setData] = useState();
  const [content, setContent] = useState([]);

  const test = [
    {
      gamePk: 775323,
      date: '2024-10-06T00:38:00Z',
      teams: 'San Diego Padres vs Los Angeles Dodgers'
    },
    {
      gamePk: 775336,
      date: '2024-10-03T00:38:00Z',
      teams: 'Atlanta Braves vs San Diego Padres'
    },
    {
      gamePk: 775333,
      date: '2024-10-02T00:38:80Z',
      teams: 'Atlanta Braves vs San Diego Padres'
    }
  ];

  const getHighlightClips = () => {
    DataService.getMedia()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        console.log('getHighlightClips response', response?.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };

  useEffect(() => {
    const test1 = test.map(({ gamePk }) => DataService.getGameContent(gamePk));

    Promise.allSettled([...test1]).then((responses) => {
      const processedResults = responses.map((response) => {
        if (response.status === 'fulfilled') {
          console.log(response.value?.data);
          const {
            highlights: { items }
          } = response.value?.data?.highlights || {};
          const { playbacks, title, date } = items[0] || {};
          const { url } = playbacks[0];
          const contentData = {
            url,
            gameLink: response.value?.data?.link,
            date,
            title
          };

          return contentData; // Assuming the responses are JSON
        } else {
          return { status: 'rejected', reason: response.reason };
        }
      });

      Promise.all(processedResults) // Process the JSON responses
        .then((data) => setContent(data));
    });
  }, []);

  useEffect(() => {
    getHighlightClips();
  }, []);

  return (
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justify="between"
      className="w-full gap-5 w-10/12"
    >
      {content?.slice(0, 3)?.map((item) => {
        const matched = test.find(({ gamePk }) => item?.gameLink.includes(gamePk));
        return (
          <CustomPlayer
            key={item.url}
            url={item.url}
            avatarData={{ src: '', fallback: 'A', title: `${matched?.teams}` }}
            date={matched?.date}
            title={item.title}
          />
        );
      })}
    </Flex>
  );
};
