import Image from 'next/image';
import GetStartedButton from './GetStartedButton';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import AuthButton from './AuthButton';
import { NavLinks } from './NavLinks';
import AuthBadge from './AuthBadge';

export default function Header() {
  const { data: session } = useSession();
  return (
    <nav
      className="flex justify-between items-center px-4 md:grid md:grid-cols-3 py-4 bg-black border-b border-b-neutral-600 relative">
      <Link href="/">
        <a className="w-[180px] h-[40px] relative ml-2 md:ml-8">
          <Image
            src="/assets/desktop/DECODE Material-08 landscape.png"
            alt="Decode3 Logo"
            layout="fill"
          />
        </a>
      </Link>
      <MobileNav className="md:hidden" />
      <NavLinks className="hidden md:flex divide-x" />
      <div className="hidden md:flex flex-row gap-9 mr-8 justify-end">
        <GetStartedButton className="text-sm md:text-md" />
        {!!session ? (
            <AuthBadge className="border-2 border-decode3 border h-10 p-3 flex items-center rounded-full focus:outline-2" />
          ) :
          <AuthButton />
        }
      </div>
    </nav>
  );
}
