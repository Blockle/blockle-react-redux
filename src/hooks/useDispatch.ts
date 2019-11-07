import { useStore } from './useStore';
import { Dispatch, Action, AnyAction } from 'redux';

export function useDispatch<D = Dispatch<any>>(): D;
export function useDispatch<A extends Action = AnyAction>(): Dispatch<A> {
  const store = useStore();

  return store.dispatch;
}
