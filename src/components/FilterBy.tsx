import React from 'react';

import { useTranslation } from 'react-i18next';
import { Flex, Button } from '@radix-ui/themes';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown, X } from 'lucide-react';

interface IData {
  value: string;
  label: string;
}
interface IFilterByData {
  filterData: IData[];
  selectedItems: string[];
  onRemove: (value: string) => void;
  onSelect: (value: string) => void;
}

export const FilterBy = ({ filterData, selectedItems, onRemove, onSelect }: IFilterByData) => {
  const { t } = useTranslation();
  return (
    <Flex wrap="wrap">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            className="w-[200px] justify-between rounded border-solid p-2 border-inherit m-2"
          >
            {t('filterBy')}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {filterData.map(({ value, label }) => (
                  <CommandItem key={value} value={value} onSelect={onSelect}>
                    <Check
                      className={` ${selectedItems.includes(value) ? 'opacity-100' : 'opacity-0'} mr-2 h-4 w-4 `}
                    />
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedItems?.map((label: string) => (
        <Button
          key={label}
          className="rounded-lg m-2 p-2 pr-5 bg-slate-100"
          onClick={() => onRemove(label)}
        >
          <X className="mx-2 p-1" />
          {label}
        </Button>
      ))}
    </Flex>
  );
};
