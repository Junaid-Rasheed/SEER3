import React, { ReactElement } from 'react';
import { Widget } from '@typeform/embed-react';
import Layout from '../components/Layout';
import { NextPageWithLayout } from '../model/layout-types';

const ListYourStartup: NextPageWithLayout = () => {
  return (
    <div className="bg-black">
      <Widget id="EFcNPa5H" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

ListYourStartup.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ListYourStartup;
