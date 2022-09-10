import { styled, TableCell, TableRow } from '@mui/material';

export const StyledRow = styled(TableRow)(({ theme }) => ({
  border:
    theme.palette.mode === 'light'
      ? '1px solid rgba(0,0,0,0.12)'
      : '1px solid rgba(112, 112, 112, 1)',
  color: '#000',
}));

export const StyledCell = styled(TableCell)(({ theme }) => ({
  borderRight:
    theme.palette.mode === 'light'
      ? '1px solid rgba(0,0,0,0.12)'
      : '1px solid rgba(112, 112, 112, 1)',
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
  fontFamily: 'Space Mono',
}));
