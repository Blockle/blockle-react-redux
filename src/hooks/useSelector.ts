import { useLayoutEffect, useReducer, useRef } from 'react';
import { useStore } from './useStore';

const refEquality = (a: any, b: any) => a === b;

export const useSelector = <S, R>(selector: (state: S) => R, equalityFn = refEquality): R => {
  const [, forceRender] = useReducer(s => s + 1, 0);
  const store = useStore<S>();
  const currentSelected = useRef<R>();
  const currentSelector = useRef<typeof selector>();

  // Set initialValue and update when selector changed
  if (currentSelector.current !== selector) {
    currentSelected.current = selector(store.getState());
  }

  currentSelector.current = selector;

  // Subscribe to changes
  useLayoutEffect(() => {
    return store.subscribe(() => {
      if (!currentSelector.current) {
        return;
      }

      const selected = currentSelector.current(store.getState());

      if (equalityFn(currentSelected.current, selected)) {
        return;
      }

      currentSelected.current = selected;
      forceRender();
    });
  }, []);

  return currentSelected.current as R;
};
