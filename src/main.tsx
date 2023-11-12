import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import ErrorBoundary from './components/app/errorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detailed from './components/app/detailed/Detailed';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Detailed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
