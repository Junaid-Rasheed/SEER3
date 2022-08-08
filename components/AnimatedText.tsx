import { useEffect, useState } from 'react';
import { randomText } from '../utils/animation';

export default function AnimatedText (
  {
    text,
    className,
    timeEachLetter,
  }: { text: string; className?: string; timeEachLetter?: number }) {
  const [state, setState] = useState(text);
  useEffect(() => {
    randomText(state, setState, timeEachLetter);
  }, [])
  return (
    <span className={className}>{state}</span>
  )
}
