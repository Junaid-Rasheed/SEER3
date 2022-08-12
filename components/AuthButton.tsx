import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useAuth } from './context/Authentication';
import Button from './Button';

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
      <Button
        className={classNames(
          user
            ? 'border border-decode3 text-decode3 font-bold py-2 px-6 uppercase hover:bg-black hover:text-white hover:opacity-80'
            : 'bg-black border border-decode3 text-decode3 font-bold py-2 px-6 uppercase hover:text-black',
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
      </Button>
    </>
  );
}
