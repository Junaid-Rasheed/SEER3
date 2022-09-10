import { styled } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';

export const StyledDataGrid = styled(DataGridPro)(({ theme }) => ({
  border: 0,
  // color: theme.palette.mode === "light" ? "#000" : "#E8E8EA",
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnHeaders': {
    background: '#000000',
    border:
      theme.palette.mode === 'light'
        ? '1px solid rgba(0,0,0,0.12)'
        : '1px solid rgba(112, 112, 112, 1)',
    color: '#ffffff',
    borderRadius: 0,
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  '& .MuiButtonBase-root-MuiIconButton-root': {
    color: '#ffffff',
  },
  '& .MuiDataGrid-sortIcon': {
    color: '#ffffff',
  },
  '& .MuiLinearProgress-root': {
    backgroundColor: '#656a55',
  },
  '& .MuiLinearProgress-bar1Indeterminate': {
    backgroundColor: '#8ABD00',
  },
  '& .MuiLinearProgress-bar2Indeterminate': {
    backgroundColor: '#8ABD00',
  },

  '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-columnSeparator--sideRight': {
    right: '-10px',
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    justifyContent: 'center',
  },
  '& .MuiDataGrid-row': {
    borderBottom:
      theme.palette.mode === 'light'
        ? '1px solid rgba(0,0,0,0.12)'
        : '1px solid rgba(112, 112, 112, 1)',
  },

  '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-pinnedColumnHeaders': {
    backgroundColor: '#000000',
    backgroundImage: 'none',
  },
  '& .MuiDataGrid-pinnedColumns': {
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#000000',
    color: theme.palette.mode === 'light' ? '#000000' : '#ffffff',
    backgroundImage: 'none',
  },

  '& .MuiDataGrid-cell': {
    borderBottom: 'none',
    justifyContent: 'flex-start',
    borderRight:
      theme.palette.mode === 'light'
        ? '1px solid rgba(0,0,0,0.12)'
        : '1px solid rgba(112, 112, 112, 1)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  '& .MuiDataGrid-footerContainer': {
    justifyContent: 'center',
  },
}));
