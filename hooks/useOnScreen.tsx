import { RefObject, useEffect, useState } from 'react';

export default function useOnScreen(elementRef: RefObject<Element>) {

  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
    )
    observer.observe(elementRef.current as Element);
    return () => {
      observer.disconnect();
    }
  }, [])
  return isIntersecting;
}
