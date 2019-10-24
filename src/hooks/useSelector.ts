import { useMemo, useState, useRef, useLayoutEffect } from 'react';

import { useStore } from './useStore';

const refEquality = (a: unknown, b: unknown) => a === b;

export const useSelector = <S, R>(selector: (state: S) => R, equalityFn = refEquality) => {
  const store = useStore<S>();
  const initialState = useMemo(() => selector(store.getState()), []);
  const [state, setState] = useState(initialState);
  const selectedRef = useRef<R>();

  // Subscribe to changes asap
  useLayoutEffect(() => {
    selectedRef.current = initialState;

    return store.subscribe(() => {
      const selected = selector(store.getState());

      if (equalityFn(selectedRef.current, selected)) {
        return;
      }

      setState(selected);
      selectedRef.current = selected;
    });
  }, []);

  return state;
};
