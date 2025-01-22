import React, { useEffect, useState, useContext } from 'react';
import { Box, Text, Spinner } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import DataService from '@/services/DataService';
import Markdown from 'react-markdown';
import { ContentContext } from '@/context/ContentContextProvider';
import { ISubscriptionPlayer, ISubscriptionTeam } from '@/types';

export const Digest = ({
  teamIds,
  playersIds
}: {
  teamIds: ISubscriptionTeam;
  playersIds: ISubscriptionPlayer;
}) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  // const [htmlContent, setHtmlContent] = useState('');
  const { selectedFollower, searchBy } = useContext(ContentContext);

  const getDigestByIds = (teams, players) => {
    setLoading(true);
    DataService.getDigestByIds(teams, players)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setData(response?.data);
        // setHtmlContent(response.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDigest = () => {
    setLoading(true);
    DataService.getDigest()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setData(response?.data);
        // setHtmlContent(response.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchBy.length > 0) {
      const searchData = searchBy.reduce(
        (acc, item) => {
          const { playerIcon, id } = item;
          const team = !playerIcon ? id : '';
          const player = playerIcon ? id : '';

          acc['teamIds'] = `${acc['teamIds']},${team}`;
          acc['playerIds'] = `${acc['playerIds']},${player}`;
          return acc;
        },
        { teamIds: '', playerIds: '' }
      );

      const teams = teamIds?.map((item) => item.id).join(',') + searchData?.teamIds;
      const players = playersIds?.map((item) => item.id).join(',') + searchData?.playerIds;
      getDigestByIds(teams, players);
    } else {
      getDigest();
    }
  }, [i18n.language, searchBy, teamIds, playersIds]);

  useEffect(() => {
    const { playerIcon, id } = selectedFollower;
    const teamId = !playerIcon ? id : '';
    const playersId = playerIcon ? id : '';
    if (teamId || playersId) {
      getDigestByIds(teamId, playersId);
    }
  }, [selectedFollower]);

  return (
    <Box className="">
      <Text as="div" className="font-bold my-2 text-xl">
        {t('digest')}
      </Text>
      {loading ? (
        <div className="min-h-[250px]">
          <Spinner /> Loading ...
        </div>
      ) : null}
      {data && !loading ? <Markdown>{data}</Markdown> : null}
    </Box>
  );
};
