import { Box, Typography } from '@mui/material';
import { IField } from '../../service/baserow.service';
import { BoxStyles } from '../../styles/box.styles';

interface IProps {
  data: any;
  fields: IField[];
  onClick: () => void;
  fieldName: string;
}

export const PopperItem = ({ data, fieldName, fields, onClick }: IProps) => {
  const getPrimaryField = () => {
    return fields?.find((f) => f.primary === true);
  };

  const getPrimaryFieldText = () => {
    const field = getPrimaryField();

    if (field) {
      return <Typography>{data[field.name]}</Typography>;
    }

    return <></>;
  };

  const getSecondaryFields = () => {
    const secondaryFields = fields
      ?.filter((f) => f.primary === false && f.type !== 'file')
      .slice(0, 2);

    let fieldElements: JSX.Element[] = [];

    const getDataLabel = (field: IField) => {
      switch (field.type) {
        case 'link_row': {
          if (
            data[field.name] &&
            data[field.name].length &&
            data[field.name][0]
          ) {
            return data[field.name][0].value;
          } else return ' ';
        }
        case 'single_select': {
          return data[field.name]?.value;
        }
        default: {
          if (field.type === 'number' && field.name !== 'Number of Rounds') {
            return `$${Number(data[field.name]).toLocaleString('en-US')}`;
          }
          return data[field.name] || 'NONE';
        }
      }
    };

    secondaryFields?.forEach((sf, i) => {
      (fieldName === 'Category' ||
        fieldName === 'Sub-categories' ||
        fieldName === 'Stages' ||
        fieldName === 'Name' ||
        fieldName === 'Investors' ||
        fieldName === 'Angel Investors' ||
        fieldName === 'Ecosystem' ||
        fieldName === 'Funds' ||
        fieldName === 'Founder' ||
        fieldName === 'Fundraising Rounds - Companies') &&
      (sf.name === 'Total Amount Raised' ||
        sf.name === 'Fundraising Rounds - Companies' ||
        sf.name === 'Record ID' ||
        sf.name === 'Twitter')
        ? ''
        : fieldElements.push(
            <Box
              key={i}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                textAlign: 'start',
                color: '#ffffff',
              }}
            >
              <Typography
                noWrap
                sx={{ marginRight: '10px' }}
                variant='subtitle2'
              >
                {sf.name === 'Crypto Companies' ? 'Web3 Companies' : sf.name}
              </Typography>
              <BoxStyles
                sx={{
                  background: i === 0 ? '#2CE3E8' : '#44E975',
                  color: '#000000',
                  width: '110px',
                  maxWidth: '140px',
                  height: '34px',
                  padding: '10px 5px',
                  textAlign: 'center',
                }}
              >
                <Typography
                  noWrap
                  sx={{
                    fontFamily: 'Space Mono',
                    fontSize: '10px',
                  }}
                >
                  {getDataLabel(sf)}
                </Typography>
              </BoxStyles>
            </Box>
          );
    });

    return fieldElements;
  };

  return (
    <Box
      sx={{
        background: '#000000',
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        minHeight: '100px',

        cursor: 'pointer',
        borderRadius: '6px',
      }}
      onClick={() => onClick()}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            p: 1,
            color: '#ffffff',
          }}
        >
          {getPrimaryFieldText()}
        </Box>
        <Box
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {getSecondaryFields()}
        </Box>
      </Box>{' '}
      <Box
        sx={{
          width: '130px',
          height: '112px',
          paddingLeft: '1px',
          borderTopRightRadius: '5px',
          borderBottomRightRadius: '5px',
        }}
      >
        {fieldName === 'Angel Investors' ? (
          ''
        ) : data.Logo &&
          data.Logo.length &&
          typeof data?.Logo[0]?.url === 'string' ? (
          <img
            src={data?.Logo[0]?.url}
            alt='company Logo'
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              position: 'relative',
              borderTopRightRadius: '5px',
              borderBottomRightRadius: '5px',
              zIndex: 1,
            }}
          />
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};
