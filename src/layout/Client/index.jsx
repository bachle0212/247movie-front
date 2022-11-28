import React from 'react';
// react-router-dom
import { Outlet } from 'react-router-dom';
// components
import { Footer, Header } from './components';

Client.propTypes = {};

function Client(props) {
  return (
    <>
      {/* header */}
      <Header />
      {/* content */}
      <div style={{ marginTop: '55px' }}>
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}

export default Client;
