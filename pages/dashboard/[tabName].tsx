import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import DatabaseLayout from '../../components/dashboard/DatabaseLayout';
import SearchBar from '../../components/dashboard/SearchBar';

const TabName = () => {
  const router = useRouter();
  return (
    <div className="px-10 mt-5">
      <SearchBar />
      <div className="mt-5">
        <h2 className="text-xl">{router.query.tabName}</h2>
      </div>
    </div>
  );
};

TabName.getLayout = function getLayout(page: ReactElement) {
  return <DatabaseLayout>{page}</DatabaseLayout>;
};

export default TabName;
