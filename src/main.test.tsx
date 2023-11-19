import { it, expect, describe } from 'vitest';

import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/app/App';
import ErrorBoundary from './components/app/errorBoundary/ErrorBoundary';
import Detailed from './components/app/detailed/Detailed';
import NotFound from './components/notFound/NotFound';
import { setupStore } from './components/store/store';
import userEvent from '@testing-library/user-event';

describe('404 page', () => {
  it('Should display not found page at wrong route', () => {
    const store = setupStore();
    window.location.assign('/bad-route');
    render(
      <Provider store={store}>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<NotFound />} />

              <Route path="/" element={<App />}>
                <Route index element={<Detailed />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </Provider>
    );
    expect(screen.getByText(/Results not Found 404/)).toBeInTheDocument();
  });
});

describe('Error components', () => {
  it('Should display Errror message on click error button', async () => {
    window.location.assign('/');
    const store = setupStore();
    const { container } = render(
      <Provider store={store}>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<NotFound />} />

              <Route path="/" element={<App />}>
                <Route index element={<Detailed />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </Provider>
    );
    await userEvent.click(screen.getByText(/Error/));
    expect(
      container.getElementsByClassName('error-message')[0]
    ).toBeInTheDocument();
  });
});
