import React from 'react';
import { Store } from 'redux';

import ReactReduxContext from './Context';

interface Props {
  children: React.ReactNode;
  store: Store;
}

const Provider = ({ children, store }: Props) => {
  return <ReactReduxContext.Provider value={store}>{children}</ReactReduxContext.Provider>;
};

export default Provider;
