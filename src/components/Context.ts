import React from 'react';
import { Store } from 'redux';

const ReactReduxContext = React.createContext<Store<any, any> | null>(null);

export default ReactReduxContext;
