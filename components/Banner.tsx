import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Banner() {
  return (
    <div className="bg-cyan-400 p-1 px-2 flex items-center justify-center uppercase">
      <Link href="/list-your-startup">
        <a target="_parent" className="text-xs md:text-sm flex items-center whitespace-nowrap">
          Looking for funding? List your startup for free &nbsp;
        </a>
      </Link>
      <ArrowNarrowRightIcon className="w-4 h-4 md:w-6 md:h-6" />
    </div>
  );
}
