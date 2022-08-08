import { useEffect, useState } from 'react';
import { randomText } from '../utils/animation';

export default function AnimatedText(
  {
    texts,
    className,
    timeEachLetter,
  }: { texts: string[]; className?: string; timeEachLetter?: number }) {
  const [state, setState] = useState(texts[0]);
  useEffect(() => {
    let i = 0;
    const loop = setInterval(() => {
      if (i > texts.length) clearInterval(loop);
      ++i;
      randomText(texts[i % texts.length], setState, timeEachLetter)
    }, 2000);
    return () => {
      clearInterval(loop);
    }
  }, [])
  return (
    <span className={className}>{state}</span>
  )
}
