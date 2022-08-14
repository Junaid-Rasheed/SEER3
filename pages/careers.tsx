import React, { ReactElement } from 'react';
import { Widget } from '@typeform/embed-react';
import PublicLayout from '../components/layouts/PublicLayout';

const Careers = () => {
  return (
    <div className="bg-black">
      <Widget id="BBbUa9CW" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

Careers.getLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>;

export default Careers;
