import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";

const useLatest = (value) => {
  let ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref
}


export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, 
  [value])

  return debouncedValue
}