import classNames from 'classnames';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { useAuth } from './context/Authentication';
import Button from './Button';
import { useRouter } from 'next/router';
import useSubscription from '../hooks/useSubscription';

export default function GetStartedButton({
  className
}: {
  className?: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const { isSubscribed } = useSubscription(user?.uid);

  async function handleNavigation() {
    let url;
    if (isSubscribed && !!user) {
      url = '/dashboard';
    } else if (user) {
      url = '/pricing';
    } else {
      url = '/signup';
    }
    await router.push(url);
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
