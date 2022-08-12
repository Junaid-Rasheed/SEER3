import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useMemo } from 'react';
import { getSavedPercent } from '../utils/payment';
import { IPlan } from '../model/payment';
import Plan from './Plan';

export default function Pricing({
  plans,
  onClickBuyBtn,
  isLoading
}: {
  plans: Array<IPlan>;
  onClickBuyBtn: (productId: string) => void;
  isLoading?: boolean;
}) {
  const percent = useMemo(() => {
    return getSavedPercent(plans);
  }, [plans]);

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
              {plans.map((price) => (
                <Tab
                  key={price.id}
                  className={({ selected }) =>
                    classNames(
                      selected ? 'bg-decode3' : 'bg-transparent text-decode3',
                      price.interval === 'year'
                        ? 'py-2 basis-3/5 uppercase font-bold text-sm'
                        : 'py-2 basis-2/5 uppercase font-bold text-sm'
                    )
                  }
                >
                  {price.interval}{' '}
                  {price.interval === 'year' && !!percent
                    ? `(Save ${percent}%)`
                    : ''}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="bg-white bg-opacity-25 mt-[62px] py-7 px-5 md:px-9">
              {plans.map(({ id, price }) => (
                <Tab.Panel key={id}>
                  <Plan
                    isLoading={isLoading}
                    price={price}
                    onClick={() => onClickBuyBtn(id)}
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
