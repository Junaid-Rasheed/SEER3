import React, { ReactElement } from 'react';
import { Widget } from '@typeform/embed-react';
import Layout from '../components/Layout';

const Careers = () => {
  return (
    <div className="bg-black">
      <Widget id="BBbUa9CW" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

Careers.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Careers;
