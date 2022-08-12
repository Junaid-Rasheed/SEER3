import classNames from 'classnames';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { useAuth } from './context/Authentication';
import Button from './Button';
import { useRouter } from 'next/router';

export default function GetStartedButton({
  className
}: {
  className?: string;
}) {
  const { user } = useAuth();
  const router = useRouter();

  async function handleNavigation() {
    await router.push(user ? '/dashboard' : '/signup');
  }

  return (
    <Button
      onClick={handleNavigation}
      className={classNames(
        'bg-decode3 px-6 py-2 font-bold text-center flex items-center uppercase',
        className
      )}
    >
      Get Started&nbsp;
      <ArrowSmRightIcon className="h-6 w-6 -rotate-45" />
    </Button>
  );
}
