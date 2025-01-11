import { useTranslation } from 'react-i18next';
import React from 'react';
import { Flex, Text, Button, Box } from '@radix-ui/themes';
import { CustomSelect } from '../components/CustomSelect';
import { AvatarBadge } from '../components/AvatarBadge';
import { CustomSearch } from '../components/CustomSearch';

export const Menu = () => {
  const { t } = useTranslation();
  return (
    <Box className="m-5 px-2">
      <Flex wrap="wrap" align="center" justify="between" className="gap-7">
        <Flex align="center" className="gap-4" wrap="wrap">
          <Text className="px-4 w-[100px] ">{t('following')}</Text>
          <Button variant="classic" className="p-3 bg-black rounded">
            <Text className="text-white">{t('viewAll')}</Text>
          </Button>
          <AvatarBadge content="Atlanta Braves" data={[{ src: '', fallback: 'A' }]} />
          {/* <AvatarBadge
            content="Chicago Cubs"
            data={[{ src: 'src/assets/chicagoCubs.svg', fallback: 'CN' }]}
          />
          <AvatarBadge
            content="Matthew Boyd"
            data={[
              { src: 'src/assets/chicagoCubs.svg', fallback: 'CN' },
              { src: 'src/assets/images/Player1.png', fallback: 'CN' }
            ]}
          /> */}
        </Flex>
        <Box className="w-[300px] justify-between items-center flex-1">
          <CustomSearch />
        </Box>
        <Box>
          <CustomSelect />
        </Box>
        <Box>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded">
            Log out
          </button>
        </Box>
      </Flex>
    </Box>
  );
};
