import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { persister, store } from './app/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // {/*</React.StrictMode>,*/}
);
