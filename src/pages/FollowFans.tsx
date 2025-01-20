import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { WelcomeStep } from '@/components/WelcomeStep';
import { useTranslation } from 'react-i18next';
import { SelectTeamPlayerStep } from '@/components/SelectTeamPlayerStep';
import { ChooseFanLevelStep } from '@/components/ChooseFanLevelStep';
import { ContentContext } from '@/context/ContentContextProvider';
import DataService from '@/services/DataService';

export const FollowFans = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { followers } = useContext(ContentContext);

  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 0,
      component: <WelcomeStep />
    },
    {
      step: 1,
      component: <SelectTeamPlayerStep />
    },
    {
      step: 2,
      component: <ChooseFanLevelStep />
    }
  ];

  const goBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const followFans = async () => {
    const teams: number[] = [];
    const players: number[] = [];

    followers.map(({ id, playerIcon }) => {
      if (playerIcon) {
        players.push(id);
      } else {
        teams.push(id);
      }
    });

    await DataService.updateSubscription(teams, players);
  };
  const goNext = () => {
    if (activeStep == 1) {
      followFans();
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      navigate('/');
    }
  };
  return (
    <div>
      <div className="flex bg-sky-950 justify-center py-3">
        <Logo className="w-[70px]" />
      </div>
      <div className="p-9 w-10/12 m-auto">
        <div className="flex justify-between">
          {
            <button className="text-slate-400" onClick={goBack}>
              {activeStep ? `${t('back')}` : null}
            </button>
          }
          <div>
            {steps.map(({ step }) => (
              <span
                key={step}
                className={`inline-block h-3 w-3 rounded-full mx-1 ${
                  step === activeStep ? 'bg-sky-950' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button className="text-slate-400" onClick={goNext}>
            {activeStep ? `${t('skip')}` : null}
          </button>
        </div>
        <div className="mt-9 m-auto mb-5">{steps[activeStep].component}</div>
        <button
          className="flex justify-center bg-slate-800 text-white rounded-md w-2/6 p-2 m-auto"
          onClick={goNext}
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};
