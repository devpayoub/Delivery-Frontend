import React, { useState, useRef } from 'react';
import { Box, FormControl, FormLabel, Input, VStack, Button, Flex, Heading, SimpleGrid, useColorModeValue, useToast, Image, Text } from '@chakra-ui/react';
import { useAppData } from 'contexts/AppDataContext';
import CrudTable from 'components/crud/CrudTable';
import DeleteConfirmModal from 'components/crud/DeleteConfirmModal';
import { createColumnHelper } from '@tanstack/react-table';
import Card from 'components/card/Card';

const columnHelper = createColumnHelper();

export default function Employers() {
  const textColor = useColorModeValue("navy.700", "white");
  const { state, createEntity, updateEntity, deleteEntity, employerApi } = useAppData();
  const toast = useToast();
  const [mode, setMode] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', id_number: '', id_pic_base64: '', password: '' });
  const [idPicPreview, setIdPicPreview] = useState(null);
  const idPicRef = useRef(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    columnHelper.accessor('name', { header: 'NAME' }),
    columnHelper.accessor('phone', { header: 'PHONE' }),
    columnHelper.accessor('id_number', { header: 'ID NUMBER' }),
  ];

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const img = new window.Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      
      const maxDim = 800;
      if (width > height && width > maxDim) {
        height = (height * maxDim) / width;
        width = maxDim;
      } else if (height > maxDim) {
        width = (width * maxDim) / height;
        height = maxDim;
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      const compressed = canvas.toDataURL('image/jpeg', 0.7);
      
      if (type === 'id') {
        setFormData(prev => ({ ...prev, id_pic_base64: compressed }));
        setIdPicPreview(compressed);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const removeImage = (type) => {
    if (type === 'id') {
      setFormData(prev => ({ ...prev, id_pic_base64: '' }));
      setIdPicPreview(null);
      if (idPicRef.current) idPicRef.current.value = '';
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: '', phone: '', id_number: '', id_pic_base64: '', password: '' });
    setIdPicPreview(null);
    setMode('form');
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ name: item.name, phone: item.phone, id_number: item.id_number, id_pic_base64: '', password: '' });
    setIdPicPreview(item.id_pic || null);
    setMode('form');
  };

  const handleDeleteClick = (item) => {
    setDeletingItem(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEntity(employerApi, deletingItem.id);
      toast({ title: 'Employer deleted', status: 'success', duration: 2000 });
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 3000 });
    }
    setIsDeleteOpen(false);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.phone || !formData.id_number || (!editingId && !formData.password)) {
      toast({ title: 'Error', description: 'All required fields must be filled', status: 'warning', duration: 3000 });
      return;
    }
    setIsLoading(true);
    try {
      const dataToSend = { ...formData };
      if (!dataToSend.id_pic_base64) {
        delete dataToSend.id_pic_base64;
      }
      if (editingId) {
        await updateEntity(employerApi, editingId, dataToSend);
      } else {
        await createEntity(employerApi, dataToSend);
      }
      toast({ title: editingId ? 'Employer updated' : 'Employer created', status: 'success', duration: 2000 });
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
              {editingId ? 'Edit Employer' : 'Add New Employer'}
            </Heading>
            <VStack spacing={5} align='stretch'>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input variant="auth" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input variant="auth" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>ID Number</FormLabel>
                  <Input variant="auth" value={formData.id_number} onChange={(e) => setFormData({ ...formData, id_number: e.target.value })} />
                </FormControl>
                {!editingId && (
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input variant="auth" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                  </FormControl>
                )}
              </SimpleGrid>

              <FormControl>
                <FormLabel>ID Image</FormLabel>
                <Input type="file" accept="image/*" ref={idPicRef} onChange={(e) => handleFileChange(e, 'id')} display="none" />
                {idPicPreview ? (
                  <Box position="relative" w="200px">
                    <Image src={idPicPreview} alt="ID Preview" borderRadius="md" maxH="150px" />
                    <Button size="xs" colorScheme="red" position="absolute" top="-8px" right="-8px" onClick={() => removeImage('id')}>X</Button>
                  </Box>
                ) : (
                  <Button onClick={() => idPicRef.current.click()} variant="outline" w="200px">Upload ID Image</Button>
                )}
              </FormControl>

              <Flex gap={4} mt='20px'>
                <Button variant='brand' onClick={handleSave} isLoading={isLoading}>Save Employer</Button>
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
      <CrudTable title="Employers" data={state.employers} columns={columns} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDeleteClick} />
      <DeleteConfirmModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={confirmDelete} itemName={deletingItem?.name || 'this item'} />
    </Box>
  );
}
