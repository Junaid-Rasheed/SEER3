import { Box, CircularProgress, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getRowsFromTable, IField } from '../../service/baserow.service';
import { StyledModal } from '../../styles/modal.styled';
import { PopperItem } from './popperItem';

interface IProps {
  recordID?: number;
  recordData?: any;
  recordTableFields?: IField[];
  handleClose: () => void;
  fieldName: string;
}

export const RecordModal = ({
  recordID,
  recordData,
  recordTableFields,
  handleClose,
  fieldName
}: IProps) => {
  const [data, setData] = useState(recordData);
  const [linkedData, setLinkedData] = useState<any[]>([]);
  const [fields, setfields] = useState(recordTableFields);

  const [nextRecordData, setNextRecordData] = useState(null);
  const [nextRecordID, setNextRecordID] = useState<number>();
  const [nextFields, setNextFields] = useState<IField[]>();

  useEffect(() => {
    setData(recordData);
    setfields(recordTableFields);

    if (data && fields) {
      getLinkedData();
    }
  }, [recordData, recordTableFields]);

  const getLinkedData = async () => {
    if (fields && data) {
      let linkedRecords: Array<{
        tableID: number;
        rowIDs: number[];
      }> = [];

      fields.forEach((f) => {
        if (f.type === 'link_row') {
          linkedRecords.push({
            tableID: f.link_row_table,
            rowIDs: data[f.name].map((d: any) => d.id)
          });
        }
      });

      linkedRecords.forEach(async (lr) => {
        const result = await getRowsFromTable(lr.tableID, lr.rowIDs);
        setLinkedData((prevData) => [...prevData, { ...result }]);
      });
    }
  };

  const getPrimaryFieldValue = () => {
    const field = fields?.find((f) => f.primary === true);

    if (field && data) {
      return data[field.name];
    }
  };

  const openModal = (
    data: any,
    fields?: IField[],
    recordFieldName?: string
  ) => {
    if (
      recordFieldName === 'Category' ||
      recordFieldName === 'Sub-categories' ||
      recordFieldName === 'Stages'
    )
      return;
    setNextRecordData(data);
    setNextRecordID(data.id);
    setNextFields(fields);
  };

  const getElementForField = (f: IField) => {
    if (data) {
      let background: string;
      if (f.name === 'Type') {
        background = '#2CE3E8';
      } else if (f.name === 'Actively Investing') {
        background = '#05ee4b';
      } else if (f.name === 'Ecosystem') {
        background = '#FF4772';
      } else if (f.name === 'Founder') {
        background = '#D448FF';
      } else if (f.name === 'Location') {
        background = '#44E975';
      } else if (f.name === 'Portfolio Companies') {
        background = '#FF4772';
      } else if (f.name === 'Fundraising Rounds') {
        background = '#3557c7';
      } else {
        background = 'transparent';
      }
      switch (f.type) {
        case 'link_row': {
          if (
            f.name === 'Ecosystem' ||
            f.name === 'Founder' ||
            f.name === 'Location' ||
            (f.name === 'Portfolio Companies' && data[f.name].length > 20) ||
            (f.name === 'Fundraising Rounds' && data[f.name].length > 20)
          ) {
            return (
              <Box
                sx={{
                  flex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  pl: '12px',
                  border: '1px solid rgba(0,0,0,0.12)'
                }}
              >
                {' '}
                {data[f.name].map((dataValue: any, idx: number) => (
                  <Typography
                    key={idx}
                    sx={{
                      minHeight: '40px',
                      paddingTop: '8px',
                      fontFamily: 'Space Mono',
                      marginBottom: '1rem'
                    }}
                  >
                    <span
                      key={idx}
                      style={{
                        background: background,
                        padding: '4px 10px',
                        marginRight: '10px'
                      }}
                    >
                      {dataValue.value}
                    </span>
                  </Typography>
                ))}
              </Box>
            );
          }
          const items: JSX.Element[] = [];
          if (linkedData) {
            const result = linkedData.find((ld) =>
              ld.fields.find((ldf: IField) => {
                return f.link_row_related_field === ldf.id;
              })
            );

            if (result) {
              if (result.data.length > 45) {
                return (
                  <Box sx={{ color: 'red' }}>
                    Too many Records.Check info in the relevant table.
                  </Box>
                );
              }
              result.data.forEach((r: any, i: number) => {
                items.push(
                  <Box
                    sx={{
                      flex: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '4px 0'
                    }}
                  >
                    <PopperItem
                      data={r}
                      fields={result.fields}
                      fieldName={fieldName}
                      onClick={() => openModal(r, result.fields, f.name)}
                      key={i}
                    />
                  </Box>
                );
              });
            }
          }
          return items;
        }
        case 'file': {
          return (
            <div
              style={{
                alignItems: 'center',
                lineHeight: '24px',
                display: 'flex'
              }}
            >
              {data[f.name][0] && (
                <Image
                  src={data[f.name][0].url}
                  width="200px"
                  height="200px"
                  style={{
                    position: 'relative',
                    zIndex: 1
                  }}
                  alt="logo"
                />
              )}
            </div>
          );
        }
        default:
          return (
            <Box
              sx={{
                flex: 3,
                display: 'flex',
                flexDirection: 'column',
                pl: '12px',
                border: '1px solid rgba(0,0,0,0.12)'
              }}
            >
              {' '}
              <Typography
                sx={{
                  minHeight: '40px',
                  paddingTop: '8px',
                  fontFamily: 'Space Mono'
                }}
              >
                {typeof data[f.name] === 'object'
                  ? (
                      <span
                        style={{
                          background: background,
                          padding: '4px 10px',
                          marginRight: '10px'
                        }}
                      >
                        {f.name === 'Funding  Lookup' &&
                        data[f.name]?.value !== 'None'
                          ? `$${Number(data[f.name]?.value).toLocaleString(
                              'en-US'
                            )}`
                          : data[f.name]?.value !== 'None'
                          ? data[f.name]?.value
                          : ''}
                      </span>
                    ) || ''
                  : f.name === 'Created time'
                  ? moment(data[f.name]).format('MMMM Do YYYY, HH:mm') || ''
                  : f.name === 'Funding Received' || f.name === 'Amount'
                  ? `$${Number(data[f.name]).toLocaleString('en-US')}`
                  : data[f.name]}
              </Typography>
            </Box>
          );
      }
    }
  };

  const getLogo = () => {
    const elements: JSX.Element[] = [];

    fields
      ?.filter((f) => f.primary === false)
      .forEach((f, i) => {
        elements.push(
          <>
            {[567149, 567214].includes(f.id) && (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: 1
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    margin: '15px 0',
                    color: '#000000',
                    fontFamily: 'Space Mono',
                    textTransform: 'uppercase'
                  }}
                >
                  {f.name}
                </Typography>

                {getElementForField(f)}
              </Box>
            )}
          </>
        );
      });

    return elements;
  };
  const getFundRaisingRounds = () => {
    const elements: JSX.Element[] = [];

    fields
      ?.filter((f) => f.primary === false)
      .forEach((f, i) => {
        elements.push(
          <>
            {[567193].includes(f.id) && (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: 1
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    margin: '15px 0',
                    color: '#000000',
                    fontFamily: 'Space Mono',
                    textTransform: 'uppercase'
                  }}
                >
                  {f.name}
                </Typography>

                {getElementForField(f)}
              </Box>
            )}
          </>
        );
      });

    return elements;
  };

  const getFields = () => {
    const elements: JSX.Element[] = [];

    fields
      ?.filter((f) => f.primary === false)
      .forEach((f, i) => {
        elements.push(
          <>
            {![
              567194, 567197, 567196, 567211, 567198, 567199, 567200, 567201,
              567209, 567202, 567203, 567204, 567205, 567206, 567207, 567208,
              567212, 567213, 567110, 567111, 567113, 567114, 567135, 567115,
              567116, 567117, 567118, 567128, 567133, 567119, 567120, 567121,
              567122, 567123, 567124, 567125, 567126, 567127, 567162, 567163,
              567164, 567171, 567172, 567173, 567174, 567175, 567176, 567177,
              567179, 567180, 567273, 567258, 567259, 567260, 567261, 567262,
              567270, 567271, 567272, 567230, 567231, 567232, 567233, 567143,
              567144, 567145, 567146, 567227, 567252, 567253, 567149, 567193,
              567214
            ].includes(f.id) && (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: 1
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    margin: '15px 0',
                    color: '#000000',
                    fontFamily: 'Space Mono',
                    textTransform: 'uppercase'
                  }}
                >
                  {f.name}
                </Typography>

                {getElementForField(f)}
              </Box>
            )}
          </>
        );
      });

    return elements;
  };

  return (
    <>
      <StyledModal
        open={!!recordID}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => handleClose()}
        sx={{
          inset: '106px 12px 12px'
        }}
      >
        <Box
          sx={{
            m: '0px auto',
            maxWidth: '800px',
            height: '100%'
          }}
        >
          <Box
            sx={{
              height: '100%',
              bgcolor: 'background.paper',
              p: '32px 40px 40px',
              overflow: 'auto',
              color: '#000000',
              borderRadius: '5px'
            }}
          >
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: '35px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              {getPrimaryFieldValue()}
            </Typography>
            {getLogo()}
            {getFundRaisingRounds()}
            {getFields()}
          </Box>
        </Box>
      </StyledModal>
      {nextRecordData && nextRecordID && nextFields && (
        <RecordModal
          recordData={nextRecordData}
          recordID={nextRecordID}
          recordTableFields={nextFields}
          fieldName={fieldName}
          handleClose={() => {
            setNextRecordData(null);
            setNextRecordID(undefined);
            setNextFields(undefined);
          }}
        />
      )}
    </>
  );
};
