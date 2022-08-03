import Image from 'next/image';
import GetStartedButton from './GetStartedButton';

export default function ExplainProduct() {
  return (
    <div className="relative flex flex-row justify-center items-center h-[100vh] gap-x-[145px]">
      <div className="basis-1/2 pl-[150px]">
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
        <GetStartedButton className="w-[360px] h-[67px]"/>
      </div>
      <div className="basis-1/2">
        <Image src="/assets/desktop/screen.png" alt="Explain Product" width={721} height={503} />
      </div>
    </div>
  )
}
