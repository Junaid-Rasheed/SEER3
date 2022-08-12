import classNames from 'classnames';
import { useRouter } from 'next/router';
import CustomLink from './CustomLink';
import useSubscription from '../hooks/useSubscription';
import { useMemo } from 'react';
import { useAuth } from './context/Authentication';

const commonLink = [
  {
    title: 'Careers',
    href: '/careers',
    parent: true
  },
  {
    title: 'Contact',
    href: '/contact'
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/decode3_xyz',
    openNewTab: true
  }
];

const premiumLinks = [
  {
    title: 'Dashboard',
    href: '/dashboard'
  },
  ...commonLink
];

const regularLinks = [
  {
    title: 'Pricing',
    href: '/pricing'
  },
  ...commonLink
];

export const NavLinks = ({ className }: { className?: string }) => {
  const { user } = useAuth();
  const { isSubscribed } = useSubscription(user?.uid);
  const { pathname } = useRouter();

  const navLinks = useMemo(() => {
    if (isSubscribed && !!user) {
      return premiumLinks;
    }
    return regularLinks;
  }, [isSubscribed, user]);

  return (
    <ul
      className={classNames('flex flex-row md:text-sm text-white', className)}
    >
      {navLinks.map(({ href, title, openNewTab }) => (
        <li
          key={href + title}
          className={classNames('uppercase py-2 md:py-1 md:px-6', {
            'font-bold': href === `/${pathname.split('/')[1]}`
          })}
        >
          <CustomLink
            href={href}
            openNewTab={openNewTab}
            className="hover:text-decode3"
          >
            {title}
          </CustomLink>
        </li>
      ))}
    </ul>
  );
};
