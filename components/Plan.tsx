import React from 'react';
import Image from 'next/image';
import { getPrice } from '../utils/payment';
import Button from './Button';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { featuresDescription } from '../constants';
import StripePortalButton from './StripePortalButton';

type Props = {
  onClick?: () => void;
  price: number;
  isLoading?: boolean;
  isSubscribed?: boolean;
};
const Plan = ({ onClick, price, isLoading, isSubscribed }: Props) => {
  return (
    <div>
      <div className="w-[150px] h-[33px] mb-4 relative">
        <Image
          src="/assets/desktop/DECODE Material-08 landscape.png"
          alt="Decode3 Logo"
          layout="fill"
        />
      </div>
      <h1 className="text-decode3 heading text-5xl">${getPrice(price)}</h1>
      {isSubscribed ? (
        <StripePortalButton />
      ) : (
        <Button
          isLoading={isLoading}
          className="mt-4 py-4 text-center w-full font-bold"
          onClick={onClick}
        >
          Buy now
        </Button>
      )}
      <ol className="text-white text-sm mt-8 uppercase">
        {featuresDescription.map((feature, index) => (
          <li className="mb-5 flex items-center gap-2 md:gap-4" key={index}>
            <CheckCircleIcon className="w-4 h-4 text-decode3" />
            {feature}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Plan;
