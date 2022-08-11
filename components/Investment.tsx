import GetStartedButton from './GetStartedButton';
import DataCounting from './DataCounting';

export default function Investment() {
  return (
    <section className="relative bg-black pb-[100px] md:pb-[200px]">
      <div className="relative z-10 px-5 md:px-[115px] text-white w-full md:max-w-[920px]">
        <h1 className="mt-10 md:mt-20 heading uppercase text-3xl md:text-7xl leading-tight ">
          Indispensable data & insights,
          <span className="text-decode3"> at scale </span>
        </h1>
        <div className="flex items-center">
          <h1 className="heading text-6xl md:text-9xl my-8">$</h1>
          <DataCounting value={71} className="heading text-7xl md:text-9xl my-8" />
          <h1 className="heading text-6xl md:text-9xl my-8 text-center">B+</h1>
        </div>
        <p className="uppercase max-w-[564px] my-5 md:my-8">
          invested in web3 start-ups. There is ample investment flowing into the crypto industry but it’s not always
          easy to find the right funding sources for web3 start-ups.
        </p>
        <GetStartedButton className="text-black w-full md:w-[362px] h-[67px] mt-8 justify-center items-center" />
      </div>
      <div className="mx-auto pointer-events-none absolute inset-x-0 bottom-0">
        <SvgBackground />
      </div>
    </section>
  )
}

const SvgBackground = () => (
  <svg
    className="line-graph anime js-animate"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 600"
  >
    <g
      style={{
        isolation: 'isolate',
      }}
    >
      <path
        className="line-graph__stroke line-graph__stroke-1"
        d="M.48 599s974 0 1474-631"
        style={{
          fill: 'none',
          stroke: '#d0f224',
          strokeWidth: 3,
        }}
      />
      <path
        className="line-graph__stroke line-graph__stroke-2"
        d="M.48 599s998 0 1499-524"
        style={{
          fill: 'none',
          stroke: '#d0f224',
          strokeWidth: 3,
          opacity: 0.1599999964237213,
          isolation: 'isolate',
        }}
      />
      <path
        className="line-graph__stroke line-graph__stroke-3"
        d="M.48 599s981 0 1513-369"
        style={{
          fill: 'none',
          stroke: '#d0f224',
          strokeWidth: 3,
          opacity: 0.07999999821186066,
          isolation: 'isolate',
        }}
      />
      <path
        className="line-graph__stroke line-graph__stroke-4"
        d="M.48 599s946 0 1530-157"
        style={{
          fill: 'none',
          stroke: '#d0f224',
          strokeWidth: 3,
          opacity: 0.03999999910593033,
          isolation: 'isolate',
        }}
      />
      <circle
        className="anime--appear hide--mobile"
        data-animation-delay=".3s"
        cx={1121.07}
        cy={279.12}
        r={11.5}
        style={{
          fill: '#d0f224',
        }}
      />
    </g>
  </svg>
)
