import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { HeaderLogo } from './icons/Logos';

const pricePlans = [
  {
    title: 'yearly',
    price: '$999',
    href: 'https://buy.stripe.com/test_7sIaHw6nNgTNamk8wx',
    features: [
      'Access to 7600+ active investors',
      'Discover new trends and products',
      'Save hundreds of hours in research',
      'Analyze recent investment activity',
      'Conduct market research',
      'Find investment opportunities',
    ],
  },
  {
    title: 'monthly',
    price: '$125',
    href: 'https://buy.stripe.com/test_9AQ8zo7rRdHBcusaEE',
    features: [
      'Access to 7600+ active investors',
      'Discover new trends and products',
      'Save hundreds of hours in research',
      'Analyze recent investment activity',
      'Conduct market research',
      'Find investment opportunities',
    ],
  },
];

export default function Pricing() {
  return (
    <div className="relative flex justify-center items-center px-10 bg-black">
      <div className="relative z-10 h-full w-[400px] flex flex-col  justify-center">
        <h1 className="mt-10 heading uppercase text-4xl md:text-6xl text-white">
          PRICING
        </h1>
        <p className="text-white text-sm md:text-lg uppercase mt-5">
          Make your life easier.
          <br />
          Save hundreds of hours in research.
        </p>
        <div className="my-11">
          <Tab.Group>
            <Tab.List className="border border-decode3 flex">
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected ? 'bg-decode3' : 'bg-transparent text-decode3',
                    'py-2 basis-3/5 uppercase font-bold text-sm',
                  )
                }
              >
                Year (Save 33%)
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected ? 'bg-decode3' : 'bg-transparent text-decode3',
                    'py-2 basis-2/5 uppercase font-bold text-sm',
                  )
                }
              >
                Month
              </Tab>
            </Tab.List>
            <Tab.Panels className="bg-white bg-opacity-25 mt-[62px] py-7 px-5 md:px-9">
              {pricePlans.map(({ title, features, price }) => (
                <Tab.Panel className="w-full" key={title}>
                  <HeaderLogo className="w-[159px] h-[35px] mb-4" />
                  <h1 className="text-decode3 heading text-5xl mb-5">{price}</h1>
                  <Link href="https://buy.stripe.com/test_9AQ8zo7rRdHBcusaEE">
                    <a>
                      <p className="py-2 text-center w-full uppercase bg-decode3 font-bold text-sm">
                        Buy now
                      </p>
                    </a>
                  </Link>
                  <ol className="text-white text-sm mt-8 uppercase">
                    {features.map((feature, index) => (
                      <li
                        className="mb-5 flex items-center gap-2 md:gap-4"
                        key={index}
                      >
                        <CheckCircleIcon className="w-4 h-4 text-decode3" />
                        {feature}
                      </li>
                    ))}
                  </ol>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
