import React from 'react';
import { Box } from '@chakra-ui/react';
import { useAppData } from 'contexts/AppDataContext';
import CrudTable from 'components/crud/CrudTable';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export default function Logs() {
  const { state } = useAppData();

  const columns = [
    columnHelper.accessor('timestamp', { 
      header: 'DATE / TIME',
      cell: info => new Date(info.getValue()).toLocaleString()
    }),
    columnHelper.accessor('role', { header: 'ROLE' }),
    columnHelper.accessor('action', { header: 'ACTION' }),
    columnHelper.accessor('details', { header: 'DETAILS' }),
  ];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <CrudTable
        title="System Logs"
        data={state.logs}
        columns={columns}
      />
    </Box>
  );
}
