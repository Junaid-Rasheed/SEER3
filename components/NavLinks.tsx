import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  {
    title: 'Pricing',
    href: '/pricing'
  },
  {
    title: 'Careers',
    href: '/careers',
    newTab: true
  },
  {
    title: 'Contact',
    href: '/contact'
  }
];

export const NavLinks = ({ className }: { className?: string }) => {
  const { pathname } = useRouter();
  return (
    <ul
      className={classNames(
        'flex flex-row mx-auto text-sm text-white',
        className
      )}
    >
      {navLinks.map(({ href, title, newTab }) => (
        <li
          key={href + title}
          className={classNames('uppercase py-1 px-6', {
            'font-bold': href === `/${pathname.split('/')[1]}`
          })}
        >
          {newTab ? (
            <a href={href} target="_parent" className="hover:text-decode3">
              {title}
            </a>
          ) : (
            <Link href={href}>
              <a className="hover:text-decode3">{title}</a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
