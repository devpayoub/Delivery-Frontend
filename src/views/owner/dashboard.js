import React, { useMemo } from 'react';
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Heading,
  Text,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { useAppData } from 'contexts/AppDataContext';
import {
  MdPeople,
  MdLocalShipping,
  MdLocationCity,
  MdCategory,
  MdHistory,
  MdLocalShipping as MdDelivery,
} from "react-icons/md";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#4481EB', '#04BEFE', '#FF6B6B', '#FFCE00', '#11CF9E'];

export default function OwnerDashboard() {
  const { state } = useAppData();
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("navy.700", "white");

  const deliveryStats = useMemo(() => {
    const stats = {
      Pending: 0,
      Completed: 0,
      'Not Completed': 0,
    };
    state.deliveries.forEach(d => {
      if (stats[d.status] !== undefined) {
        stats[d.status]++;
      } else {
        stats.Pending++;
      }
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  }, [state.deliveries]);

  const deliveriesPerDay = useMemo(() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toISOString().split('T')[0]);
    }
    
    const countByDate = {};
    last7Days.forEach(date => {
      countByDate[date] = 0;
    });
    
    state.deliveries.forEach(d => {
      if (d.created_at) {
        const date = d.created_at.split('T')[0];
        if (countByDate[date] !== undefined) {
          countByDate[date]++;
        }
      }
    });
    
    return last7Days.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      deliveries: countByDate[date]
    }));
  }, [state.deliveries]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdPeople} color={brandColor} />
              }
            />
          }
          name='Total Employers'
          value={state.employers.length}
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
          name='Total Drivers'
          value={state.drivers.length}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdLocationCity} color={brandColor} />
              }
            />
          }
          name='Total Cities'
          value={state.cities.length}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdCategory} color={brandColor} />
              }
            />
          }
          name='Product Types'
          value={state.product_types.length}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdDelivery} color='white' />}
            />
          }
          name='Total Deliveries'
          value={state.deliveries.length}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdHistory} color={brandColor} />
              }
            />
          }
          name='System Logs'
          value={state.logs.length}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap='20px'>
        <Box bg={boxBg} p='20px' borderRadius='15px'>
          <Heading color={textColor} fontSize='lg' mb='20px'>Delivery Status</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deliveryStats}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {deliveryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box bg={boxBg} p='20px' borderRadius='15px'>
          <Heading color={textColor} fontSize='lg' mb='20px'>Deliveries Per Day (Last 7 Days)</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deliveriesPerDay}>
              <XAxis dataKey="date" stroke={textColor} fontSize={12} />
              <YAxis stroke={textColor} fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="deliveries" fill="#4481EB" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>
    </Box>
  );
}