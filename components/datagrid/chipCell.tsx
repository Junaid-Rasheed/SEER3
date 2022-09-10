import { Box, Chip, Paper, Popper, Stack, Typography } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { memo, useRef, useState, useEffect } from 'react';

type CellValue = { id: number; value: string };

interface GridCellExpandProps {
  value?: CellValue;
}

const ChipsCell = memo(function GridCellExpand(props: GridCellExpandProps) {
  const { value } = props;

  return (
    <Box
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      {value?.value}
    </Box>
  );
});

export const renderChip = (params: GridRenderCellParams<CellValue>) => {
  return <ChipsCell value={params.value || undefined} />;
};
