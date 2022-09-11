import { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { SearchOutlined } from '@mui/icons-material';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';

import { DataGridComponent, IDataGridData } from './DataGrid';
// import { Navbar } from '../components';
import { StyledTab, StyledTabs } from '../styles/tabs.styled';
import { Background } from '../styles/Layout.styled';
import { HorizontalLine } from '../styles/hrline';
import { getTable, getTableData } from '../service/baserow.service';
import { StyledOutlinedInput } from '../styles/outlinedInput.styled';

const TABLES = [
  {
    id: 92017,
    name: 'Fundraising - WEB3 Companies',
    order: 0,
    database_id: 38338
  },
  {
    id: 92018,
    name: 'Fundraising - Web3 Funds',
    order: 1,
    database_id: 38338
  },
  {
    id: 92019,
    name: 'M&A Deals',
    order: 2,
    database_id: 38338
  },
  {
    id: 92020,
    name: 'WEB3 INVESTORS',
    order: 3,
    database_id: 38338
  },
  {
    id: 92021,
    name: ' WEB3 COMPANIES',
    order: 4,
    database_id: 38338
  },
  // {
  //   id: 92022,
  //   name: 'Crypto Companies - Categories',
  //   order: 5,
  //   database_id: 38338,
  // },
  // {
  //   id: 92023,
  //   name: 'Crypto Companies - Subcategories',
  //   order: 6,
  //   database_id: 38338,
  // },
  {
    id: 92024,
    name: 'Web3 Companies - Founders',
    order: 7,
    database_id: 38338
  },
  // {
  //   id: 92025,
  //   name: 'Fundraising Rounds - Stages',
  //   order: 8,
  //   database_id: 38338,
  // },
  // {
  //   id: 92026,
  //   name: 'WEB3 ECOSYSTEMS',
  //   order: 9,
  //   database_id: 38338,
  // },
  // {
  //   id: 92027,
  //   name: 'Crypto Companies - Locations',
  //   order: 10,
  //   database_id: 38338,
  // },
  {
    id: 92028,
    name: 'Investors - Locations',
    order: 11,
    database_id: 38338
  },
  {
    id: 92029,
    name: 'Funds - Founders',
    order: 12,
    database_id: 38338
  },
  // {
  //   id: 92030,
  //   name: 'Angel Investors',
  //   order: 13,
  //   database_id: 38338,
  // },
  { id: 93254, name: 'WEB3 DEAL FLOW', order: 14, database_id: 38338 }
];

const DashboardData = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState<any>();
  const [totalPages, setTotalPages] = useState<any>(null);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchRef = useRef<HTMLInputElement>(null);

  const getTableStructureAndData = useCallback(async (tableID: number) => {
    setData(undefined);
    setIsTableLoading(true);
    let result: any;
    if (tableID === 93254) {
      result = [];
      const fields: any[] = [];
      setData({ page: 1, tableID: tableID, result, fields });
      return;
    }
    result = await getTable(tableID);

    setData({ page: 1, tableID: tableID, ...result });
    setIsTableLoading(false);
  }, []);

  useEffect(() => {
    getTableStructureAndData(TABLES[0].id);
  }, []);
  useEffect(() => {
    if (data?.count && data?.results?.length) {
      const totalRecords = data?.count;
      setTotalPages(Math.ceil(totalRecords / 100));
    }
  }, [data]);

  const selectTable = (tableID: number) => {
    getTableStructureAndData(tableID);
  };

  const renderTabs = (): JSX.Element[] => {
    const tabs: JSX.Element[] = [];

    TABLES.forEach((t, i) => {
      tabs.push(
        <StyledTab
          label={t.name}
          onClick={() => selectTable(t.id)}
          key={i}
          sx={{
            '&:hover': {
              color: '#8ABD00'
            }
          }}
        />
      );
    });
    return tabs;
  };

  const loadNewData = async (newPage?: number | undefined, s?: string) => {
    setIsTableLoading(true);
    if (data) {
      setData({
        ...data,
        fields: data.fields,
        tableID: data.tableID,
        results: [],
        count: s ? 0 : data.count
      });
    }

    const newTableData = await getTableData(
      TABLES[selectedTab].id,
      newPage,
      100,
      s
    );

    if (data) {
      setData({
        fields: data.fields,
        tableID: data.tableID,
        page: newPage,
        ...newTableData
      });
    }
    setIsTableLoading(false);
  };

  const onPageChange = async (newPage: number) => {
    loadNewData(newPage, searchQuery);
  };

  return (
    <>
      <Head>
        <title>Decode 3</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column'
        }}
      >
        {/* <Navbar /> */}
        {/* <HorizontalLine /> */}
        <div />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '90%',
            flex: 1,
            maxHeight: '100%'
          }}
        >
          <StyledTabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {renderTabs()}
          </StyledTabs>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loadNewData(1, searchQuery);
            }}
          >
            <FormControl fullWidth sx={{ my: 3 }}>
              <StyledOutlinedInput
                ref={searchRef}
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlined htmlColor="#707070" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
          <DataGridComponent
            data={data}
            onPageChange={onPageChange}
            isLoading={isTableLoading}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardData;