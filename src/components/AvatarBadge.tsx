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
}

export const AvatarBadge = ({ content, data }: IAvatarBadgeProps) => {
  if (!data) return null;
  const { searchBy, setSearchBy, followers, setFollowers } = useContext(ContentContext);

  const onRemove = () => {
    const filtered = searchBy.filter(({ name }) => name !== content);
    setSearchBy(filtered);
    const filteredFollowers = followers.filter(({ name }) => name !== content);
    setFollowers(filteredFollowers);
  };

  return (
    <Badge color="blue" className="py-2 px-3 rounded-lg">
      <Flex align="center" justify="between" className="gap-2">
        {/* opacity-0 hover:opacity-100  */}
        <X className="text-slate-800" onClick={onRemove} />
        <Flex className="relative">
          <Avatar className=" bg-slate-300">
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
