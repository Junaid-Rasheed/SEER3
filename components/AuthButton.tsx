import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useAuth } from './context/Authentication';

export default function AuthButton({ className }: { className?: string }) {
  const { logout, user } = useAuth();
  const router = useRouter();
  async function handleAuth() {
    if (user && logout) {
      logout();
    } else {
      await router.push('/signin');
    }
  }

  return (
    <>
      <button
        className={classNames(
          'border border-decode3 text-decode3 font-bold py-2 px-6 uppercase',
          className
        )}
        onClick={handleAuth}
      >
        {!user ? (
          <p className="flex items-center">
            Log in&nbsp;
            <ArrowSmRightIcon className="w-6 h-6" />
          </p>
        ) : (
          'Log out'
        )}
      </button>
    </>
  );
}
