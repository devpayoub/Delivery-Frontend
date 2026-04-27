import React, { useState } from 'react';
import { Box, useDisclosure, FormControl, FormLabel, Select, VStack, Input, useToast } from '@chakra-ui/react';
import { useAppData } from 'contexts/AppDataContext';
import CrudTable from 'components/crud/CrudTable';
import CrudModal from 'components/crud/CrudModal';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export default function DriverMyDeliveries() {
  const { state, updateEntity, deliveryApi } = useAppData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ status: 'Pending', reason: '' });

  const myDeliveries = state.deliveries.filter(d => d.assigned_driver_id === state.currentUser?.id);

  const columns = [
    columnHelper.accessor('client_name', { header: 'CLIENT' }),
    columnHelper.accessor('phone', { header: 'PHONE' }),
    columnHelper.accessor('address', { header: 'ADDRESS' }),
    columnHelper.accessor('city_id', { 
      header: 'CITY',
      cell: info => state.cities.find(c => c.id === info.getValue())?.name || 'N/A'
    }),
    columnHelper.accessor('product_type_id', { 
      header: 'PRODUCT',
      cell: info => {
        const row = info.row.original;
        return row.product_types?.name || state.product_types.find(p => p.id === info.getValue())?.name || 'N/A';
      }
    }),
    columnHelper.accessor('status', { header: 'STATUS' }),
  ];

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ status: item.status || 'Pending', reason: item.reason || '' });
    onOpen();
  };

  const handleSave = async () => {
    if (editingId) {
      if (formData.status === 'Not Completed' && !formData.reason.trim()) {
        toast({ title: 'Reason Required', description: 'Reason is REQUIRED when status is "Not Completed"', status: 'warning', duration: 3000 });
        return;
      }
      try {
        await updateEntity(deliveryApi, editingId, formData);
        toast({ title: 'Delivery updated', status: 'success', duration: 2000 });
      } catch (err) {
        toast({ title: 'Error', description: err.message, status: 'error', duration: 3000 });
      }
    }
    onClose();
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <CrudTable
        title="My Assigned Deliveries"
        data={myDeliveries}
        columns={columns}
        onEdit={handleEdit}
      />

      <CrudModal
        isOpen={isOpen}
        onClose={onClose}
        title="Update Delivery Status"
        onSave={handleSave}
      >
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select variant="auth" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </Select>
          </FormControl>
          
          {formData.status === 'Not Completed' && (
            <FormControl isRequired>
              <FormLabel>Reason for Failure</FormLabel>
              <Input variant="auth" 
                value={formData.reason} 
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })} 
                placeholder="Explain why it was not completed..."
              />
            </FormControl>
          )}
        </VStack>
      </CrudModal>
    </Box>
  );
}