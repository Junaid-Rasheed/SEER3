import { styled } from '@mui/material';

export const Background = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
  height: '100%',
  width: '100%',
}));
