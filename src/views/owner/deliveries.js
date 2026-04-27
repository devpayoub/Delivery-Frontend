import React from 'react';
import { Box } from '@chakra-ui/react';
import { useAppData } from 'contexts/AppDataContext';
import CrudTable from 'components/crud/CrudTable';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export default function Deliveries() {
  const { state } = useAppData();

  const columns = [
    columnHelper.accessor('client_name', { header: 'CLIENT' }),
    columnHelper.accessor('phone', { header: 'PHONE' }),
    columnHelper.accessor('address', { header: 'ADDRESS' }),
    columnHelper.accessor('status', { header: 'STATUS' }),
    columnHelper.accessor('city_id', { 
      header: 'CITY',
      cell: info => info.row.original.cities?.name || state.cities.find(c => c.id === info.getValue())?.name || 'N/A'
    }),
    columnHelper.accessor('employer_id', { 
      header: 'EMPLOYER',
      cell: info => info.row.original.employers?.name || state.employers.find(e => e.id === info.getValue())?.name || 'N/A'
    }),
    columnHelper.accessor('assigned_driver_id', { 
      header: 'DRIVER',
      cell: info => info.row.original.drivers?.name || state.drivers.find(d => d.id === info.getValue())?.name || 'Unassigned'
    }),
  ];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <CrudTable
        title="All Deliveries"
        data={state.deliveries}
        columns={columns}
      />
    </Box>
  );
}