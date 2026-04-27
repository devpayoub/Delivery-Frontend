import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, VStack, Button, Flex, Heading, SimpleGrid, Select, useColorModeValue, useToast } from '@chakra-ui/react';
import { useAppData } from 'contexts/AppDataContext';
import CrudTable from 'components/crud/CrudTable';
import DeleteConfirmModal from 'components/crud/DeleteConfirmModal';
import { createColumnHelper } from '@tanstack/react-table';
import Card from 'components/card/Card';

const columnHelper = createColumnHelper();

export default function EmployerDeliveries() {
  const { state, createEntity, updateEntity, deleteEntity, deliveryApi } = useAppData();
  const [mode, setMode] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ client_name: '', phone: '', address: '', product_type_id: '', city_id: '', status: 'Pending' });
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const textColor = useColorModeValue("navy.700", "white");

  const myDeliveries = state.deliveries.filter(d => d.employer_id === state.currentUser?.id);

  const columns = [
    columnHelper.accessor('client_name', { header: 'CLIENT' }),
    columnHelper.accessor('address', { header: 'ADDRESS' }),
    columnHelper.accessor('status', { header: 'STATUS' }),
    columnHelper.accessor('city_id', { 
      header: 'CITY',
      cell: info => info.row.original.cities?.name || state.cities.find(c => c.id === info.getValue())?.name || 'N/A'
    }),
  ];

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ client_name: '', phone: '', address: '', product_type_id: '', city_id: '', status: 'Pending' });
    setMode('form');
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setMode('form');
  };

  const handleDeleteClick = (item) => {
    setDeletingItem(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEntity(deliveryApi, deletingItem.id);
      toast({ title: 'Delivery deleted', status: 'success', duration: 2000 });
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 3000 });
    }
    setIsDeleteOpen(false);
  };

  const handleSave = async () => {
    if (!formData.client_name || !formData.phone || !formData.address || !formData.product_type_id || !formData.city_id) {
      toast({ title: 'Error', description: 'All required fields must be filled', status: 'warning', duration: 3000 });
      return;
    }
    setIsLoading(true);
    try {
      if (editingId) {
        await updateEntity(deliveryApi, editingId, formData);
      } else {
        await createEntity(deliveryApi, formData);
      }
      toast({ title: editingId ? 'Delivery updated' : 'Delivery created', status: 'success', duration: 2000 });
      setMode('list');
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === 'form') {
    return (
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <Card p='20px'>
          <Flex direction='column'>
            <Heading color={textColor} fontSize='22px' mb='30px'>
              {editingId ? 'Edit Delivery' : 'Add New Delivery'}
            </Heading>
            <VStack spacing={5} align='stretch'>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
                <FormControl isRequired>
                  <FormLabel>Client Name</FormLabel>
                  <Input variant="auth" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input variant="auth" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Address</FormLabel>
                  <Input variant="auth" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>City</FormLabel>
                  <Select variant="auth" value={formData.city_id} onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}>
                    <option value="">Select City</option>
                    {state.cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Product Type</FormLabel>
                  <Select variant="auth" value={formData.product_type_id} onChange={(e) => setFormData({ ...formData, product_type_id: e.target.value })}>
                    <option value="">Select Product Type</option>
                    {state.product_types.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </Select>
                </FormControl>
              </SimpleGrid>
              <Flex gap={4} mt='20px'>
                <Button variant='brand' onClick={handleSave} isLoading={isLoading}>Save Delivery</Button>
                <Button variant='ghost' onClick={() => setMode('list')}>Cancel</Button>
              </Flex>
            </VStack>
          </Flex>
        </Card>
      </Box>
    );
  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <CrudTable
        title="My Deliveries"
        data={myDeliveries}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={deletingItem?.client_name || 'this delivery'}
      />
    </Box>
  );
}