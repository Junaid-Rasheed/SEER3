import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Banner() {
  return (
    <div className="bg-cyan-400 p-2 flex items-center justify-center uppercase group">
      <Link href="/list-your-startup">
        <a className="text-[10px] md:text-sm flex items-center group-hover:underline">
          Looking for funding? List your startup for free
        </a>
      </Link>
      <ArrowNarrowRightIcon className="ml-1 w-4 h-4 md:w-6 md:h-6" />
    </div>
  );
}
