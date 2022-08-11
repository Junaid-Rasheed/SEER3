import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Banner() {
  return (
    <div className="bg-cyan-400 p-1 px-1 flex items-center justify-center uppercase">
      <Link href="/list-your-startup">
        <a target="_parent" className="text-xs md:text-sm flex items-center">
          Looking for funding? List your startup for free
        </a>
      </Link>
      <ArrowNarrowRightIcon className="ml-1 w-3 h-4 md:w-6 md:h-6" />
    </div>
  );
}
