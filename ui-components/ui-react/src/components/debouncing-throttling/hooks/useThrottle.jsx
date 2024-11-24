import { useEffect, useRef, useState } from "react";

function useThrottle(value, delay) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now()); // To track the last update time
  const timeoutRef = useRef(null); // To store the timeout ID

  useEffect(() => {
    // If there's an active timeout, clear it.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const handler = () => {
      if (Date.now() - lastRan.current >= delay) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    };

    // Set a timeout to update the throttled value when it's time.
    timeoutRef.current = setTimeout(handler, delay);

    return () => {
      // Cleanup: clear the timeout when component unmounts or dependencies change
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]); // Only re-run effect if value or delay changes

  return throttledValue;
}

export default useThrottle;
