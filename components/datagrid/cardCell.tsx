import { Box, Paper, Popper, Typography } from '@mui/material';
// import { GridRenderCellParams } from '@mui/x-data-grid';
import { memo, useEffect, useState } from 'react';
import { InvestorDetailsModal } from '..';
import { BoxStyles } from '../../styles/box.styles';
import ModalComponent from '../ModalComponent';

interface GridCellExpandProps {
  values: any;
  width: number;
  field: string;
}
interface GridRenderCellParams {
  value: string[];
  colDef: {
    computedWidth: number;
  };
  field: string;
}

const GridCellExpand = memo(function GridCellExpand(
  props: GridCellExpandProps
) {
  const { width, values, field } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function openModal2() {
    setModalIsOpen2(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal2() {
    setModalIsOpen2(false);
  }
  function modalOpener() {
    if (field === 'Investors') {
      openModal();
    } else if (field === 'Founder') {
      openModal2();
    }
  }
  let backgroundColor = '';
  let containerWidth = '';
  if (field === 'Investors') {
    backgroundColor = '#2CE3E8';
    containerWidth = '100%';
  }
  if (field === 'Founder') {
    backgroundColor = ' #D448FF';
    containerWidth = '100%';
  }
  if (field === 'Category') {
    backgroundColor = ' #FF4772';
    containerWidth = '75%';
  }
  if (field === 'Sub-categories') {
    backgroundColor = ' #44E975';
    containerWidth = '69%';
  }

  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          lineHeight: '24px',
          height: '100%',
          width: containerWidth,
          display: 'flex',
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'block',
            position: 'absolute',
            top: '-23px',
            left: 0,
            mx: '-10px',
          }}
        />
        {values.data &&
          values.data.length &&
          values?.data?.map((dataValue: any, idx: number) => (
            <BoxStyles
              key={idx}
              sx={{
                background: backgroundColor,
                color: '#000000',
                maxWidth: '140px',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
            >
              <Typography
                noWrap
                sx={{
                  fontFamily: 'Space Mono',
                  fontSize: '13px',
                }}
                onClick={modalOpener}
              >
                {' '}
                {dataValue.value}
              </Typography>
            </BoxStyles>
          ))}
      </Box>

      <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <InvestorDetailsModal
        modalIsOpen={modalIsOpen2}
        closeModal={closeModal2}
      />
    </>
  );
});

export const renderCardCell = (params: GridRenderCellParams) => {
  return (
    <GridCellExpand
      values={params.value || []}
      width={params.colDef.computedWidth}
      field={params.field}
    />
  );
};
