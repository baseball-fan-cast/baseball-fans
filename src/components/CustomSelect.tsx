import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../constants/index';
import { Flex } from '@radix-ui/themes';

export const CustomSelect = () => {
  const { i18n } = useTranslation();

  const onValueChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem('LANG', value);
  };

  return (
    <Flex className="border rounded">
      <Select onValueChange={onValueChange} defaultValue={i18n.language}>
        <SelectTrigger className="min-w-[150px] p-3 border-0 h-14">
          <SelectValue placeholder="Select language" defaultValue={i18n.language} />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map(({ code, label }) => (
            <SelectItem key={code} value={code}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Flex>
  );
};
