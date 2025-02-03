import React, { useState } from 'react';
import { Button, Text } from '@radix-ui/themes';
import { useMediaQuery } from 'react-responsive';
import { X } from 'lucide-react';

export const ChooseFanLevelStep = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [selectedLevel, setSelectedLevel] = useState({ id: 1, level: '', description: '' });
  const [selectedTab, setSelectedTab] = useState('View All');
  const [selectedFeed, setSelectedFeed] = useState<string[]>([]);

  const tabsData = {
    'View All': {
      data: [
        {
          name: 'WBC Newsletter',
          description: 'Coverage of the World Baseball Classic.'
        },
        {
          name: 'Boletin de LasMayores.com',
          description: 'Spanish-language MLB content and updates.'
        },
        {
          name: 'MLB Europe',
          description: 'News and events related to MLB in Europe.'
        },
        {
          name: 'MLB Dominican Republic',
          description: 'Updates specific to Dominican Republic baseball.'
        },
        {
          name: 'MLB Morning Lineup',
          description: 'Daily league news and top stories.'
        },
        {
          name: 'MLB.com Insider',
          description: 'Exclusive MLB news and insights.'
        },
        {
          name: 'MLB Network Newsletter',
          description: 'Highlights and schedules from MLB Network.'
        },
        {
          name: 'MLB.TV News',
          description: 'Updates on live broadcasts, features, and schedules.'
        }
      ]
    }
  };
  const tabs = [
    'View All',
    'News',
    'Event & Promotions',
    'Player Analysis',
    'Shopping',
    'Beat Report'
  ];
  const levels = [
    {
      level: 'Default',
      description:
        "We'll show you a mix of MLB content for all levels - explore and customize later in your profile.",
      id: 1
    },
    {
      level: 'Rookie Fan',
      description:
        "Just getting started? We'll help you to learn the ropes and keep you in the loop with basics.",
      id: 2
    },
    {
      level: 'All-Star Fan',
      description:
        'You know the game! Get in-depth insights, advanced stats, and more to fuel your passion.',
      id: 3
    },
    {
      level: 'MVP Fan',
      description:
        "Die-hard fan? You'll get VIP-level content, pro-level stats, and insider updates.",
      id: 4
    }
  ];

  const onSelectLevel = (selected) => {
    setSelectedLevel(selected);
  };
  const onSelectedFeed = (selected: string) => {
    if (selectedFeed.includes(selected)) return;
    setSelectedFeed([...selectedFeed, ...[selected]]);
  };
  const onRemoveFeed = (selected: string) => {
    const filteredFeed = selectedFeed.filter((label) => label !== selected);
    setSelectedFeed(filteredFeed);
  };
  const handleChange = (value) => {
    console.log('', value);
  };

  return (
    <div className="flex flex-col w-ful justify-center items-center gap-2">
      <Text as="div" className="text-2xl text-center font-bold mb-2">
        Choose Your Fan Level
      </Text>
      <Text as="div" className="text-center text-slate-500 mb-2">
        Let us know where you stands in your MLB journey, and well personalize your experience
      </Text>
      <div className="flex gap-5 my-5 flex-wrap">
        {levels.map(({ level, description, id }) => (
          <div
            key={level}
            className={`border rounded-md ${isMobile ? '' : 'w-[250px]'} py-5 px-3 ${selectedLevel?.id == id ? 'bg-slate-50 border-current' : 'bg-white  border-inherit'}`}
            onClick={() => onSelectLevel({ level, description, id })}
          >
            <Text as="div" className="font-bold text-center mb-2 py-5">
              {level}
            </Text>
            <Text as="div" className="text-center mb-2">
              {description}
            </Text>
          </div>
        ))}
      </div>
      <Text as="div" className="text-xl text-center font-bold mt-9">
        Your Suggested MLB Feed
      </Text>
      <Text as="div" className="text-center text-slate-500 mb-2">
        Here is the content we think you will love! Want to see more? Update your preferences
        anytime.
      </Text>
      <div className="flex flex-wrap justify-center items-center gap-5">
        {selectedFeed?.map((label: string) => (
          <Button
            key={label}
            className="rounded-lg m-2 p-2 pr-5 bg-slate-100"
            onClick={() => onRemoveFeed(label)}
          >
            <X className="mx-2 p-1" />
            {label}
          </Button>
        ))}
      </div>
      <div className="flex w-ful justify-center items-center gap-5 flex-wrap">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`${selectedTab == tab ? 'border-b-2 border-current	' : ''}`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className=" w-ful grid grid-cols-2 gap-3 my-5 min-h-[250px]">
        {tabsData?.[selectedTab]?.data.map((content) => (
          <div
            key={content.name}
            className={`border rounded-md p-3 ${selectedFeed.includes(content.name) ? 'bg-slate-50 border-current' : ''}`}
            onClick={() => onSelectedFeed(content.name)}
          >
            <Text as="div" className="font-bold">
              {content.name}
            </Text>
            <Text as="div" className="text-slate-500">
              {content.description}
            </Text>
          </div>
        ))}
      </div>
      {/* <div className=''> */}
      <Text as="div" className="text-xl text-center font-bold mt-9">
        Add Subscriber email
      </Text>
      <Text as="div" className="text-center text-slate-500 mb-2">
        Be the first to get exclusive updates, personalized content, and special fan perks.
        (Optional)
      </Text>
      <input
        type="email"
        id="email"
        name="email"
        onChange={(e) => handleChange(e.target.value)}
        className="relative block w-3/6	mb-9 appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter your email"
      />
    </div>
  );
};
