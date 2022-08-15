import { LoadingLogo } from './icons/Logos';
import classNames from 'classnames';
import ProgressBar from './ProgressBar';

export default function Loading({ className }: { className?: string; duration?: number }) {
  return (
    <div className={classNames('relative z-10 bg-black h-full flex flex-col items-center justify-center', className)}>
      <LoadingLogo className="w-[206px] h-[179px] md:w-[373px] md:h-[323px]" />
      <ProgressBar className="mt-10 md:mt-20" />
      <h1 className="mt-10 md:mt-20 heading text-white text-xl md:text-4xl">THE PITCHBOOK OF WEB3</h1>
    </div>
  )
}
