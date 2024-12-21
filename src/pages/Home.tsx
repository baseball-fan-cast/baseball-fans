import { useTranslation } from 'react-i18next';
import React from 'react';

export const Home = () => {

    const { t } = useTranslation()

    return (
        <main>
            <h1>{t('title')}</h1>
            <span>{t('label')} </span>
        </main>
    )
}