import classNames from 'classnames';

export default function GetStartedButton({ className }: { className?: string }) {
  return (
    <button className={classNames('bg-decode3 px-6 py-2 font-bold text-center', className)}>Get Started</button>
  )
}
