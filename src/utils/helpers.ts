import { useRef, useCallback } from 'react';

export function useDebouncedCallback<T extends (...args: any) => void>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<number | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Optional: cancel timeout on unmount
  const cancel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return { debouncedFn, cancel };
}



