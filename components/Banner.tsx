import { ArrowNarrowRightIcon } from '@heroicons/react/outline';

export default function Banner() {
  return (
    <div className="bg-cyan-400 h-12 px-7 flex items-center justify-center uppercase font-bold">
      <a href="#" className="text-xs md:text-sm flex items-center">
        Looking for funding? List your startup for free &nbsp;
      </a>
      <ArrowNarrowRightIcon className="w-6 h-6" />
    </div>
  );
}
