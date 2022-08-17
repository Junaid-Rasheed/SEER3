import React from 'react';
import Spinner from './Spinner';

const PageLoader = () => {
  return (
    <div className="flex items-center w-full h-full justify-center">
      <Spinner className="w-8 h-8 text-decode3" />
    </div>
  );
};

export default PageLoader;
