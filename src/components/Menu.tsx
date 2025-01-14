import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { Flex, Text, Box } from '@radix-ui/themes';
import { AvatarBadge } from '../components/AvatarBadge';
import { CustomSearch } from '../components/CustomSearch';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ContentContext } from '@/context/ContentContextProvider';

export const Menu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const { followers, selectedFollower, setSelectedFollower } = useContext(ContentContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setToken('');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  //bg-black
  return (
    <Box className="m-5 px-2">
      <Flex wrap="wrap" align="center" justify="between" className="gap-7">
        <Flex align="center" className="gap-4" wrap="wrap">
          <Text className="px-4 w-[100px] ">{t('following')}</Text>
          <button
            onClick={() => setSelectedFollower({})}
            className={`p-3 border rounded-md border-slate-500 ${selectedFollower?.name ? '' : 'bg-black'}`}
          >
            <Text className={selectedFollower?.name ? 'text-black' : 'text-white'}>
              {t('viewAll')}
            </Text>
          </button>
          {followers?.map(({ name, icon, playerIcon, abbreviation, ...rest }) => (
            <AvatarBadge
              key={name}
              content={name}
              isSelected={selectedFollower?.name == name}
              onSelect={() =>
                setSelectedFollower({ name, icon, playerIcon, abbreviation, ...rest })
              }
              data={[
                { src: icon, fallback: abbreviation },
                ...(playerIcon ? [{ src: playerIcon, fallback: abbreviation }] : [])
              ]}
            />
          ))}
        </Flex>
        <Box className="w-[300px] justify-between items-center flex-1">
          <CustomSearch />
        </Box>
        <Box>
          <button className="bg-blue-700 text-white rounded-xl py-2 px-4" onClick={handleSignOut}>
            Log out
          </button>
        </Box>
      </Flex>
    </Box>
  );
};
