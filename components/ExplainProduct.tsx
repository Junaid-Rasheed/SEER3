import Image from 'next/image';
import GetStartedButton from './GetStartedButton';

export default function ExplainProduct() {
  return (
    <div className="relative flex flex-row justify-center items-center h-screen md:gap-x-[145px] px-10 md:px-[150px]">
      <div className="md:basis-1/2">
        <div className="md:hidden">
          <Image src="/assets/desktop/screen.png" alt="Explain Product" width={721} height={503} />
        </div>
        <h1 className="mt-10 heading uppercase text-7xl">
          DECODING WEB3
        </h1>
        <br />
        <br />
        <p className="font-bold uppercase">
          Decode3 provides financial data and insights on web3 fundraising rounds, start-ups, VCs, funds, angel
          investors, founders and M&As. We collect, structure and analyze real-time data across the web saving you
          hundreds of hours in research and significant resources.
        </p>
        <br />
        <br />
        <GetStartedButton className="w-full h-[67px] justify-center items-center"/>
      </div>
      <div className="hidden md:block basis-1/2">
        <Image src="/assets/desktop/screen.png" alt="Explain Product" width={721} height={503} />
      </div>
    </div>
  )
}
