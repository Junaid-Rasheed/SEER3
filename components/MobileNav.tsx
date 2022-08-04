import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ViewGridIcon } from '@heroicons/react/solid';
import { ViewGridIcon as ViewGridIconOutline } from '@heroicons/react/outline';
import { NavLinks } from './NavLinks';
import AuthButton from './AuthButton';
import GetStartedButton from './GetStartedButton';

export default function MobileNav({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button>
              {open ?
                <ViewGridIconOutline className="w-9 h-9 text-white" /> :
                <ViewGridIcon className="w-9 h-9 text-white" />
              }
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
                className="mt-8 w-[calc(100vw-40px)] bg-decode3">
                <div className="overflow-hidden relative p-7">
                  <NavLinks className="flex-col divide-y divide-black gap-2 text-black font-bold" />
                  <div className="flex gap-x-[20px] mt-[50px]">
                    <AuthButton className="border-black text-black w-full" />
                    <GetStartedButton className="!bg-black text-decode3 w-full"/>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
