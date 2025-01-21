import React from 'react';
import { Flex, Text, Box } from '@radix-ui/themes';
import ReactPlayer from 'react-player/lazy';
import { useMediaQuery } from 'react-responsive';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IAvatarData {
  src: string;
  fallback: string;
  title: string;
}
interface ICustomPlayerProps {
  url: string;
  avatarData: IAvatarData;
  title: string;
  date: string;
}

export const CustomPlayer = ({ url, avatarData, title, date }: ICustomPlayerProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust breakpoint as needed

  return (
    <Box
      className={` ${isMobile ? 'my-5' : null} bg-slate-100 rounded-lg pb-4 w-[300px]`}
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
          <Avatar>
            <AvatarImage src={avatarData.src} />
            <AvatarFallback className="bg-cyan-500">{avatarData.fallback}</AvatarFallback>
          </Avatar>
          <Text className="mx-2">{avatarData.title}</Text>
        </Flex>
      </Box>
    </Box>
  );
};
