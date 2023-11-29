import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/app/App';
import Main from './pages/main/Main';
import ControlledForm from './pages/controlled/ControlledForm';
import UncontrolledForm from './pages/uncontrolled/UncontrolledForm';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
          <Route path="/uncontrolled" element={<UncontrolledForm />} />
          <Route path="/controlled" element={<ControlledForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
