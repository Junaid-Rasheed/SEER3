import classNames from 'classnames';
import { useRouter } from 'next/router';
import CustomLink from './CustomLink';

const navLinks = [
  {
    title: 'Pricing',
    href: '/pricing'
  },
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

export const NavLinks = ({ className }: { className?: string }) => {
  const { pathname } = useRouter();

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
