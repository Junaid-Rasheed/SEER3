import {
  Box,
  CircularProgress,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import { memo, useRef, useState, useEffect } from 'react';
import { getSingleRecord } from '../../service/baserow.service';
import { useDetectClickOutside } from '../common/useDetectClickOutside';
import { CellPopper } from './cellPopup';
import { PopperItem } from './popperItem';
import { RecordModal } from './recordModal';

interface GridCellExpandProps {
  value: string;
  width: number;
  field: string;
  rowId: number;
  tableId: number;
}

const ExpandableTextCell = memo(function GridCellExpand(
  props: GridCellExpandProps
) {
  const { width, value, field, tableId, rowId } = props;
  const wrapper = useRef<HTMLDivElement | null>(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const popperRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);
  const [popperData, setPopperData] = useState<any>(null);
  const [recordData, setRecordData] = useState(null);
  const [recordID, setRecordID] = useState<number>();

  useDetectClickOutside(popperRef, () => setShowFullCell(false));

  const handleSingleSelection = async () => {
    setShowPopper(true);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);

    const data = await getSingleRecord(tableId, rowId);

    setPopperData(data);
  };
  const getPopperItems = () => {
    const items: JSX.Element[] = [];

    popperData?.data.forEach((v: any, i: number) => {
      items.push(
        <PopperItem
          data={v}
          fields={popperData.fields}
          fieldName={field}
          key={i}
          onClick={() => openModal(v)}
        ></PopperItem>
      );
    });
    return items;
  };

  const openModal = (data: any) => {
    setRecordData(data);
    setRecordID(data.id);
  };
  const closePopper = () => {
    setShowPopper(false);
  };

  return (
    <>
      <Box
        ref={wrapper}
        onClick={handleSingleSelection}
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
          <Typography
            noWrap
            sx={{
              fontFamily: 'Space Mono',
              fontSize: '13px',
              textAlign: 'start',
              color: field === 'Fundraising Round' ? '#56c416' : '#0E5FED',
            }}
          >
            {value}
          </Typography>
        </Box>
        {showPopper && (
          <CellPopper
            showFullCell={showFullCell}
            anchorEl={anchorEl}
            popperRef={popperRef}
            wrapper={wrapper}
            closeModal={closePopper}
          >
            {popperData ? getPopperItems() : <CircularProgress />}
          </CellPopper>
        )}
      </Box>
      <RecordModal
        recordData={recordData}
        recordID={recordID}
        recordTableFields={popperData?.fields}
        handleClose={() => {
          setRecordData(null);
          setRecordID(undefined);
        }}
        fieldName={field}
      />
    </>
  );
});

export const renderExpandableTextCell = (params: any) => {
  return (
    <ExpandableTextCell
      value={params.value || ''}
      width={params.colDef.computedWidth}
      tableId={params.colDef.tableId}
      rowId={params.id}
      field={params.field}
    />
  );
};
