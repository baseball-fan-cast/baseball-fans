import React, { useContext } from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { CustomSearch } from './CustomSearch';
import { ContentContext } from '@/context/ContentContextProvider';
import { AvatarBadge } from './AvatarBadge';

export const SelectTeamPlayerStep = () => {
  const { t } = useTranslation();
  const { followers } = useContext(ContentContext);

  return (
    <div className="flex flex-col w-ful gap-1 min-h-[300px]">
      <Text className="text-2xl font-bold mb-2">{t('select_team')}</Text>
      <Flex align="center" className="gap-4 my-3" wrap="wrap">
        {followers?.map(({ name, icon, playerIcon, abbreviation }) => (
          <AvatarBadge
            key={name}
            content={name}
            isClearable
            data={[
              { src: icon, fallback: abbreviation },
              ...(playerIcon ? [{ src: playerIcon, fallback: abbreviation }] : [])
            ]}
          />
        ))}
      </Flex>
      <CustomSearch isFollowing />
    </div>
  );
};
