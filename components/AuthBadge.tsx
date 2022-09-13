import Image from 'next/image';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/outline';
import AuthButton from './AuthButton';
import { IUser } from '../model/auth';

function getInitialName(fullName?: string | null) {
  if (!fullName) return '';
  const firstChar = fullName.charAt(0).toUpperCase();
  const subArr = fullName.split(/\s/g);
  const lastChar = subArr[subArr.length - 1].charAt(0).toUpperCase();
  return firstChar + lastChar;
}

export default function AuthBadge({
  className,
  user,
  showPaymentDetails,
  setShowPaymentDetails
}: {
  className?: string;
  user?: IUser;
  setShowPaymentDetails?: any;
  showPaymentDetails?: boolean;
}) {
  return (
    <div className={className}>
      <Popover className="relative">
        <>
          <Popover.Button className="text-decode3 font-bold outline-0 flex items-center">
            {user?.photoURL ? (
              <div className="w-9 h-9 rounded-full relative overflow-hidden border-2 border-decode3">
                <Image
                  src={user?.photoURL}
                  layout="fill"
                  objectFit="contain"
                  alt="avatar"
                />
              </div>
            ) : (
              <div className="rounded-full w-10 h-10 bg-black border-2 border-decode3 text-decode3 flex items-center justify-center">
                {getInitialName(user?.displayName) || (
                  <UserIcon className="w-6 h-6 text-decode3" />
                )}
              </div>
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`absolute top-14 -right-5 min-w-40 ${
                typeof window !== 'undefined' &&
                window.location.pathname === '/dashboard' &&
                'w-80'
              }`}
            >
              <div className="relative bg-decode3 flex flex-col gap-4 p-4">
                <p className="uppercase font-bold">{user?.displayName}</p>
                <p>{user?.email}</p>
                {typeof window !== 'undefined' &&
                window.location.pathname === '/dashboard' &&
                showPaymentDetails ? (
                  <button
                    onClick={() => setShowPaymentDetails(false)}
                    className="bg-black text-[#B1EF07] hover:opacity-80 hover:text-white  py-2 px-2 rounded my-2"
                  >
                    Hide Payment Details
                  </button>
                ) : (
                  <button
                    onClick={() => setShowPaymentDetails(true)}
                    className="bg-black text-[#B1EF07] hover:opacity-80 hover:text-white py-2 px-2 rounded my-2"
                  >
                    Show Payment Details
                  </button>
                )}
                <AuthButton className="bg-black" />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </div>
  );
}
