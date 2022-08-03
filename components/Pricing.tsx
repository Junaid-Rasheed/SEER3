import { Tab } from '@headlessui/react'
import classNames from 'classnames';
import Image from 'next/image';

export default function Pricing() {
  return (
    <div className="relative flex justify-center items-center h-[100vh]">
      <video playsInline autoPlay muted loop className="absolute top-0 left-0 object-cover h-full w-[100vw]">
        <source src="/assets/desktop/Horizontal.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 h-full w-[400px] flex flex-col  justify-center">
        <h1 className="mt-10 heading uppercase text-6xl text-white">
          PRICING
        </h1>
        <p className="text-white text-lg uppercase mt-5">
          Make your life easier.
          <br />
          Save hundreds of hours in research.
        </p>
        <div className="mt-11">
          <Tab.Group>
            <Tab.List className="border border-decode3 flex">
              <Tab
                className={({ selected }) => classNames(selected ? 'bg-decode3' : 'bg-transparent text-decode3', 'py-2 px-12 uppercase font-bold text-sm')}
              >
                Month
              </Tab>
              <Tab
                className={({ selected }) => classNames(selected ? 'bg-decode3' : 'bg-transparent text-decode3', 'py-2 px-12 w-full uppercase font-bold text-sm')}
              >
                Year (Save 33%)
              </Tab>
            </Tab.List>
            <Tab.Panels className="bg-white bg-opacity-25 mt-[62px] py-7 px-9">
              <Tab.Panel>
                <a href="#" className="w-[160px] h-[36px] relative ml-8">
                  <Image
                    src="/assets/desktop/DECODE Material-08 landscape.png"
                    alt="Decode3 Logo"
                    layout="fill"
                  />
                </a>
                <h1 className="text-decode3 heading text-5xl">$125</h1>
                <ol className="text-white mt-8">
                  <li className="mb-7">LOREM IPSUM</li>
                  <li className="mb-7">LOREM IPSUM</li>
                  <li className="mb-7">LOREM IPSUM</li>
                  <li className="mb-7">LOREM IPSUM</li>
                </ol>
                <button className="border border-decode3 text-decode3 font-bold py-2 px-6">
                  Buy now
                </button>
              </Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
}
