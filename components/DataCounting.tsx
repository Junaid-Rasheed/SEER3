import { useCallback, useEffect, useRef, useState } from 'react';
import useOnScreen from '../hooks/useOnScreen';

type AutoIncrementParams = {
  startNum?: number;
  endNum: number;
  second?: number;
  fps?: number;
  htmlEl: HTMLElement;
}

const autoIncrement = ({ startNum = 0, endNum, second = 1, fps = 30, htmlEl }: AutoIncrementParams) => {
  let deltaNum = (endNum - startNum) / (fps * second);
  let counter = setInterval(function () {
    htmlEl.textContent = Math.floor(startNum).toLocaleString();
    if (startNum >= endNum) clearInterval(counter)
    startNum += deltaNum;
    startNum = Math.min(startNum, endNum);
  }, 1000 / fps);
}

export default function DataCounting({ className, value }: { className?: string, value: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isIntersecting = useOnScreen(ref);
  const [state, setState] = useState(false);

  const memoizedAutoIncrement = useCallback(() => {
    autoIncrement({ endNum: value, htmlEl: ref.current as HTMLElement })
  }, [value])

  useEffect(() => {
    if (isIntersecting && !state) {
      setState(true);
    }
  }, [isIntersecting])

  useEffect(() => {
    memoizedAutoIncrement();
  }, [state, memoizedAutoIncrement])

  return (
    <h1 ref={ref} className={className} />
  )
}
