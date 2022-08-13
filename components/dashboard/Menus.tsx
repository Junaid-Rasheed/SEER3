import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const tabMenus = [
  {
    title: 'Fundraising rounds',
    href: '/fundraising-rounds'
  },
  {
    title: 'Investors',
    href: '/investors'
  },
  {
    title: 'Startups',
    href: '/startups'
  },
  {
    title: 'founders',
    href: '/founders'
  },
  {
    title: 'M&A Deals',
    href: 'ma-deals'
  },
  {
    title: 'Categories',
    href: '/categories'
  },
  {
    title: 'Subcategories',
    href: '/subcategories'
  },
  {
    title: 'Locations',
    href: '/locations'
  },
  {
    title: 'ecosystems',
    href: '/ecosystems'
  }
];

const Menus = () => {
  const router = useRouter();
  return (
    <nav className="px-5 mt-10 text-white">
      <div className="overflow-y-hidden overflow-x-auto whitespace-nowrap h-14 flex items-center">
        {tabMenus.map((tab) => (
          <Link href={`/dashboard${tab.href}`} key={tab.href}>
            <a
              className={classNames(
                'uppercase inline-block mx-6 pb-2',
                router.asPath === `/dashboard${tab.href}`
                  ? 'text-decode3 border-b-2 font-bold border-decode3'
                  : ''
              )}
            >
              {tab.title}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Menus;
