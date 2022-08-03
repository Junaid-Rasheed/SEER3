import Image from 'next/image';
import GetStartedButton from './GetStartedButton';

export default function Header() {
  return (
    <nav className="grid grid-cols-3 py-4 bg-black border-b border-b-neutral-600">
      <a href="#" className="w-[180px] h-[40px] relative ml-8">
        <Image
          src="/assets/desktop/DECODE Material-08 landscape.png"
          alt="Decode3 Logo"
          layout="fill"
        />
      </a>
      <ul className="flex flex-row mx-auto divide-x">
        <li className="text-white uppercase py-2 px-6"><a href="#">Pricing</a></li>
        <li className="text-white uppercase py-2 px-6"><a href="#">Career</a></li>
        <li className="text-white uppercase py-2 px-6"><a href="#">Contact</a></li>
      </ul>
      <div className="flex flex-row gap-9 mr-8 justify-end">
        <button className="border border-decode3 text-decode3 font-bold py-2 px-6">
          Log in
        </button>
        <GetStartedButton />
      </div>
    </nav>
  );
}
