import { useTranslation } from 'react-i18next';
import React from 'react';
import { Flex, Text, Button, Box } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';

import { ReactSearchAutocomplete } from 'react-search-autocomplete';
// import { CustomSearch } from '../components/CustomSearch';
import { CustomSelect } from '../components/CustomSelect';
import { AvatarBadge } from '../components/AvatarBadge';

const items = [
  {
    id: 1,
    name: 'Atlanta Braves'
  },
  {
    id: 2,
    name: 'Chicago Cubs'
  },
  {
    id: 3,
    name: 'Matthew Boyd'
  }
];

export const Menu = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust breakpoint as needed

  return (
    <Box className="m-5 px-2">
      {/* <div >
            <NavLink className={isActive} to="/">
              {t('home')}
            </NavLink>
            <NavLink className={isActive} to="/about">
              {t('about')}
            </NavLink>
          </div> */}

      <Flex direction={isMobile ? 'column' : 'row'} align="center" justify="between">
        <Flex align="center" className="gap-4" direction={isMobile ? 'column' : 'row'}>
          <Text>{t('following')}</Text>
          <Button variant="classic" className="p-3 bg-black rounded">
            <Text className="text-white">{t('viewAll')}</Text>
          </Button>
          <AvatarBadge content="Atlanta Braves" />
          <AvatarBadge content="Chicago Cubs" />
          <AvatarBadge content="Matthew Boyd" />
        </Flex>
        <Box className="w-[300px] justify-between p-4 items-center">
          <ReactSearchAutocomplete
            items={items}
            showClear
            placeholder={`${t('searchForTeamPlayers')}`}
            styling={{
              borderRadius: '4px'
            }}
            autoFocus
            showNoResults
            formatResult={({ name }) => (
              <span style={{ display: 'block', textAlign: 'left' }}>{name}</span>
            )}
          />
        </Box>
        <Box>
          <CustomSelect />
        </Box>
      </Flex>
    </Box>
  );
};
