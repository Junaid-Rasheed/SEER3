import { Box, Chip, CircularProgress, Modal, Typography } from '@mui/material';
import { memo, useRef, useState } from 'react';
import { useDetectClickOutside } from '../common/useDetectClickOutside';
import {
  getRowsFromTable,
  getSingleRecord,
  IField
} from '../../service/baserow.service';
import { CellPopper } from './cellPopup';
import { PopperItem } from './popperItem';
import { RecordModal } from './recordModal';
import { BoxStyles } from '../../styles/box.styles';

type CellValue = {
  data: Array<{ id: number; value: string }>;
  tableID: number;
};

interface GridCellExpandProps {
  params?: CellValue;
  width: number;
  field: string;
  fieldId: number;
}

const ExpandableChipsCell = memo(function GridCellExpand(
  props: GridCellExpandProps
) {
  const { params, field, fieldId } = props;
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
  const [page, setPage] = useState<number | null>(null);

  const handleOutsideClick = () => {
    if (!recordID) {
      setPage(null);
      setShowFullCell(false);
    }
  };

  useDetectClickOutside(popperRef, handleOutsideClick);

  const handleMouseClick = async () => {
    if (
      // (params && params?.data?.length > 20) ||
      field === 'Location' ||
      // field === 'Ecosystem' ||
      fieldId === 567154 ||
      fieldId === 567155
    )
      return;
    setShowPopper(true);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);

    if (params && params?.data && params?.data?.length > 20) {
      let dataIds = [];
      if (!page) {
        setPage(1);
        for (let i = 0; i < 20; i++) {
          dataIds.push(params.data[i].id);
        }
        const data = await getRowsFromTable(params.tableID, dataIds);
        setPopperData(data);
      }
    } else {
      const data = await getRowsFromTable(
        params!.tableID,
        params?.data?.map((d) => d.id)
      );

      setPopperData(data);
    }
  };

  const handleNext = async (page: number) => {
    setPopperData(null);
    let dataIds = [];
    const limit = page * 20;
    if (!(limit >= params!?.data.length)) {
      for (let i = limit - 20; i < limit; i++) {
        dataIds.push(params!.data[i].id);
      }
    } else {
      const lastpageLimit = params!?.data.length;
      for (let i = limit - 20; i < lastpageLimit; i++) {
        dataIds.push(params!.data[i].id);
      }
    }
    const data = await getRowsFromTable(params!.tableID, dataIds);

    setPopperData(data);
  };
  const handlePrevious = async (page: number) => {
    setPopperData(null);
    let dataIds = [];
    const limit = page * 20;

    for (let i = limit - 20; i < limit; i++) {
      dataIds.push(params!.data[i].id);
    }

    const data = await getRowsFromTable(params!.tableID, dataIds);

    setPopperData(data);
  };

  const getChips = () => {
    const chips: JSX.Element[] = [];
    let backgroundColor = '';
    let containerWidth = '';
    if (field === 'Investors' || field === 'Acquired Company') {
      backgroundColor = '#2CE3E8';
      containerWidth = '100%';
    }
    if (field === 'Founder' || field === 'Crypto Companies') {
      backgroundColor = ' #D448FF';
      containerWidth = '100%';
    }
    if (
      field === 'Stages' ||
      field === 'Founder_name' ||
      field === 'Crypto Companies 2' ||
      field === 'Fundraising Rounds - Funds 2'
    ) {
      backgroundColor = ' #f5e941';
      containerWidth = '100%';
    }
    if (field === 'Fundraising Rounds - Companies') {
      backgroundColor = ' #ec3b3b';
      containerWidth = '100%';
    }
    if (field === 'Fundraising Rounds') {
      backgroundColor = ' #ff06c9';
      containerWidth = '100%';
    }
    if (
      field === 'Category' ||
      field === 'Firm' ||
      field === 'Ecosystem' ||
      field === 'Portfolio Companies' ||
      field === 'Fundraising Rounds - Funds'
    ) {
      backgroundColor = ' #FF4772';
      containerWidth = '75%';
    }
    if (
      field === 'Sub-categories' ||
      field === 'Partners' ||
      field === 'Acquiring Company' ||
      field === 'Location' ||
      field === 'Funds' ||
      field === 'Angel Investors'
    ) {
      backgroundColor = ' #44E975';
      containerWidth = '69%';
    }
    if (field === 'LPs') {
      backgroundColor = '#98ff98';
      containerWidth = '69%';
    }
    params?.data &&
      params?.data?.length &&
      params?.data?.forEach((v, i) => {
        chips.push(
          field === 'Investors' ||
            field === 'Founder' ||
            field === 'Category' ||
            field === 'Sub-categories' ||
            field === 'Partners' ||
            field === 'Firm' ||
            field === 'Acquired Company' ||
            field === 'Acquiring Company' ||
            field === 'Location' ||
            field === 'Ecosystem' ||
            field === 'Portfolio Companies' ||
            field === 'Crypto Companies' ||
            field === 'Funds' ||
            field === 'Stages' ||
            field === 'LPs' ||
            field === 'Fundraising Rounds' ||
            field === 'Founder_name' ||
            field === 'Fundraising Rounds - Companies' ||
            field === 'Fundraising Rounds - Funds' ||
            field === 'Crypto Companies 2' ||
            field === 'Angel Investors' ||
            field === 'Fundraising Rounds - Funds 2' ? (
            <BoxStyles
              key={i}
              sx={{
                background: backgroundColor,
                color: '#000000',
                padding: '3px 10px 2px 10px',
                zIndex: '111'
              }}
              // onClick={() => handleSingleSelection(v)}
            >
              <Typography
                noWrap
                sx={{
                  fontFamily: 'Space Mono',
                  fontSize: '13px'
                }}
              >
                {' '}
                {v.value}
              </Typography>
            </BoxStyles>
          ) : fieldId === 567133 ? (
            <Typography
              noWrap
              sx={{
                fontFamily: 'Space Mono',
                fontSize: '13px',
                textAlign: 'start',
                color: '#0E5FED'
              }}
            >
              {v.value}
            </Typography>
          ) : (
            <Chip
              label={v.value}
              sx={{ height: '28px' }}
              color="primary"
              variant="outlined"
              key={i}
              // onClick={() => handleSingleSelection(v)}
            />
          )
        );
      });

    return chips;
  };

  const getPopperItems = () => {
    const items: JSX.Element[] = [];

    popperData?.data.forEach((v: any, i: number) => {
      items.push(
        <PopperItem
          data={v}
          fieldName={field}
          fields={popperData.fields}
          key={i}
          onClick={() => openModal(v)}
        ></PopperItem>
      );
    });
    return items;
  };

  const openModal = (data: any) => {
    if (
      field === 'Category' ||
      field === 'Sub-categories' ||
      field === 'Stages' ||
      field === 'Ecosystem'
    )
      return;
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
        onClick={handleMouseClick}
        sx={{
          alignItems: 'center',
          lineHeight: '24px',
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex'
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: '100%',
            width: '400px',
            display: 'block',
            position: 'absolute',
            top: 0,
            mx: '-10px'
          }}
        />
        <Box
          ref={cellValue}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '10px' }}>
            {getChips()}
          </Box>
        </Box>
        {showPopper && (
          <CellPopper
            showFullCell={showFullCell}
            anchorEl={anchorEl}
            popperRef={popperRef}
            wrapper={wrapper}
            closeModal={closePopper}
          >
            {popperData ? (
              <>
                {getPopperItems()}
                {params!?.data?.length > 20 && (
                  <button
                    style={{
                      background: 'transparent',
                      color: 'black',
                      border: '1px solid',
                      padding: '4px 0',
                      opacity: page! === 1 ? '0.5' : '1'
                    }}
                    onClick={() => {
                      setPage(page! - 1);
                      handlePrevious(page! - 1);
                    }}
                    disabled={page! === 1}
                  >
                    Previous
                  </button>
                )}
                {params!?.data?.length > 20 && (
                  <button
                    style={{
                      background: 'transparent',
                      color: 'black',
                      border: '1px solid',
                      padding: '4px 0',
                      opacity: page! * 20 >= params!?.data?.length ? '0.5' : '1'
                    }}
                    onClick={() => {
                      setPage(page! + 1);
                      handleNext(page! + 1);
                    }}
                    disabled={page! * 20 >= params!?.data?.length}
                  >
                    Next
                  </button>
                )}
              </>
            ) : (
              <CircularProgress />
            )}
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

export const renderExpandableChips = (params: any) => {
  return (
    <ExpandableChipsCell
      params={params.value || undefined}
      width={params.colDef.computedWidth}
      field={params.field}
      fieldId={params.colDef.id}
    />
  );
};
