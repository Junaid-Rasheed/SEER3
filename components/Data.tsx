import DataCounting from './DataCounting';

const statistic = [
  {
    title: 'WEB3 FUNDRAISING ROUNDS',
    value: 3200,
  },
  {
    title: 'WEB3 INVESTORS',
    value: 8000,
  },
  {
    title: 'WEB3 START-UPS',
    value: 2900,
  },
];

export default function Data() {
  return (
    <div className="relative pb-[100px] md:pb-[200px]">
      <div className="relative z-10 px-10 md:px-[115px] w-full">
        <h1 className="mt-10 md:mt-20 heading uppercase text-3xl md:text-7xl leading-tight text-white">
          The latest web3 fundraising rounds and the
          <span className="text-decode3"> hottest trends </span>
          in the space
        </h1>
        <ul className="flex flex-col justify-between md:flex-row gap-5 md:gap-[70px] mt-[50px] md:mt-[330px] text-white">
          {statistic.map(({ title, value }) => (
            <li key={title + value}>
              <div className="flex items-center">
                <DataCounting value={value} className="heading text-6xl md:text-[7vw] mb-2" />
                <span className="heading text-5xl md:text-[7vw] mb-2">+</span>
              </div>
              <p>{title}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-0 left-0 bg-data-mobile md:bg-data h-full w-full bg-cover bg-black" />
    </div>
  )
}

