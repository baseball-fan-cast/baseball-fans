import React from 'react';
import { Box, Text, Flex, Link } from '@radix-ui/themes';

export const Headlines = () => {
  const items = [
    "How will Acuña's return affect Braves' 2025 lineup?",
    'Will Braves make a long-anticipated splash?',
    'Braves sign De La Cruz to potentially help fill OF need',
    "Prospect stats of the year -- each team's best of"
  ];

  return (
    <Box className="basis-1/2">
      <Text as="div" className="font-bold my-2 text-xl">
        Headlines
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
      <Flex direction="column" className="my-5">
        <Text className="my-2">Matthew Boyd</Text>
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
