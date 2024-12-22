import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@radix-ui/themes';
import { Menu } from '../components/Menu';

export const About = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Menu />
      <main>
        <h1>{t('about')}</h1>
        <span>{t('user', { name: 'Kate' })}</span>
      </main>
    </Box>
  );
};
