import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'Careers',
    href: '/careers',
    parent: true,
  },
  {
    title: 'Contact',
    href: '/contact',
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/decode3_xyz',
  },
];

export const NavLinks = ({ className }: { className?: string }) => {
  const { pathname } = useRouter();
  return (
    <ul
      className={classNames(
        'flex flex-row md:text-sm text-white',
        className
      )}
    >
      {navLinks.map(({ href, title, parent }) => (
        <li
          key={href + title}
          className={classNames('uppercase py-2 md:py-1 md:px-6', {
            'font-bold': href === `/${pathname.split('/')[1]}`
          })}
        >
          {parent ? (
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
  )
}
