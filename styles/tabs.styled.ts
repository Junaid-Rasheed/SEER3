import { styled, Tab, Tabs } from '@mui/material';

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontFamily: 'Space Mono',
  fontWeight: '700',
  color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
  '&.MuiTab-root.Mui-selected': {
    // backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#4D77FF",
    color: '#8ABD00',
  },
  '&.MuiTabs-indicator': {
    backgroundColor: '#8ABD00',
  },
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#8ABD00',
  },
}));
