import React from 'react';
import GetStartedButton from '../GetStartedButton';

const GetAccessToDashboard = () => {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage: 'url(/assets/desktop/database-page-bg.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-gradient-to-t from-black/80 to-black/50 h-full flex items-center justify-center">
        <div className="max-w-4xl">
          <h3 className="heading text-white text-5xl text-center">
            GET ACCESS TO THE MOST COMPREHENSIVE WEB3 FUNDRAISING DATABASE
          </h3>
          <div className="flex justify-center mt-5">
            <GetStartedButton className="text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAccessToDashboard;
