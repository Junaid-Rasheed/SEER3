import { styled } from '@mui/material';

export const HorizontalLine = styled('div')(({ theme }) => ({
  borderBottom: theme.palette.mode === 'light' ? 'none' : '1px solid #4B4B4B',
  width: '100%',
}));
