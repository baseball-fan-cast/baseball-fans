import React, { useEffect, useState } from 'react';
import { Box, Text, Spinner } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import DataService from '@/services/DataService';
import Markdown from 'react-markdown';

export const Digest = () => {
  const { t } = useTranslation();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState('');

  const getDigest = () => {
    setLoading(true);
    DataService.getDigest()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setData(response?.data);
        setHtmlContent(response.data);
      })
      .catch((err: Error) => {
        console.error('Error response:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getDigest();
  }, []);
  console.log('htmlContent', htmlContent);
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
