import classNames from 'classnames';
import Link from 'next/link';

const navLinks = [
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'Career',
    href: '/career',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export const NavLinks = ({ className }: { className?: string }) => {
  return (
    <ul className={classNames('flex flex-row mx-auto text-white', className)}>
      {navLinks.map(({ href, title }) => (
        <li className="uppercase py-2 px-6" key={href + title}>
          <Link href={href}>
            <a>{title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
