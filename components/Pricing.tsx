import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useMemo } from 'react';
import Image from 'next/image';
import { Stripe } from 'stripe';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { getPrice, getSavedPercent } from '../utils/payment';
import Button from './Button';

const featuresDescription = [
  'Access to 7600+ active investors',
  'Discover new trends and products',
  'Save hundreds of hours in research',
  'Analyze recent investment activity',
  'Conduct market research',
  'Find investment opportunities'
];

export default function Pricing({
  prices,
  onClickBuyBtn,
  isLoading
}: {
  prices: Array<Stripe.Price>;
  onClickBuyBtn: (productId: string) => void;
  isLoading?: boolean;
}) {
  const percent = useMemo(() => {
    return getSavedPercent(prices);
  }, [prices]);

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
              {prices.map((price) => (
                <Tab
                  key={price.id}
                  className={({ selected }) =>
                    classNames(
                      selected ? 'bg-decode3' : 'bg-transparent text-decode3',
                      price.recurring?.interval === 'year'
                        ? 'py-2 basis-3/5 uppercase font-bold text-sm'
                        : 'py-2 basis-2/5 uppercase font-bold text-sm'
                    )
                  }
                >
                  {price.recurring?.interval}{' '}
                  {price.recurring?.interval === 'year' && !!percent
                    ? `(Save ${percent}%)`
                    : ''}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="bg-white bg-opacity-25 mt-[62px] py-7 px-5 md:px-9">
              {prices.map(({ id, unit_amount }) => (
                <Tab.Panel key={id}>
                  <div className="w-[150px] h-[33px] mb-4 relative">
                    <Image
                      src="/assets/desktop/DECODE Material-08 landscape.png"
                      alt="Decode3 Logo"
                      layout="fill"
                    />
                  </div>
                  <h1 className="text-decode3 heading text-5xl">
                    ${getPrice(unit_amount)}
                  </h1>
                  <Button
                    isLoading={isLoading}
                    className="mt-3 py-2 text-center w-full"
                    onClick={() => onClickBuyBtn(id)}
                  >
                    Buy now
                  </Button>
                  <ol className="text-white text-sm mt-8 uppercase">
                    {featuresDescription.map((feature, index) => (
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
