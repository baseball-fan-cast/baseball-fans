import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { WelcomeStep } from '@/components/WelcomeStep';
import { useTranslation } from 'react-i18next';
import { SelectTeamPlayerStep } from '@/components/SelectTeamPlayerStep';
// import { ChooseFanLevelStep } from '@/components/ChooseFanLevelStep';
import { ContentContext } from '@/context/ContentContextProvider';
import DataService from '@/services/DataService';
import { useSubscription } from '@/hooks/useSubscription';
import { LoaderCircle } from 'lucide-react';
import { auth } from '../config/firebase';
import { updateProfile } from 'firebase/auth';

export const FollowFans = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [displayName, setDisplayName] = useState(auth?.currentUser?.displayName);
  const { followers, activeStep, setActiveStep } = useContext(ContentContext);
  useSubscription();

  
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      step: 0,
      component: <WelcomeStep setDisplayName={setDisplayName}/>
    },
    {
      step: 1,
      component: <SelectTeamPlayerStep />
    }
    // {
    //   step: 2,
    //   component: <ChooseFanLevelStep />
    // }
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
    setLoading(true)
    await DataService.updateSubscription(teams, players)
    .then(() => {
      navigate('/');
    })
    .catch((err: Error) => {
      console.error('Error response:', err);
    })
    .finally(() => setLoading(false))
  
  };
  const updateName = async () => {
    await updateProfile(auth.currentUser, {displayName})
      .then(() => {
        console.log('updated successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const goNext = () => {
    if (activeStep == 1 && followers?.length > 0) {
      followFans();
      // deleteSubscription();
    }
    if(activeStep == 0 && displayName.length) {
      updateName();
      setActiveStep(activeStep + 1);
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // navigate('/');
    }
  };

  const goNextSkip = () => {
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
          <button className="text-slate-400" onClick={goNextSkip}>
            {activeStep ? `${t('skip')}` : null}
          </button>
        </div>
        <div>
          {/* {activeStep == 1 ? (
            <button onClick={deleteSubscription}>Remove all subscriptions</button>
          ) : null} */}
        </div>
        <div className="mt-9 m-auto mb-5">{steps[activeStep].component}</div>
        <button
          className="flex justify-center bg-slate-800 text-white rounded-md w-2/6 p-2 m-auto disabled:bg-gray-300"
          onClick={goNext}
          disabled={activeStep == 1 && followers?.length === 0}
        >
          {loading ? <LoaderCircle className="animate-spin w-5 h-5 text-blue-500 mr-3" /> : null}{t('next')}
        </button>
      </div>
    </div>
  );
};
