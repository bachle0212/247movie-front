// react-router-dom
import { Outlet } from 'react-router-dom';
// components
import Sidebar from './components/Sidebar';

Admin.propTypes = {};

function Admin(props) {
  return (
    <>
      {/* header */}
      {/* sidebar */}
      <Sidebar />
      {/* content */}
      <div
        className="content-admin"
        style={{
          position: 'absolute',
          top: '0',
          left: '15%',
          backgroundColor: '#2c3034',
          minHeight: '100vh',
          minWidth: 'calc(85%)',
          borderLeft: 'solid 3px #34383c',
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Admin;
