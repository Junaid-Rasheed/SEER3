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
      className="flex justify-between items-center px-4 lg:grid lg:grid-cols-3 py-2 bg-black border-b border-b-neutral-600 relative">
      <Link href="/">
        <a className="w-[180px] h-[40px] relative ml-2 md:ml-8">
        </a>
      </Link>
      <MobileNav className="lg:hidden" />
      <NavLinks className="hidden lg:flex divide-x" />
      <div className="hidden lg:flex flex-row gap-9 mr-8 justify-end">
        {!!session ? (
          <AuthBadge className="flex items-center" />
        ) : (
          <AuthButton />
        )}
        <GetStartedButton className="text-sm md:text-md" />
      </div>
    </nav>
  );
}
