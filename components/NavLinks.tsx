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
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export const NavLinks = ({ className }: { className?: string }) => {
  const { pathname } = useRouter();
  return (
    <ul className={classNames('flex flex-row mx-auto text-white', className)}>
      {navLinks.map(({ href, title }) => (
        <li
          key={href + title}
          className={classNames(
            'uppercase py-1 px-6',
            { 'font-bold': href === `/${pathname.split('/')[1]}` },
          )}
        >
          <Link href={href}>
            <a>{title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
