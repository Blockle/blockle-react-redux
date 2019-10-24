# @blockle/react-redux

Drop in replacemenet for react-redux when only using hooks.

## Install

```bash
yarn add @blockle/react-redux
```

## Usage

```tsx
import React from 'react';
import { Store } from 'redux';

interface Props {
  children: React.ReactNode;
  store: Store;
}

const AppShell = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

const MyComponent = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.userName);

  return (
    <div>
      {userName}

      <button onClick={() => dispatch(randomizeName())}>
        Randomize name
      </button>
    </div>
  )
}


```
