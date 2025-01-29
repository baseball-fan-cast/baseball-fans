import React from 'react';
import { Loader } from 'lucide-react';

export const LoadingIcon = () => {
  return (
    <div className="flex items-center justify-center min-h-[250px]">
      <Loader className="animate-spin w-12 h-12 text-blue-500" />
    </div>
  );
};
