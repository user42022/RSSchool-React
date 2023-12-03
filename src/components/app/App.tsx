import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <>
      <nav className="navigation">
        <ul className="navigation-list">
          <li>
            <NavLink className="navigation-link" to={'/'}>
              Main
            </NavLink>
          </li>
          <li>
            <NavLink className="navigation-link" to={'/uncontrolled'}>
              Uncontolled Form
            </NavLink>
          </li>
          <li>
            <NavLink className="navigation-link" to={'/controlled'}>
              Contolled Form
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default App;
