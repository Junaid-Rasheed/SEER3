import classNames from 'classnames';
import Link from 'next/link';
import { ArrowSmRightIcon } from '@heroicons/react/outline';

export default function GetStartedButton({ className }: { className?: string }) {
  return (
    <Link href="/signup">
      <div
        className={classNames('bg-decode3 px-6 py-2 font-bold text-center flex items-center uppercase', className)}
      >
        Get Started&nbsp;
        <ArrowSmRightIcon className="h-5 w-5 md:h-6 md:w-6 -rotate-45 relative right-2" />
      </div>
    </Link>
  );
}
