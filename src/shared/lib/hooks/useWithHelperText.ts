import { useEffect, useState } from 'react';

export const useWithHelperText = (
  helpertext: string | undefined,
  helperClass: string,
  focusClass: string,
  ) => {
  const [helperClasses, setHelperClasses] = useState([helperClass])

  useEffect(() => {
    if (helpertext) {
      setHelperClasses([helperClass, focusClass])
    } else {
      setHelperClasses([helperClass])
    }
  }, [helpertext])

  return helperClasses;
}