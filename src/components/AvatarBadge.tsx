import React, { useContext } from 'react';
import { Text, Badge, Flex } from '@radix-ui/themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ContentContext } from '../context/ContentContextProvider';
import { X } from 'lucide-react';

interface IAvatarData {
  src: string;
  fallback: string;
}
interface IAvatarBadgeProps {
  content: string;
  data?: IAvatarData[];
  isSelected?: boolean;
  isClearable?: boolean;
  onSelect?: () => void;
  id?: number;
}

export const AvatarBadge = ({
  content,
  data,
  isSelected,
  isClearable,
  id,
  onSelect
}: IAvatarBadgeProps) => {
  if (!data) return null;
  const {
    searchBy,
    setSearchBy,
    followers,
    setFollowers,
    teamSchedule,
    setTeamSchedule,
    highlightClips,
    setHighlightClips
  } = useContext(ContentContext);

  const onRemove = () => {
    const filtered = searchBy.filter(({ name }) => name !== content);
    setSearchBy(filtered);
    const filteredFollowers = followers.filter(({ name = '' }) => name !== content);
    setFollowers(filteredFollowers);
    delete teamSchedule[`${id}`];
    delete highlightClips[`${id}`];
    setTeamSchedule(teamSchedule);
    setHighlightClips(highlightClips);
  };

  return (
    <Badge
      className={`py-2 px-3 border border-black rounded-lg ${isSelected ? 'text-white	bg-stone-950	' : 'text-slate-600	bg-stone-100'}`}
      onClick={onSelect}
    >
      <Flex align="center" justify="between" className="gap-2">
        {!isClearable ? null : (
          <X
            className={`${isSelected ? 'text-white' : 'text-slate-800`'} text-slate-800`}
            onClick={onRemove}
          />
        )}
        <Flex className="relative">
          <Avatar className="bg-slate-300 border-black">
            <AvatarImage src={data[0]?.src} />
            <AvatarFallback className="bg-cyan-500">{data[0]?.fallback}</AvatarFallback>
          </Avatar>
          {data[1] && (
            <Avatar className="absolute start-1/2 bg-slate-300">
              <AvatarImage src={data[1]?.src} />
              <AvatarFallback>{data[1]?.fallback}</AvatarFallback>
            </Avatar>
          )}
        </Flex>

        <Text as="div" className={`${data[1] ? 'ml-5' : null}`}>
          {content}
        </Text>
      </Flex>
    </Badge>
  );
};
