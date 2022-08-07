import classNames from 'classnames';
import Link from 'next/link';
import { ArrowSmRightIcon } from '@heroicons/react/outline';

export default function GetStartedButton({
  className
}: {
  className?: string;
}) {
  return (
    <Link href="/signup">
      <button
        className={classNames(
          'bg-decode3 px-6 py-2 font-bold text-center flex items-center',
          className
        )}
      >
        Get Started&nbsp;
        <ArrowSmRightIcon className="h-6 w-6 -rotate-45" />
      </button>
    </Link>
  );
}
