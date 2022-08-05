import Image from 'next/image';
import { Fragment } from 'react';
import { useSession } from 'next-auth/react';
import { Popover, Transition } from '@headlessui/react';
import AuthButton from './AuthButton';

export default function AuthBadge({ className }: { className?: string }) {
  const { data: session } = useSession();
  const name = session?.user?.name || session?.user?.email?.split('@')[0];
  return (
    <div className={className}>
      <Popover className="relative">
        <>
          <Popover.Button className="text-decode3 font-bold outline-0 flex items-center space-x-2">
            {session?.user?.image && (
              <div className="w-9 h-9 rounded-full relative overflow-hidden border-2 border-decode3">
                <Image
                  src={session.user.image}
                  layout="fill"
                  objectFit="contain"
                  alt="avatar"
                />
              </div>
            )}
            <span>{name}</span>
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
            <Popover.Panel className="absolute top-14 -right-5 min-w-40">
              <div className="relative bg-decode3 flex flex-col gap-4 px-2 py-4 w-80">
                <strong> {session?.user?.email} </strong>
                <AuthButton className="bg-black" />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </div>
  );
}
