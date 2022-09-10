import { Box, Paper, Popper, Typography } from '@mui/material';
import moment from 'moment';
import { memo, useRef, useState, useEffect } from 'react';
import { useDetectClickOutside } from '../common/useDetectClickOutside';

interface GridCellExpandProps {
  value: string;
  width: number;
  field: string;
}

const isOverflown = (element: Element): boolean => {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
};

const GridCellExpand = memo(function GridCellExpand(
  props: GridCellExpandProps
) {
  const { width, value, field } = props;
  const wrapper = useRef<HTMLDivElement | null>(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const popperRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);

  useDetectClickOutside(popperRef, () => setShowFullCell(false));

  const handleMouseClick = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current!);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  return (
    <Box
      ref={wrapper}
      onClick={handleMouseClick}
      sx={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        lineHeight: '24px',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,

          display: 'block',
          position: 'absolute',
          top: '-23px',
          left: 0,
          mx: '-10px',
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          maxWidth: width,
        }}
      >
        {field === 'Website' ||
        field === 'Announcement' ||
        field === 'Twitter' ||
        field === 'LinkedIn' ||
        field === 'Discord/Telegram' ? (
          <Typography
            noWrap
            sx={{
              fontFamily: 'Space Mono',
              fontSize: '13px',
              textDecoration: 'underline',
              color: ' #0000EE',
              textAlign: 'start',
            }}
          >
            <a href={value} target='_blank' rel='noopener noreferrer'>
              {value}
            </a>
          </Typography>
        ) : (
          <Typography
            noWrap
            sx={{
              fontFamily: 'Space Mono',
              fontSize: '13px',
              textAlign: 'start',
            }}
          >
            {value}
          </Typography>
        )}
      </Box>
      {showPopper && (
        <Popper
          ref={popperRef}
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{
            maxWidth: '300px',
            textAlign: 'center',
            border: '1px solid white ',
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
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current!.offsetHeight }}
          >
            <Typography
              sx={{
                fontFamily: 'Space Mono',
                fontSize: '13px',
                textAlign: 'start',
              }}
            >
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

export const renderCellExpand = (params: any) => {
  return (
    <GridCellExpand
      value={params.value || ''}
      width={params.colDef.computedWidth}
      field={params.field}
    />
  );
};
