import { MutableRefObject, useEffect } from "react";

export const useDetectClickOutside = (
  ref?: MutableRefObject<HTMLElement | null>,
  callback?: () => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current && !ref.current.contains(event.target as HTMLElement)) {
        callback && callback();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
