import Image from 'next/image';

const DATA = [
  {
    id: 0,
    img: '/assets/desktop/DECODE Material-10.png',
    title: 'For web3',
    target: 'FOUNDERS',
    content: 'Access to 7600+ active investors. Scroll through thousands of start-ups (and the investors funding them), analyze their products and discover new trends. Identify potential investors for your start-up.',
  },
  {
    id: 1,
    // img: '/assets/desktop/Grupo 43.svg',
    img: '/assets/desktop/Grupo 43.svg',
    title: 'For web3',
    target: 'INVESTORS',
    content: 'Analyze recent investment activity, discover early stage start-ups, find investment opportunities and conduct market research. Screen the universe of web3 funds / VCs and access the latest fundraising news and trends.',
  },
  {
    id: 2,
    img: '/assets/desktop/DECODE Material-12.png',
    title: 'For web3',
    target: 'FUND MANAGERS',
    content: 'Access competitive intelligence, industry benchmarking and improve investor relations outreach. An instant look at the competitive landscape including the ability to sort funds by location, investment strategy and portfolio holdings.',
  },
]

export default function WhoWeServe() {
  return (
    <div className="relative px-10 md:px-[115px]">
      <h1 className="mt-20 heading uppercase text-4xl md:text-7xl">
        More than a platform.
        <span className="text-decode3"> A partner </span>
      </h1>
      <ul className="flex flex-col justify-around md:flex-row gap-10 my-16 text-white">
        {DATA.map((data) => (
          <li className="w-full md:max-w-[366px] bg-black px-8 py-12" key={data.id}>
            <div className="relative w-full aspect-h-1 aspect-w-1">
              <Image src={data.img} alt={data.target} layout="fill" />
            </div>
            <h1 className="heading uppercase text-4xl mt-6">
              {data.title}
              <br />
              <span className="text-decode3"> {data.target} </span>
            </h1>
            <p className="uppercase mt-8">
              {data.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
