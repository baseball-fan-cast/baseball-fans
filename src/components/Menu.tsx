import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { Flex, Text, Button, Box } from '@radix-ui/themes';
import { CustomSelect } from '../components/CustomSelect';
import { AvatarBadge } from '../components/AvatarBadge';
import { CustomSearch } from '../components/CustomSearch';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Menu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setToken('');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <Box className="m-5 px-2">
      <Flex wrap="wrap" align="center" justify="between" className="gap-7">
        <Flex align="center" className="gap-4" wrap="wrap">
          <Text className="px-4 w-[100px] ">{t('following')}</Text>
          <Button variant="classic" className="p-3 bg-black rounded">
            <Text className="text-white">{t('viewAll')}</Text>
          </Button>
          <AvatarBadge content="Atlanta Braves" data={[{ src: '', fallback: 'A' }]} />
        </Flex>
        <Box className="w-[300px] justify-between items-center flex-1">
          <CustomSearch />
        </Box>
        <Box>
          <CustomSelect />
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
