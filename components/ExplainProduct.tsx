import Image from 'next/image';
import GetStartedButton from './GetStartedButton';

export default function ExplainProduct() {
  return (
    <div className="relative md:flex flex-row justify-center items-center md:h-screen md:gap-x-[145px] px-5 md:px-[150px] py-20">
      <div className="md:basis-1/2">
        <div className="md:hidden">
          <Image src="/assets/desktop/screen.png" alt="Explain Product" width={721} height={503} />
        </div>
        <h1 className="mt-10 heading uppercase text-4xl md:text-7xl">
          DECODING WEB3
        </h1>
        <p className="uppercase text-xs md:text-sm mt-4 md:mt-10">
          Decode3 provides financial data and insights on web3 fundraising rounds, start-ups, VCs, funds, angel
          investors, founders and M&As. We collect, structure and analyze real-time data across the web saving you
          hundreds of hours in research and significant resources.
        </p>
        <GetStartedButton className="justify-center items-center w-full md:max-w-[362px] !py-3 md:py-6 mt-4 md:mt-10"/>
      </div>
      <div className="hidden md:block basis-1/2">
        <Image src="/assets/desktop/screen.png" alt="Explain Product" width={721} height={503} />
      </div>
    </div>
  )
}
