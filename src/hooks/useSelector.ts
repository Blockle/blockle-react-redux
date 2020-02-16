import { useLayoutEffect, useReducer, useRef } from 'react';
import { useStore } from './useStore';

const refEquality = (a: any, b: any) => a === b;

export const useSelector = <S, R>(selector: (state: S) => R, equalityFn = refEquality): R => {
  const [, forceRender] = useReducer(s => s + 1, 0);
  const store = useStore<S>();
  const selectedRef = useRef<R>();
  const selectorRef = useRef<typeof selector>();

  // Set initialValue and update value when selector changed
  if (selectorRef.current !== selector) {
    selectedRef.current = selector(store.getState());
  }

  selectorRef.current = selector;

  // Subscribe to changes
  useLayoutEffect(() => {
    return store.subscribe(() => {
      if (!selectorRef.current) {
        return;
      }

      const selected = selectorRef.current(store.getState());

      if (equalityFn(selectedRef.current, selected)) {
        return;
      }

      selectedRef.current = selected;
      forceRender({});
    });
  }, []);

  // selectedRef always contains the selector return value
  return selectedRef.current as R;
};
