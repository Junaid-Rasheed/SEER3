import { Box, styled } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { memo, useRef, useState } from 'react';
import LogoComponent from '../LogoComponent';

interface IProps {
  value?: string;
}

const LogoCell = memo(function GridCellExpand(props: IProps) {
  const { value } = props;

  return (
    <Box
      sx={{
        alignItems: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      {typeof value === 'string' && <LogoComponent src={value} />}
    </Box>
  );
});

export const renderLogo = (params: GridRenderCellParams) => {
  return (
    <LogoCell
      value={params.value && params.value.length && params.value[0]?.url}
    />
  );
};
