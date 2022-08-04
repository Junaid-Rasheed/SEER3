import GetStartedButton from './GetStartedButton';

export default function Investment() {
  return (
    <div className="relative">
      <div className="bg-investment-mobile md:bg-investment h-screen bg-cover" />
      <div className="absolute top-0 px-10 md:px-[115px] z-10 text-white w-full md:max-w-[765px]">
        <h1 className="mt-[100px] md:mt-[200px] heading uppercase text-4xl md:text-6xl leading-tight ">
          Indispensable data & insights,
          <span className="text-decode3"> at scale </span>
        </h1>
        <h1 className="heading text-7xl md:text-9xl my-8">$71B+</h1>
        <p className="uppercase max-w-[564px] my-8">
          invested in web3 start-ups. There is ample investment flowing into the crypto industry but it’s not always
          easy to find the right funding sources for web3 start-ups.
        </p>
        <GetStartedButton className="text-black w-full md:w-[362px] h-[67px] mt-8 justify-center items-center"/>
      </div>
    </div>
  )
}
