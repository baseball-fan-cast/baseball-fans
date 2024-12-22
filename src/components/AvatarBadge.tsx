import React from 'react';
import { Text, Badge, Flex } from '@radix-ui/themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  return (
    <Badge color="blue" className="py-2 px-3 rounded-lg">
      <Flex align="center" justify="between" className="gap-2">
        <Flex className="relative">
          <Avatar>
            <AvatarImage src={data[0]?.src} />
            <AvatarFallback className="bg-cyan-500">{data[0]?.fallback}</AvatarFallback>
          </Avatar>
          {data[1] && (
            <Avatar className="absolute start-1/2">
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
