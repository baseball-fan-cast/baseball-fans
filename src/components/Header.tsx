import React, { useContext } from 'react';
import { Logo } from '@/components/Logo';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../constants/index';
import { CircleUser, Search } from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const { i18n, t } = useTranslation();
  const defaultLang = localStorage.getItem('LANG') || 'en';

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setToken('');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const onLangChange = (value) => {
    localStorage.removeItem('LANG');
    localStorage.setItem('LANG', value);
    i18n.changeLanguage(value);
  };

  const onFollow = () => {
    navigate('/follow');
  };

  return (
    <div className="flex justify-between items-center bg-sky-950">
      <div className="flex gap-4 items-center text-gray-50 uppercase">
        <Logo className="w-[100px] ml-9 my-4" />
        <div className="underline">{t('discover')}</div>
        <div>{t('news')}</div>
        <div>{t('watch')}</div>
        <div>{t('score')}</div>
        <div>{t('schedule')}</div>
        <div>{t('stats')}</div>
        <div>{t('standings')}</div>
        <div>{t('youth')}</div>
        <div>{t('players')}</div>
      </div>
      <div className="flex text-white items-center gap-4 mr-9 text-gray-50 uppercase">
        <div>{t('tickets')}</div>
        <div>{t('tickets')}</div>
        <div>{t('shop')}</div>
        <button className="text-gray-50 uppercase" onClick={onFollow}>
          {t('follow_more')}
        </button>
        <div className="flex gap-0">
          <select
            id="underline_select"
            className="text-gray-50 uppercase block px-0 w-full text-sm bg-transparent border-0 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 "
            onChange={(e) => onLangChange(e.target.value)}
            value={defaultLang}
          >
            {LANGUAGES.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
          <Search />
        </div>
        <button className="py-2 flex gap-2 text-gray-50 uppercase" onClick={handleSignOut}>
          {t('log_out')}
          <CircleUser />
        </button>
      </div>
    </div>
  );
};
