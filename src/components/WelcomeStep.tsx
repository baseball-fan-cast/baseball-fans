import React from 'react';
import { CustomSelect } from './CustomSelect';
import { auth } from '../config/firebase';
import { Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

export const WelcomeStep = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="flex flex-col w-ful justify-center items-center gap-1">
      <h2 className="text-2xl text-center font-bold mb-2">Welcome</h2>
      <h2 className="text-2xl text-center font-bold mb-2">Bienvenida</h2>
      <h2 className="text-2xl text-center font-bold mb-2">いらっしゃいませ</h2>
      <h2
        className={`text-xl text-center font-bold border-b border-black ${isMobile ? 'w-5/6' : 'w-3/6'}`}
      >
        {auth?.currentUser?.displayName}
      </h2>
      <Text className={`my-4 ${isMobile ? 'w-5/6' : 'w-3/6'} text-center text-slate-400`}>
        {t('welcome_hint')}
      </Text>
      <div
        className={`flex items-center w-ful justify-center ${isMobile ? 'gap-1' : 'gap-4'} mt-3`}
      >
        {t('select_lang')}
        <CustomSelect />
      </div>
    </div>
  );
};
