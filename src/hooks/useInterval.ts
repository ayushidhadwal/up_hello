import {useRef, useEffect} from 'react';

export function useInterval(callback:any, delay:any) {
  const intervalRef = useRef();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = setInterval(() => {
        callbackRef.current();
      }, delay);

      return () => clearInterval(intervalRef.current);
    }
  }, [delay]);

  return intervalRef;
}
