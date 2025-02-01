import { useTranslation } from 'react-i18next';
import React, { useContext, useState, useEffect } from 'react';
import { Flex, Text, Box, Button, Container, Badge } from '@radix-ui/themes';
import { AvatarBadge } from '../components/AvatarBadge';
import { CustomSearch } from '../components/CustomSearch';
import { ContentContext } from '@/context/ContentContextProvider';
// import { FilterBy } from './FilterBy';
import { useMediaQuery } from 'react-responsive';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getIcon } from '@/helpers/helper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Menu = ({ subscriptions }: { subscriptions: any }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const defaultCount = 4;
  const {
    selectedFollower,
    setSelectedFollower,
    filterBy,
    setFilterBy,
    searchBy,
    setSelectedLatestNews,
    selectedLatestNews
  } = useContext(ContentContext);
  const [followers, setFollowers] = useState([]);
  const [count, setCount] = useState(defaultCount);

  // const filterByData = [
  //   {
  //     label: <Text>{t('highlight_clips')}</Text>,
  //     value: 'highlight_clips'
  //   },
  //   {
  //     label: <Text>{t('headlines')}</Text>,
  //     value: 'headlines'
  //   },
  //   {
  //     label: <Text>{t('coming_schedule')}</Text>,
  //     value: 'coming_schedule'
  //   }
  // ];
  // const onRemove = (value: string) => {
  //   const filtered = filterBy.filter((element) => element !== value);
  //   setFilterBy(filtered);
  // };

  // const onSelect = (value: string) => {
  //   if (filterBy.includes(value)) {
  //     onRemove(value);
  //   } else {
  //     setFilterBy([...filterBy, value]);
  //   }
  // };

  useEffect(() => {
    const { teams = [], players = [] } = subscriptions || {};
    const player =
      players?.map((player) => {
        return { ...player, name: player.fullName };
      }) || [];
    setFollowers([...teams, ...player]);
    // if ([...searchBy, ...followers].length == 0) {
    //   selectedLatestNews(true);
    // }
  }, [subscriptions]);

  return (
    <>
      <Flex
        wrap="wrap"
        align="center"
        justify="between"
        className={`gap-0 my-5 ${isMobile ? 'px-16' : 'px-36'}`}
      >
        <Box className="w-[300px] justify-between items-center flex-1">
          <CustomSearch />
        </Box>
        {/* <Box>
          <FilterBy
            filterData={filterByData}
            onSelect={onSelect}
            onRemove={onRemove}
            selectedItems={filterBy}
          />
        </Box> */}
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

      <div className="bg-stone-100">
        <Container className="border-y my-4"></Container>
        <Flex
          wrap="wrap"
          align="center"
          justify="between"
          className={`gap-7 my-5  ${isMobile ? 'px-16' : 'px-36'}`}
        >
          <Flex align="center" className="gap-4 h-full" wrap="wrap">
            <Badge
              className={`p-4 rounded-lg border border-black ${selectedLatestNews ? 'text-white bg-stone-950	' : 'text-slate-600	bg-stone-100'}`}
              onClick={() => {
                setSelectedFollower({});
                setSelectedLatestNews(true);
              }}
            >
              <Text>{t('latest')}</Text>
            </Badge>
            <div className="border h-[50px] border-black" />
            <Badge
              className={`p-4 rounded-lg border border-black ${!selectedLatestNews && !selectedFollower?.name ? 'text-white	bg-stone-950	' : 'text-slate-600	bg-stone-100'}`}
              onClick={() => {
                setSelectedFollower({});
                setSelectedLatestNews(false);
              }}
            >
              <Text>{t('following')}</Text>
            </Badge>
            {followers
              ?.slice(0, count)
              ?.map(({ name, abbreviation, teamName, currentTeam, id, teamId, isPlayer }) => {
                const { icon, playerIcon } = getIcon(currentTeam, id, !teamName) || {};

                return (
                  <AvatarBadge
                    key={name}
                    content={name}
                    isSelected={selectedFollower?.name == name}
                    onSelect={() => {
                      setSelectedLatestNews(false);
                      setSelectedFollower({
                        name,
                        icon,
                        playerIcon,
                        abbreviation,
                        id,
                        teamId,
                        isPlayer
                      });
                    }}
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
            {count > defaultCount && count > followers.length - 1 ? (
              <ChevronLeft onClick={() => setCount(defaultCount)} />
            ) : null}
          </Flex>
        </Flex>
        <Container className={`${isMobile ? 'px-16' : 'px-36'}`}></Container>
      </div>
    </>
  );
};
