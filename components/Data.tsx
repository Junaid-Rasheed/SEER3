export default function Data() {
  return (
    <div className="relative">
      <div className="bg-data-mobile md:bg-data h-screen bg-cover" />
      <div className="absolute top-0 left-0 z-10 px-10 md:px-[115px] w-full">
        <h1 className="mt-16 heading uppercase text-4xl md:text-6xl leading-tight text-white">
          The latest web3 fundraising rounds and the
          <span className="text-decode3"> hottest trends </span>
          in the space
        </h1>
        <ul className="flex flex-col md:flex-row gap-[70px] md:gap-[140px] mt-[100px] md:mt-[330px] text-white">
          <li>
            <h1 className="heading text-7xl md:text-9xl mb-2">3,200+</h1>
            WEB3 FUNDRAISING ROUNDS
          </li>
          <li>
            <h1 className="heading text-7xl md:text-9xl mb-2">8,000+</h1>
            WEB3 INVESTORS
          </li>
          <li>
            <h1 className="heading text-7xl md:text-9xl mb-2">2,900+</h1>
            WEB3 START-UPS
          </li>
        </ul>
      </div>
    </div>
  )
}
