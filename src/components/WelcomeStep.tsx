import React, {useEffect, useState} from 'react';
import { CustomSelect } from './CustomSelect';
import { auth } from '../config/firebase';
import { Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

export const WelcomeStep = ({setDisplayName} : {setDisplayName: (val) => void}) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setName(auth?.currentUser?.displayName)
  },[auth?.currentUser])

  return (
    <div className="flex flex-col w-ful justify-center items-center gap-1">
      <h2 className="text-2xl text-center font-bold mb-2">Welcome</h2>
      <h2 className="text-2xl text-center font-bold mb-2">Bienvenida</h2>
      <h2 className="text-2xl text-center font-bold mb-2">いらっしゃいませ</h2>
      <h2
        className={`text-xl text-center font-bold border-b border-black ${isMobile ? 'w-5/6' : 'w-1/6'}`}
      >
        <input
          type="firstName"
          id="firstName"
          name="firstName"
          value={name}
          onChange={(e) => {setDisplayName(e.target.value); setName(e.target.value)}}
          className="relative block w-full appearance-none rounded-none rounded-t-md border border-none px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none focus:ring-none "
          placeholder=""
        />
      </h2>
      <Text className={`my-4 ${isMobile ? 'w-5/6' : 'w-2/6'} text-center text-slate-400`}>
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
