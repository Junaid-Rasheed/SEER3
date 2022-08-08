import { LoadingLogo } from './icons/Logos';
import classNames from 'classnames';

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={classNames('bg-black h-full flex flex-col items-center justify-center', className)}>
      <LoadingLogo className="w-[373px] h-[323px]" />
      <h1 className="mt-20 heading text-white text-4xl">THE PITCHBOOK OF WEB3</h1>
    </div>
  )
}

