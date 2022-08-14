import React, { ReactElement } from 'react';
import { Widget } from '@typeform/embed-react';
import PublicLayout from '../components/layouts/PublicLayout';
import { NextPageWithLayout } from '../model/layout-types';

const ListYourStartup: NextPageWithLayout = () => {
  return (
    <div className="bg-black">
      <Widget id="EFcNPa5H" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

ListYourStartup.getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
);

export default ListYourStartup;
