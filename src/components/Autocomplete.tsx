import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export const Autocomplete = () => {
  const items = [
    {
      id: 0,
      name: 'Cobol'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Basic'
    },
    {
      id: 3,
      name: 'PHP'
    },
    {
      id: 4,
      name: 'Java'
    }
  ];

  return (
    <div style={{ width: 400 }}>
      <ReactSearchAutocomplete
        items={items}
        autoFocus
        formatResult={(item) => (
          <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        )}
      />
    </div>
  );
};
