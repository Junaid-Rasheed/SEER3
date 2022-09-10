import { Button, ButtonBase, styled } from '@mui/material';

export const OutlinedButton = styled(Button)(() => ({
  borderColor: '#FFF',
  color: '#FFF',
  fontFamily: ['"Space Mono"', 'sans-serif'].join(','),
  borderRadius: 0,
  '&:hover': {
    borderColor: '#FFF',
  },
  '& > *': {
    fontFamily: ['"Space Mono"', 'sans-serif'].join(','),
  },
}));

export const SolidButton = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: '#B1EF07',
  fontWeight: 'Bold',
  color: '#000',
  fontSize: theme.typography.h6.fontSize,
  padding: '16px 0',
  textTransform: 'uppercase',
}));
