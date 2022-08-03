import Image from 'next/image';
import GetStartedButton from './GetStartedButton';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className="grid grid-cols-3 py-4 bg-black border-b border-b-neutral-600 relative">
      <a href="#" className="w-[180px] h-[40px] relative ml-8">
        <Image
          src="/assets/desktop/DECODE Material-08 landscape.png"
          alt="Decode3 Logo"
          layout="fill"
        />
      </a>
      <ul className="flex flex-row mx-auto divide-x">
        <li className="text-white uppercase py-2 px-6">
          <Link href="/pricing"><a>Pricing</a></Link></li>
        <li className="text-white uppercase py-2 px-6">
          <Link href="/career"><a>Career</a></Link></li>
        <li className="text-white uppercase py-2 px-6">
          <Link href="/contact"><a>Contact</a></Link></li>
      </ul>
      <div className="flex flex-row gap-9 mr-8 justify-end">
        {!!session ?
          <button
            className="border border-decode3 text-decode3 font-bold py-2 px-6"
            onClick={() => signOut()}
          >
            Log out
          </button>
          :
          <button
            className="border border-decode3 text-decode3 font-bold py-2 px-6"
            onClick={() => router.push('/signin')}
          >
            Log in
          </button>
        }
        <GetStartedButton />
      </div>
      {!!session && <h1 className="text-white absolute -bottom-10 right-5">{session?.user?.email}</h1>}
    </nav>
  );
}
