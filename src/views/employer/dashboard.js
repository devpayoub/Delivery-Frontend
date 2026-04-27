import React from 'react';
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { useAppData } from 'contexts/AppDataContext';
import {
  MdLocalShipping,
  MdCheckCircle,
  MdPendingActions,
  MdPerson,
  MdAttachMoney,
} from "react-icons/md";

export default function EmployerDashboard() {
  const { state } = useAppData();
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const myDeliveries = state.deliveries.filter(d => d.employer_id === state.currentUser?.id);
  const pendingDeliveries = myDeliveries.filter(d => d.status === 'Pending');
  const completedDeliveries = myDeliveries.filter(d => d.status === 'Completed');
  const assignedDrivers = new Set(myDeliveries.map(d => d.assigned_driver_id).filter(id => !!id)).size;

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdLocalShipping} color={brandColor} />
              }
            />
          }
          name='Total Deliveries'
          value={myDeliveries.length}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdPendingActions} color={brandColor} />
              }
            />
          }
          name='Pending'
          value={pendingDeliveries.length}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdCheckCircle} color={brandColor} />
              }
            />
          }
          name='Completed'
          value={completedDeliveries.length}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdPerson} color={brandColor} />
              }
            />
          }
          name='Drivers Used'
          value={assignedDrivers}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAttachMoney} color='white' />}
            />
          }
          name='Spent this month'
          value={`$${myDeliveries.length * 15}.00`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdLocalShipping} color={brandColor} />
              }
            />
          }
          name='Efficiency'
          value={myDeliveries.length > 0 ? `${Math.round((completedDeliveries.length / myDeliveries.length) * 100)}%` : '0%'}
        />
      </SimpleGrid>
    </Box>
  );
}