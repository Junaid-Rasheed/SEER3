import { AXIOS } from '../config/axios';

export interface IField {
  id: number;
  name: string;
  order: number;
  table_id: number;
  type: string;
  link_row_table: number;
  link_row_related_field: number;
  primary: boolean;
}

export interface ITableData {
  count: number;
  next: string;
  previous: string;
  results: any[];
}

export const getTableFields = (tableID: number) => {
  return AXIOS.get<IField[]>(`/api/database/fields/table/${tableID}/`);
};

export const getTableData = (
  tableID: number,
  page?: number,
  size?: number,
  search?: string
) => {
  if (search) {
    if (tableID === 92017 || tableID === 92018 || tableID === 92019) {
      return AXIOS.get<ITableData>(`/api/database/rows/table/${tableID}/`, {
        params: {
          user_field_names: true,
          size,
          search,
          page,
          order_by: '-Date',
        },
      });
    } else {
      return AXIOS.get<ITableData>(`/api/database/rows/table/${tableID}/`, {
        params: {
          user_field_names: true,
          size,
          page,
          search,
        },
      });
    }
  } else {
    if (tableID === 92017 || tableID === 92018 || tableID === 92019) {
      return AXIOS.get<ITableData>(`/api/database/rows/table/${tableID}/`, {
        params: {
          user_field_names: true,
          page,
          size,
          search: search ? search : undefined,
          order_by: '-Date',
        },
      });
    } else {
      return AXIOS.get<ITableData>(`/api/database/rows/table/${tableID}/`, {
        params: {
          user_field_names: true,
          page,
          size,
          search: search ? search : undefined,
        },
      });
    }
  }
};

export const getTable = (tableID: number) => {
  return Promise.all([
    getTableFields(tableID),
    getTableData(tableID, 1, 100),
  ]).then((values) => {
    return {
      fields: values[0],
      ...values[1],
    };
  });
};

export const getSingleRecord = async (tableID: number, r: number) => {
  let fields;
  getTableFields(tableID).then((fieldData) => {
    fields = fieldData;
  });

  const data = await AXIOS.get<any>(
    `/api/database/rows/table/${tableID}/${r}/?user_field_names=true`
  );
  return {
    data: [data],
    fields,
  };
};

export const getRowsFromTable = (tableID: number, rows: any) => {
  const requests: any[] = [getTableFields(tableID)];
  rows.forEach((r: any) => {
    requests.push(
      AXIOS.get<any>(
        `/api/database/rows/table/${tableID}/${r}/?user_field_names=true`
      )
    );
  });

  return Promise.all(requests).then((values) => {
    const [fields, ...rest] = values;

    return {
      fields,
      data: rest,
    };
  });
};
