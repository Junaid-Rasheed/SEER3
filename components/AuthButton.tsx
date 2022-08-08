import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export default function AuthButton({ className }: { className?: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <button
      className={classNames('border border-decode3 text-decode3 font-bold py-2 px-6 uppercase', className)}
      onClick={() => !!session ? signOut() : router.push('/signin')}
    >
      {
        !session
          ? <p className="flex items-center">
            Log in&nbsp;
            <ArrowSmRightIcon className="w-6 h-6" />
          </p>
          :
          'Log out'
      }
    </button>
  )
}
