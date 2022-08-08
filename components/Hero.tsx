import GetStartedButton from './GetStartedButton';
import AnimatedText from './AnimatedText';

export default function Hero() {
  return (
    <div className="relative flex justify-center items-center h-screen">
      <video poster="/assets/desktop/desktop_thumbs.png" playsInline autoPlay muted loop
             className="absolute hidden md:block top-0 left-0 object-cover h-full w-screen">
        <source src="/assets/desktop/Horizontal.mp4" type="video/mp4" />
      </video>
      <video poster="/assets/mobile/mobile_thumbs.png" playsInline autoPlay muted loop
             className="absolute md:hidden top-0 left-0 object-cover h-full w-screen">
        <source src="/assets/mobile/Vertical.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <h1 className="mt-10 heading uppercase text-center text-5xl md:text-7xl text-white">
          The web3
          <br />
          <AnimatedText text="Fundraising" className="text-decode3 text-6xl md:text-8xl" timeEachLetter={50} />
          <br />
          Database
        </h1>
        <GetStartedButton className="w-full md:w-[360px] min-h-15 mt-[140px] py-5 justify-center" />
      </div>
    </div>
  )
}
