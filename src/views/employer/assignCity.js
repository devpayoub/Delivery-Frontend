import React, { useState } from 'react';
import { Box, useDisclosure, FormControl, FormLabel, Select, VStack, useToast } from '@chakra-ui/react';
import { useAppData } from 'contexts/AppDataContext';
import CrudTable from 'components/crud/CrudTable';
import CrudModal from 'components/crud/CrudModal';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export default function EmployerAssignCity() {
  const { state, updateEntity, driverApi } = useAppData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ city_id: '' });

  const columns = [
    columnHelper.accessor('name', { header: 'DRIVER NAME' }),
    columnHelper.accessor('phone', { header: 'PHONE' }),
    columnHelper.accessor('city_id', { 
      header: 'ASSIGNED CITY',
      cell: info => state.cities.find(c => c.id === info.getValue())?.name || 'Not Assigned'
    }),
  ];

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ city_id: item.city_id || '' });
    onOpen();
  };

  const handleSave = async () => {
    if (editingId) {
      try {
        await updateEntity(driverApi, editingId, formData);
        toast({ title: 'City assigned', status: 'success', duration: 2000 });
      } catch (err) {
        toast({ title: 'Error', description: err.message, status: 'error', duration: 3000 });
      }
    }
    onClose();
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <CrudTable
        title="Assign Drivers to Cities"
        data={state.drivers}
        columns={columns}
        onEdit={handleEdit}
      />

      <CrudModal
        isOpen={isOpen}
        onClose={onClose}
        title="Assign Driver to City"
        onSave={handleSave}
      >
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Select City</FormLabel>
            <Select variant="auth" placeholder="Not Assigned" value={formData.city_id} onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}>
              {state.cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </Select>
          </FormControl>
        </VStack>
      </CrudModal>
    </Box>
  );
}
