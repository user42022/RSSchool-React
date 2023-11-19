import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import ErrorBoundary from './components/app/errorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detailed from './components/app/detailed/Detailed';
import './index.css';
import { Provider } from 'react-redux';
import { setupStore } from './components/store/store';
import NotFound from './components/notFound/NotFound';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Detailed />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);
