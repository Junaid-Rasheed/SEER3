import React from 'react';
import Button from '../Button';
import { useRouter } from 'next/router';
import { ArrowSmRightIcon } from '@heroicons/react/outline';

const GetAccessToDashboard = () => {
  const router = useRouter();
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
          <div className="flex justify-center pt-3">
            <Button
              onClick={() => router.push('/pricing')}
              className="bg-decode3 px-6 py-2 font-bold text-center flex items-center uppercase text-black"
            >
              Get Started&nbsp;
              <ArrowSmRightIcon className="h-6 w-6 -rotate-45" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAccessToDashboard;
