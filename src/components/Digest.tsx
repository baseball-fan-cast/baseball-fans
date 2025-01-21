import React, { useEffect, useState } from 'react';
import { Box, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import DataService from '@/services/DataService';

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
    <Box className="basis-1/2">
      <Text as="div" className="font-bold my-2 text-xl">
        {t('digest')}
      </Text>
      {data ? <Text> {JSON.stringify(data)}</Text> : null}
    </Box>
  );
};
