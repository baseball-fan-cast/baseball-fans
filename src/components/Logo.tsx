import React from 'react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

interface ILogoProps {
  className?: string;
}

export const Logo = ({ className }: ILogoProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={'https://www.mlbstatic.com/team-logos/league-on-dark/1.svg'} />
    </Avatar>
  );
};
