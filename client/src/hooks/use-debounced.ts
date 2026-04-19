import { useEffect, useState } from "react";

// Returns a delayed version of a value to reduce frequent search requests.
export function useDebounced<T>(value: T, delay = 350): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}
