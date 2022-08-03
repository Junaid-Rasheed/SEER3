import GetStartedButton from './GetStartedButton';

export default function Hero() {
  return (
    <div className="relative flex justify-center items-center h-[100vh]">
      <video playsInline autoPlay muted loop className="absolute top-0 left-0 object-cover h-full w-[100vw]">
        <source src="/assets/desktop/Horizontal.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <h1 className="mt-10 heading uppercase text-center text-7xl text-white">
          The web3
          <br />
          <span className="text-decode3 text-8xl">Fundraising</span>
          <br />
          Database
        </h1>
        <GetStartedButton className="w-[360px] h-15 mt-[140px] py-5" />
      </div>
    </div>
  )
}
