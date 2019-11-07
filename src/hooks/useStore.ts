import { useContext } from 'react';

import ReactReduxContext from '../components/Context';
import { Store, AnyAction, Action } from 'redux';

export const useStore = <S = any, A extends Action = AnyAction>(): Store<S, A> => {
  const store = useContext(ReactReduxContext);

  if (!store) {
    throw new Error('Wrap your application in <Provider /> exported by @blockle/react-redux');
  }

  return store;
};
