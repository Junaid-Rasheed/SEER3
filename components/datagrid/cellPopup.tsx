import { Box, Hidden, Paper, Popper } from '@mui/material';
import Image from 'next/image';
import { FC, FunctionComponent, ReactNode, Ref } from 'react';

import close from '../../public/close.png';

interface IProps {
  popperRef: React.MutableRefObject<HTMLDivElement | null>;
  showFullCell: boolean;
  anchorEl: HTMLElement | null;
  wrapper: React.MutableRefObject<HTMLDivElement | null>;
  children: ReactNode;
  closeModal: () => void;
}

export const CellPopper: FC<IProps> = ({
  popperRef,
  showFullCell,
  anchorEl,
  wrapper,
  children,
}) => {
  return (
    <Popper
      ref={popperRef}
      open={showFullCell && anchorEl !== null}
      anchorEl={anchorEl}
      sx={{
        maxHeight: '500px',
        textAlign: 'center',
        minHeight: '52px',
        borderRadius: '5px',
        overflow: 'auto',
        position: 'relative',
        zIndex: '1',
      }}
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, -53],
          },
        },
      ]}
    >
      {' '}
      <Paper elevation={1} style={{ minHeight: wrapper.current!.offsetHeight }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '20px',
            background: '#ffffff',
            color: '#ffffff',
            borderRadius: '5px',
          }}
        >
          <>{children}</>
        </Box>
      </Paper>
    </Popper>
  );
};
