import React from 'react';
import { Box, Text, Flex, Link } from '@radix-ui/themes';

export const ComingSchedule = () => {
  const items = [
    '25 February - vs Twins at 1:05 pm EST',
    '25 February - vs Twins at 1:05 pm EST',
    '25 February - vs Twins at 1:05 pm EST'
  ];

  return (
    <Box className="basis-1/2">
      <Text as="div" className="font-bold my-2 text-xl">
        Coming Schedule
      </Text>
      <Flex direction="column" className="my-3">
        <Text className="my-2">Atlanta Braves</Text>
        <ul className="list-disc list-inside">
          {items.map((item, index) => (
            <li key={index}>
              <Link href="#" size="1" color="indigo" className="list-disc" key={index}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </Flex>
      <Flex direction="column" className="my-5">
        <Text className="my-2">Chicago Cubs</Text>
        <ul className="list-disc list-inside">
          {items.map((item, index) => (
            <li key={index}>
              <Link href="#" size="1" color="indigo" className="list-disc" key={index}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </Flex>
    </Box>
  );
};
