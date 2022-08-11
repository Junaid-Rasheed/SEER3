import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { NavLinks } from './NavLinks';
import AuthButton from './AuthButton';
import GetStartedButton from './GetStartedButton';
import Image from 'next/image';

export default function MobileNav({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="mt-1">
              <div className="w-8 h-8 relative invert">
                {open ?
                  <Image src="/assets/mobile/5_blocks.png" alt="9 blocks" layout="fill" /> :
                  <Image src="/assets/mobile/9_blocks.png" alt="5 blocks" layout="fill" />
                }
              </div>
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
                className="absolute top-0 right-0 mt-16 w-[calc(100vw-40px)] bg-decode3">
                <div className="overflow-hidden relative p-7">
                  <NavLinks
                    className="flex-col items-start divide-y-2 divide-black gap-2 text-black text-xl font-bold w-[100px]" />
                  <div className="flex gap-x-[20px] mt-[50px] whitespace-nowrap">
                    <AuthButton className="border-black text-black text-xs w-full px-4 py-1" />
                    <GetStartedButton className="!bg-black text-decode3 text-xs w-full !px-4" />
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
