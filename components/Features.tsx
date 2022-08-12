import Image from 'next/image';
import CustomLink from './CustomLink';
import Button from './Button';

const DATA = [
  {
    id: 0,
    img: '/assets/desktop/Grupo 87.svg',
    title: 'WHY DECODE 3',
    content:
      'We provide valuable data and insights to web3 founders and investors. Our goal is to make fundraising more transparent and save you hundreds of hours in research.'
  },
  {
    id: 1,
    img: '/assets/desktop/Grupo 52.svg',
    title: 'DATA SOURCE',
    content:
      'We source data from more than sixty channels including fundraising announcements, crypto news channels, twitter and media articles. New data is updated in real-time.'
  },
  {
    id: 2,
    img: '/assets/desktop/Grupo 54.svg',
    title: 'DATA SETS',
    content:
      'We track more than 2,900+ web3 start-ups, 7600+ active web3 investors (including funds, DAOs and angels) and have rich data on thousands of fundraising rounds.'
  }
];

export default function Features() {
  return (
    <div className="relative px-5 md:px-[115px]">
      <h1 className="mt-10 md:mt-16 heading uppercase text-3xl md:text-7xl whitespace-nowrap">
        DATA IS WHAT WE DO BEST
      </h1>
      <ul className="flex flex-col md:flex-row md:justify-between gap-[70px] mt-10 md:mt-16 mb-[100px] md:mb-[200px] text-white">
        {DATA.map((data) => (
          <li
            className="max-w-[400px] w-full bg-black px-8 py-12"
            key={data.id}
          >
            <div className="flex justify-between gap-5">
              <h1 className="heading uppercase text-4xl text-decode3 mt-6 w-[150px]">
                {data.title}
              </h1>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full aspect-w-1 aspect-h-1">
                  <Image src={data.img} alt={data.title} layout="fill" />
                </div>
              </div>
            </div>
            <p className="uppercase mt-8">{data.content}</p>
          </li>
        ))}
      </ul>
      <div className="bg-black mb-[100px] md:mb-[200px] min-h-[112px] p-4 md:py-8 md:px-10 md:px-[55px] flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-white uppercase heading text-2xl md:text-[2vw]">
          Looking for funding? <br className="md:hidden" /> List your start-up
          for free
        </h1>
        <CustomLink href="/list-your-startup">
          <Button className="uppercase bg-decode3 font-bold py-3 px-8 w-full md:w-[20vw] md:min-w-[182px]">
            List it now
          </Button>
        </CustomLink>
      </div>
    </div>
  );
}
