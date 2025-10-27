import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useExternalStateOverride<T>(externalState: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(externalState);

  useEffect(() => {
    setValue(externalState);
  }, [externalState]);

  return [value, setValue];
}
