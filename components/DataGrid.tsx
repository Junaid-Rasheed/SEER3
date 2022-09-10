import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, PaginationItem, TextField } from '@mui/material';
import {
  GridColDef,
  GridColumns,
  gridPageCountSelector,
  gridPageSelector,
  GridValidRowModel,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';

import { StyledDataGrid } from '../styles/datagrid.syled';
import { renderLogo } from './datagrid/logoCell';
import { renderCellExpand } from './datagrid/expandableCell';
import { InfoBox } from '../styles/infobox';
import { StyledPagination } from '../styles/pagination.styles';
import { renderCurrency } from './datagrid/currencyCell';
import { renderExpandableChips } from './datagrid/expandableChipsCell';
import { renderChip } from './datagrid/chipCell';
import { renderExpandableTextCell } from './datagrid/expandableTextCell';

export interface IField {
  id: number;
  name: string;
  order: number;
  table_id: number;
  type: string;
  link_row_table: number;
  link_row_related_field: number;
  primary: boolean;
}
export interface IDataGridData {
  tableID: number;
  count: number;
  page: number;
  next: string;
  previous: string;
  results: any[];
  fields: IField[];
}

interface IProps {
  data?: IDataGridData;
  onPageChange: (newPage: number) => {};
  isLoading: boolean;
  totalPages: number;
}

export const DataGridComponent = ({
  data,
  onPageChange,
  isLoading,
  totalPages
}: IProps): JSX.Element => {
  const [columns, setColumns] = useState<GridColumns<GridValidRowModel>>([]);
  const [rows, setRows] = useState<GridColumns<GridValidRowModel>>([]);
  const getColumnDef = (field: IField) => {
    const colDef: GridValidRowModel = {
      field: field.name,
      headerName: field.name,
      width: 150,
      editable: false,
      type: '',
      id: field.id,
      tableId: field.table_id
    };
    if (
      [567107, 567138, 567153, 567216, 567221, 567191, 567192].includes(
        field.id
      )
    ) {
      // Amount override
      colDef.renderCell = renderCurrency;
    }

    // Logo
    else if (field.type === 'file') {
      colDef.renderCell = renderLogo;
      colDef.sortable = false;
      colDef.width = 75;
      colDef.resizable = false;
    } else if (
      [
        567136, 567158, 567182, 567215, 567220, 567226, 567234, 567238, 567241,
        567244, 567248, 567254
      ].includes(field.id)
    ) {
      colDef.renderCell = renderExpandableTextCell;
      colDef.width = 200;
    } else if (field.type === 'long_text') {
      colDef.renderCell = renderCellExpand;
      colDef.width = ['M&A Deal'].includes(field.name) ? 380 : 180;
    } else if (field.type === 'link_row' || field.type === 'multiple_select') {
      colDef.renderCell = renderExpandableChips;
      colDef.width = ['Name', 'Stages', 'Category'].includes(field.name)
        ? 180
        : 300;
    } else if (field.type === 'single_select') {
      colDef.renderCell = renderChip;
      colDef.width = 180;
    }
    return colDef;
  };
  useEffect(() => {
    setColumns([]);
    setRows([]);

    if (data) {
      const dataColumns: any[] = [];

      // Logo column placement
      if ([86188, 86189, 86191, 86192, 86201].includes(data.tableID)) {
        data.fields.forEach((field) => {
          if ([527312, 527327, 527358, 527388, 527450].includes(field.id)) {
            dataColumns.unshift(getColumnDef(field));
          } else {
            dataColumns.push(getColumnDef(field));
          }
        });
      } else {
        data.fields.forEach((field) => {
          if (
            field.id === 567110 ||
            field.id === 567111 ||
            field.id === 567113 ||
            field.id === 567114 ||
            field.id === 567115 ||
            field.id === 567116 ||
            field.id === 567117 ||
            field.id === 567118 ||
            field.id === 567119 ||
            field.id === 567120 ||
            field.id === 567121 ||
            field.id === 567122 ||
            field.id === 567123 ||
            field.id === 567123 ||
            field.id === 567123 ||
            field.id === 567123 ||
            field.id === 567123 ||
            field.id === 567124 ||
            field.id === 567125 ||
            field.id === 567126 ||
            field.id === 567127 ||
            field.id === 567128 ||
            field.id === 567143 ||
            field.id === 567144 ||
            field.id === 567145 ||
            field.id === 567146 ||
            field.id === 567148 ||
            field.id === 567150 ||
            field.id === 567156 ||
            field.id === 567164 ||
            field.id === 567171 ||
            field.id === 567172 ||
            field.id === 567173 ||
            field.id === 567174 ||
            field.id === 567175 ||
            field.id === 567176 ||
            field.id === 567177 ||
            field.id === 567179 ||
            field.id === 567180 ||
            field.id === 567194 ||
            field.id === 567196 ||
            field.id === 567197 ||
            field.id === 567198 ||
            field.id === 567199 ||
            field.id === 567200 ||
            field.id === 567201 ||
            field.id === 567202 ||
            field.id === 567203 ||
            field.id === 567204 ||
            field.id === 567205 ||
            field.id === 567206 ||
            field.id === 567207 ||
            field.id === 567208 ||
            field.id === 567211 ||
            field.id === 567212 ||
            field.id === 567213 ||
            field.id === 567230 ||
            field.id === 567231 ||
            field.id === 567232 ||
            field.id === 567233 ||
            field.id === 567252 ||
            field.id === 567253 ||
            field.id === 567105
          ) {
            return;
          }
          dataColumns.push(getColumnDef(field));
        });
      }

      let dataRows = data.results;
      data.fields.forEach((field) => {
        if (field.type === 'link_row') {
          const transformedData = dataRows.map((r) => {
            r[field.name] = {
              data: r[field.name],
              tableID: field.link_row_table
            };
            return r;
          });
          dataRows = transformedData;
        }
      });
      setColumns(dataColumns);
    }
  }, [data]);
  const webFlowColumns: GridColDef[] = [
    { field: 'logo', headerName: 'Logo', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'stage', headerName: 'Stage', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'founder', headerName: 'Founder', width: 150 },
    { field: 'website', headerName: 'Website', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'sub-category', headerName: 'Sub-Category', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 }
  ];
  return (
    <>
      {data?.results && (
        <Box sx={{ height: '64vh', minHeight: '64vh', maxHeight: '80vh' }}>
          <StyledDataGrid
            pagination={true}
            rowHeight={45}
            loading={isLoading}
            rows={data?.results || []}
            columns={columns}
            rowCount={data?.count || 0}
            initialState={{
              pinnedColumns: {
                left: ['Logo', 'Name'],
                right: []
              }
            }}
            components={{
              // Pagination: CustomPagination,
              LoadingOverlay: LinearProgress
            }}
            hideFooter={true}
            disableSelectionOnClick
            headerHeight={45}
            disableColumnMenu={true}
            paginationMode="server"
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              marginTop: '10px',
              paddingBottom: '10px'
            }}
          >
            <InfoBox sx={{ marginRight: '20px' }}>
              {data?.count} Records
            </InfoBox>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginRight: { xs: '0px', lg: '160px' }
              }}
            >
              <StyledPagination
                page={data?.page || 0}
                count={totalPages}
                onChange={(
                  event: React.ChangeEvent<unknown>,
                  value: number
                ) => {
                  onPageChange(value);
                }}
              />
            </Box>
          </Box>{' '}
        </Box>
      )}
      {data?.tableID === 93254 && (
        <Box sx={{ height: '64vh', minHeight: '64vh', maxHeight: '80vh' }}>
          <StyledDataGrid
            pagination={true}
            rowHeight={45}
            // loading={isLoading}
            rows={[]}
            columns={webFlowColumns}
            // rowCount={data?.count || 0}
            initialState={{
              pinnedColumns: {
                // left: ['Logo', 'Name'],
                right: []
              }
            }}
            components={{
              // Pagination: CustomPagination,
              LoadingOverlay: LinearProgress,
              NoRowsOverlay: () => (
                <Box
                  sx={{
                    height: '100% ',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Coming Soon...{' '}
                </Box>
              )
            }}
            hideFooter={true}
            disableSelectionOnClick
            headerHeight={45}
            disableColumnMenu={true}
            paginationMode="server"
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              marginTop: '10px',
              paddingBottom: '10px'
            }}
          >
            {/* <InfoBox sx={{ marginRight: '20px' }}>
              {data?.count} Records
            </InfoBox> */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginRight: { xs: '0px', lg: '160px' }
              }}
            >
              {/* <StyledPagination
                page={data?.page || 0}
                count={totalPages}
                onChange={(
                  event: React.ChangeEvent<unknown>,
                  value: number
                ) => {
                  onPageChange(value);
                }}
              /> */}
            </Box>
          </Box>{' '}
        </Box>
      )}
    </>
  );
};
