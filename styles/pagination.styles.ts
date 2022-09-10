import { Pagination, styled } from '@mui/material';

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiButtonBase-root': {
    border:
      theme.palette.mode === 'light'
        ? '1px solid #707070'
        : '1px solid #707070',
    borderRadius: '0',
    background: 'transparent',
  },
  '& .Mui-selected': {
    border: '1px solid #B1EF07',
    color: '#B1EF07',
  },
}));
