import { useTranslation } from 'react-i18next';
import React, { useContext, useState, useEffect } from 'react';
import { Flex, Text, Box, Button, Container, Badge, Separator } from '@radix-ui/themes';
import { AvatarBadge } from '../components/AvatarBadge';
import { CustomSearch } from '../components/CustomSearch';
import { ContentContext } from '@/context/ContentContextProvider';
import { FilterBy } from './FilterBy';
import { useMediaQuery } from 'react-responsive';
import { ChevronRight } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Menu = ({ subscriptions }: { subscriptions: any }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { selectedFollower, setSelectedFollower, filterBy, setFilterBy, searchBy } =
    useContext(ContentContext);
  const [followers, setFollowers] = useState([]);
  const [count, setCount] = useState(4);

  const filterByData = [
    {
      label: <Text>{t('highlight_clips')}</Text>,
      value: 'highlight_clips'
    },
    {
      label: <Text>{t('headlines')}</Text>,
      value: 'headlines'
    },
    {
      label: <Text>{t('coming_schedule')}</Text>,
      value: 'coming_schedule'
    }
  ];
  const onRemove = (value: string) => {
    const filtered = filterBy.filter((element) => element !== value);
    setFilterBy(filtered);
  };

  const onSelect = (value: string) => {
    if (filterBy.includes(value)) {
      onRemove(value);
    } else {
      setFilterBy([...filterBy, value]);
    }
  };

  const getIcon = (currentTeam, id, isPlayer) => {
    const teamIcon = isPlayer
      ? `https://midfield.mlbstatic.com/v1/team/${currentTeam?.id}/spots/96`
      : `https://midfield.mlbstatic.com/v1/team/${id}/spots/96`;
    const playerIcon = isPlayer
      ? `https://img.mlbstatic.com/mlb-photos/image/upload/t_w60/t_headshot_silo/v1/people/${id}/headshot/silo/current`
      : null;

    return { icon: teamIcon, playerIcon: playerIcon };
  };

  useEffect(() => {
    const { teams = [], players = [] } = subscriptions || {};
    const player =
      players?.map((player) => {
        return { ...player, name: player.fullName };
      }) || [];
    setFollowers([...teams, ...player]);
  }, [subscriptions]);

  const isSelected = false;

  return (
    <>
      <Flex
        wrap="wrap"
        align="center"
        justify="between"
        className={`gap-7 my-5 ${isMobile ? 'mx-16' : 'mx-36'}`}
      >
        <Box className="w-[300px] justify-between items-center flex-1">
          <CustomSearch />
        </Box>
        <Box>
          <FilterBy
            filterData={filterByData}
            onSelect={onSelect}
            onRemove={onRemove}
            selectedItems={filterBy}
          />
        </Box>
        {filterBy.length ? (
          <Button className="opacity-50" onClick={() => setFilterBy([])}>
            {t('clear_filters')}
          </Button>
        ) : null}
      </Flex>
      {searchBy?.length ? (
        <Flex align="center" className={`gap-7 my-5 ${isMobile ? 'mx-16' : 'mx-36'}`} wrap="wrap">
          {searchBy?.map(({ name, icon, playerIcon, abbreviation, id }) => (
            <AvatarBadge
              key={name}
              content={name}
              id={id}
              isClearable
              data={[
                { src: icon, fallback: abbreviation },
                ...(playerIcon ? [{ src: playerIcon, fallback: abbreviation }] : [])
              ]}
            />
          ))}
        </Flex>
      ) : null}

      <Container className="border-y my-4"></Container>

      <Flex
        wrap="wrap"
        align="center"
        justify="between"
        className={`gap-7 my-5  ${isMobile ? 'mx-16' : 'mx-36'}`}
      >
        <Flex align="center" className="gap-4" wrap="wrap">
          <Badge
            className={`p-4 px-7 rounded-lg ${isSelected ? 'text-white bg-stone-950	' : 'text-slate-600	bg-stone-100'}`}
            onClick={() => {}}
          >
            <Text>Latest</Text>
          </Badge>
          <Separator orientation="vertical" />
          <Badge
            className={`p-4 rounded-lg ${!selectedFollower?.name ? 'text-white	bg-stone-950	' : 'text-slate-600	bg-stone-100'}`}
            onClick={() => setSelectedFollower({})}
          >
            <Text>{t('following')}</Text>
          </Badge>
          {followers?.slice(0, count)?.map(({ name, abbreviation, teamName, currentTeam, id }) => {
            const { icon, playerIcon } = getIcon(currentTeam, id, !teamName) || {};

            return (
              <AvatarBadge
                key={name}
                content={name}
                isSelected={selectedFollower?.name == name}
                onSelect={() => setSelectedFollower({ name, icon, playerIcon, abbreviation, id })}
                data={[
                  { src: icon, fallback: abbreviation },
                  ...(playerIcon ? [{ src: playerIcon, fallback: abbreviation }] : [])
                ]}
              />
            );
          })}
          {count < followers.length - 1 ? (
            <ChevronRight onClick={() => setCount(followers.length)} />
          ) : null}
        </Flex>
      </Flex>
      <Container className={`border-y ${isMobile ? 'mx-16' : 'mx-36'}`}></Container>
    </>
  );
};
