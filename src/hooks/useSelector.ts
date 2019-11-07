import { useMemo, useRef, useLayoutEffect, useReducer } from 'react';

import { useStore } from './useStore';

const refEquality = (a: any, b: any) => a === b;

export const useSelector = <S, R>(selector: (state: S) => R, equalityFn = refEquality) => {
  const [, forceRender] = useReducer(s => s + 1, 0);
  const store = useStore<S>();
  const initialState = useMemo(() => selector(store.getState()), []);
  const selectedRef = useRef<R>(initialState);

  // Subscribe to changes asap
  useLayoutEffect(() => {
    selectedRef.current = initialState;

    return store.subscribe(() => {
      const selected = selector(store.getState());

      if (equalityFn(selectedRef.current, selected)) {
        return;
      }

      selectedRef.current = selected;
      forceRender({});
    });
  }, []);

  return selectedRef.current;
};
