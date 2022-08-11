import GetStartedButton from './GetStartedButton';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import AuthButton from './AuthButton';
import { NavLinks } from './NavLinks';
import AuthBadge from './AuthBadge';
import { HeaderLogo } from './icons/Logos';

export default function Header() {
  const { data: session } = useSession();
  return (
    <nav
      className="flex justify-between items-center pr-4 lg:grid lg:grid-cols-3 py-2 bg-black border-b border-b-neutral-600 relative">
      <Link href="/">
        <a className="w-[150px] h-[30px] md:w-[180px] md:h-[40px] relative ml-2 md:ml-8">
          <HeaderLogo className="w-full h-full" />
        </a>
      </Link>
      <div className="flex lg:hidden gap-2 items-center">
        <GetStartedButton className="text-xs pr-0 pl-3 py-0 h-9" />
        <MobileNav />
      </div>
      <NavLinks className="hidden lg:flex divide-x mx-auto" />
      <div className="hidden lg:flex flex-row gap-9 mr-8 justify-end">
        {!!session ? (
          <AuthBadge className="flex items-center" />
        ) : (
          <AuthButton className="text-sm" />
        )}
        <GetStartedButton className="text-sm" />
      </div>
    </nav>
  );
}
