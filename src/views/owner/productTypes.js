import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, VStack, Button, Flex, Heading, useColorModeValue, useToast } from '@chakra-ui/react';
import { useAppData } from 'contexts/AppDataContext';
import CrudTable from 'components/crud/CrudTable';
import DeleteConfirmModal from 'components/crud/DeleteConfirmModal';
import { createColumnHelper } from '@tanstack/react-table';
import Card from 'components/card/Card';

const columnHelper = createColumnHelper();

export default function ProductTypes() {
  const { state, createEntity, updateEntity, deleteEntity, productTypeApi } = useAppData();
  const [mode, setMode] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const textColor = useColorModeValue("navy.700", "white");

  const columns = [
    columnHelper.accessor('name', { header: 'PRODUCT TYPE' }),
  ];

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: '' });
    setMode('form');
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ name: item.name });
    setMode('form');
  };

  const handleDeleteClick = (item) => {
    setDeletingItem(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEntity(productTypeApi, deletingItem.id);
      toast({ title: 'Product type deleted', status: 'success', duration: 2000 });
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 3000 });
    }
    setIsDeleteOpen(false);
  };

  const handleSave = async () => {
    if (!formData.name) {
      toast({ title: 'Error', description: 'Product type name is required', status: 'warning', duration: 3000 });
      return;
    }
    setIsLoading(true);
    try {
      if (editingId) {
        await updateEntity(productTypeApi, editingId, formData);
      } else {
        await createEntity(productTypeApi, formData);
      }
      toast({ title: editingId ? 'Product type updated' : 'Product type created', status: 'success', duration: 2000 });
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
              {editingId ? 'Edit Product Type' : 'Add New Product Type'}
            </Heading>
            <VStack spacing={5} align='stretch'>
              <FormControl isRequired>
                <FormLabel>Product Type Name</FormLabel>
                <Input variant="auth" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </FormControl>
              <Flex gap={4} mt='20px'>
                <Button variant='brand' onClick={handleSave} isLoading={isLoading}>Save Product Type</Button>
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
        title="Product Types"
        data={state.product_types}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={deletingItem?.name || 'this item'}
      />
    </Box>
  );
}