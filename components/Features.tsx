import Image from 'next/image';

const DATA = [
  {
    id: 0,
    img: '/assets/desktop/DECODE Material-13.png',
    title: 'WHY DECODE 3',
    content: 'We provide valuable data and insights to web3 founders and investors. Our goal is to make fundraising more transparent and save you hundreds of hours in research.',
  },
  {
    id: 1,
    img: '/assets/desktop/DECODE Material-15.png',
    title: 'DATA SOURCE',
    content: 'We source data from more than sixty channels including fundraising announcements, crypto news channels, twitter and media articles. New data is updated in real-time.',
  },
  {
    id: 2,
    img: '/assets/desktop/DECODE Material-14.png',
    title: 'DATA SETS',
    content: 'We track more than 2,900+ web3 start-ups, 7600+ active web3 investors (including funds, DAOs and angels) and have rich data on thousands of fundraising rounds.',
  },
];

export default function Features() {
  return (
    <div className="relative px-[115px]">
      <h1 className="mt-16 heading uppercase text-7xl">
        More than a platform.
        <span className="text-decode3"> A partner </span>
      </h1>
      <ul className="flex flex-row gap-x-[100px] mt-16 mb-[200px] text-white">
        {DATA.map((data) => (
          <li className="max-w-[400px] bg-black px-8 py-12" key={data.id}>
            <div className="flex gap-[50px]">
              <h1 className="heading uppercase text-4xl text-decode3 mt-6">
                {data.title}
              </h1>
              <div className="relative w-[110px] h-[110px]">
                <Image src={data.img} alt={data.title} layout="fill" />
              </div>
            </div>
            <p className="uppercase mt-8">
              {data.content}
            </p>
          </li>
        ))}
      </ul>
      <div className="bg-black mb-[200px] min-h-[112px] py-8 px-[55px] flex justify-between">
        <h1 className="text-white uppercase heading text-5xl">
          Looking for funding? List your start-up for free
        </h1>
        <button className="uppercase bg-decode3 font-bold py-3 px-8 w-[385px]">
          List it now
        </button>
      </div>
    </div>
  )
}
