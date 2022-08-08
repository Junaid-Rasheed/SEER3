import { LoadingLogo } from './icons/Logos';

export default function Loading() {
  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center">
      <LoadingLogo className="w-[373px] h-[323px]" />
      <h1 className="heading text-white text-4xl">THE PITCHBOOK OF WEB3</h1>
    </div>
  )
}

