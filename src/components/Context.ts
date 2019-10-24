import React from 'react';
import { Store } from 'redux';

const ReactReduxContext = React.createContext<Store | null>(null);

export default ReactReduxContext;
