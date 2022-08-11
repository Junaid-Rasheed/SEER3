import React from 'react';
import { useAuth } from '../components/context/Authentication';
import Layout from '../components/Layout';
import { BadgeCheckIcon } from '@heroicons/react/outline';

const Divider = () => {
  return <div className="border-b border-[#4B4B4B] my-10"></div>;
};

const Account = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Layout>
      <div className="bg-black text-white">
        <div className="max-w-5xl mx-auto mt-10">
          <h2 className="heading text-3xl text-center uppercase">Account</h2>
          <div className="pt-8">
            <h3 className="pb-5 font-bold text-xl">Info</h3>
            <ul className="grid grid-cols-1 gap-y-2">
              <li>
                Full name:{' '}
                {user.displayName || `${user.firstName} ${user.lastName}`}
              </li>
              <li>Email: {user.email}</li>
              <li className="flex items-center">
                <span>Status: </span>
                <div className="text-decode3 px-2 text-sm flex items-center gap-x-1 bg-decode3/20 px-2 py-1 rounded-md">
                  <BadgeCheckIcon className="w-5 h-5" />
                  {user.emailVerified ? 'Verified' : 'Unverified'}
                </div>
              </li>
            </ul>
          </div>
          <Divider />
          <div className="">
            <h3 className="pb-5 font-bold text-xl">Subscription</h3>
            <div>
              <span>Updating....</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;