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
  MdCancel,
  MdPendingActions,
  MdAttachMoney,
  MdTimeline,
} from "react-icons/md";

export default function DriverDashboard() {
  const { state } = useAppData();
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const myDeliveries = state.deliveries.filter(d => {
    // Show deliveries assigned to driver OR deliveries in driver's city
    return d.assigned_driver_id === state.currentUser?.id || d.city_id === state.currentUser?.city_id;
  });
  const pendingDeliveries = myDeliveries.filter(d => d.status === 'Pending');
  const completedDeliveries = myDeliveries.filter(d => d.status === 'Completed');
  const failedDeliveries = myDeliveries.filter(d => d.status === 'Not Completed');

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
          name='Assigned Deliveries'
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
                <Icon w='32px' h='32px' as={MdCancel} color='red.500' />
              }
            />
          }
          name='Failed / Not Completed'
          value={failedDeliveries.length}
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
          name='Earnings'
          value={`$${completedDeliveries.length * 20}.00`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdTimeline} color={brandColor} />
              }
            />
          }
          name='Success Rate'
          value={myDeliveries.length > 0 ? `${Math.round((completedDeliveries.length / myDeliveries.length) * 100)}%` : '0%'}
        />
      </SimpleGrid>
    </Box>
  );
}