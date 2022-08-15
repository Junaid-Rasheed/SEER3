import Loading from '../components/Loading';
import { useEffect, useRef, useState } from 'react';

export default function useShowLoadingScreen(duration: number) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    setIsVisible(true);
    timeoutRef.current = setTimeout(
      () => {
        setIsVisible(false);
      },
      duration,
    );
    return () => clearTimeout(timeoutRef.current);
  }, [duration]);

  return [isVisible];
}
