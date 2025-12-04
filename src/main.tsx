// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@root/index.css';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import App from '@root/App';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
    <Toaster theme='system' closeButton richColors expand position='top-right' />
  </Provider>
  // </StrictMode>,
);
