import React, { useEffect, useState } from 'react';
import { Box, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import DataService from '@/services/DataService';
import Markdown from 'react-markdown';

export const Digest = () => {
  const { t } = useTranslation();
  const [data, setData] = useState('');

  const getDigest = () => {
    DataService.getDigest()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setData(response?.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      });
  };
  useEffect(() => {
    getDigest();
  }, []);

  return (
    <Box className="">
      <Text as="div" className="font-bold my-2 text-xl">
        {t('digest')}
      </Text>
      {data ? <Markdown>{data}</Markdown> : null}
    </Box>
  );
};
