import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Banner() {
  return (
    <div className="bg-cyan-400 p-1 flex items-center justify-center">
      <Link href="/list-your-startup">
        <a target="_parent" className="text-sm flex items-center">
          Looking for funding? List your startup for free &nbsp;
        </a>
      </Link>
      <ArrowNarrowRightIcon className="w-6 h-6" />
    </div>
  );
}
