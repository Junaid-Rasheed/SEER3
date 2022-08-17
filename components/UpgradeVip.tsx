import Button from '../components/Button';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

const UpgradeVip = () => {
  const router = useRouter();
  return (
    <div
      className="h-full w-full flex items-end"
      style={{
        backgroundImage: 'url(/assets/desktop/non-vip-bg.png)',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="backdrop-blur-[2px] bg-gradient-to-t from-black/70 to-black/50 h-3/5 pt-8 lg:pt-14 flex items-start w-full justify-center">
        <div className="max-w-5xl px-5 lg:px-0">
          <h3 className="heading text-white text-3xl lg:text-5xl text-center">
            GET ACCESS TO THE MOST COMPREHENSIVE WEB3 FUNDRAISING DATABASE
          </h3>
          <div className="flex justify-center pt-3">
            <Button
              onClick={() => router.push('/pricing')}
              className="bg-decode3 px-6 py-2 font-bold text-center flex items-center uppercase text-black"
            >
              Buy now
              <ArrowSmRightIcon className="h-6 w-6 -rotate-45" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeVip;
