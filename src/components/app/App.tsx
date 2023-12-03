import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Main</Link>
          </li>
          <li>
            <Link to={'/uncontrolled'}>Uncontolled Form</Link>
          </li>
          <li>
            <Link to={'/controlled'}>Contolled Form</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default App;
