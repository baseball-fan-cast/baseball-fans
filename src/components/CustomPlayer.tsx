import React from 'react';
import { Flex, Text, Box } from '@radix-ui/themes';
import ReactPlayer from 'react-player/lazy';
import { useMediaQuery } from 'react-responsive';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IAvatarData {
  icon: string;
  abbreviation: string;
  name: string;
  playerIcon: string;
}
interface ICustomPlayerProps {
  url: string;
  avatarData: IAvatarData;
  title: string;
  date: string;
}

export const CustomPlayer = ({ url, avatarData, title, date }: ICustomPlayerProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust breakpoint as needed
  const { icon, playerIcon, abbreviation, name } = avatarData;
  return (
    <Box
      className={` ${isMobile ? 'my-5' : null} bg-slate-100 rounded-lg pb-2 min-w-[300px] max-w-[400px] flex-1`}
      style={{ borderRadius: '10px', overflow: 'hidden' }}
    >
      <ReactPlayer
        url={url}
        style={{ borderRadius: '10px' }}
        controls
        width={'100%'}
        height="50%"
        //  onDuration={onDuration}
      />
      <Box className="p-3">
        <Text as="div" className="font-bold my-2">
          {title}
        </Text>
        <Text as="div">{date}</Text>
        <Flex align="center" className="my-5">
          <Flex className="relative">
            {icon && (
              <Avatar className="bg-slate-300 border-black">
                <AvatarImage src={icon} />
                <AvatarFallback className="bg-cyan-500">{abbreviation}</AvatarFallback>
              </Avatar>
            )}
            {playerIcon && (
              <Avatar className="absolute start-1/2 bg-slate-300">
                <AvatarImage src={playerIcon} />
                <AvatarFallback>{abbreviation}</AvatarFallback>
              </Avatar>
            )}
          </Flex>
          <Text as="div" className={`${playerIcon ? 'ml-6' : 'ml-2'}`}>
            {name}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
