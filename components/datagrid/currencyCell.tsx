import { Box } from '@mui/material';
import { memo } from 'react';

interface IProps {
  value: any;
}

const CurrencyCell = memo(function GridCellExpand(props: IProps) {
  const { value } = props;

  return (
    <Box
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        pr: '15px',
      }}
    >
      <Box
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {typeof value === 'string' && value && value !== '0'
          ? `$${Number(value).toLocaleString('en-US')}`
          : ''}
        {typeof value === 'object' && value.value === 'None'
          ? value.value
          : value.value
          ? `$${Number(value.value).toLocaleString('en-US')}`
          : ''}
      </Box>
    </Box>
  );
});

export const renderCurrency = (params: any) => {
  return <CurrencyCell value={params.value || ''} />;
};
