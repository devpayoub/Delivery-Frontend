import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdPerson,
  MdLocalShipping,
  MdLocationCity,
  MdCategory,
  MdHistory,
  MdLock,
  MdPeople,
} from 'react-icons/md';

// Auth Imports
import Login from 'views/auth/login';
import Register from 'views/auth/register';

// Owner Imports
import OwnerDashboard from 'views/owner/dashboard';
import OwnerEmployers from 'views/owner/employers';
import OwnerDrivers from 'views/owner/drivers';
import OwnerCities from 'views/owner/cities';
import OwnerProductTypes from 'views/owner/productTypes';
import OwnerDeliveries from 'views/owner/deliveries';
import OwnerLogs from 'views/owner/logs';

// Employer Imports
import EmployerDashboard from 'views/employer/dashboard';
import EmployerDeliveries from 'views/employer/deliveries';
import EmployerAssignCity from 'views/employer/assignCity';

// Driver Imports
import DriverDashboard from 'views/driver/dashboard';
import DriverMyDeliveries from 'views/driver/myDeliveries';

const allRoutes = [
  // --- OWNER ROUTES ---
  {
    name: 'Dashboard',
    layout: '/owner',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <OwnerDashboard />,
    role: 'owner',
  },
  {
    name: 'Employers',
    layout: '/owner',
    path: '/employers',
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
    component: <OwnerEmployers />,
    role: 'owner',
  },
  {
    name: 'Drivers',
    layout: '/owner',
    path: '/drivers',
    icon: <Icon as={MdLocalShipping} width="20px" height="20px" color="inherit" />,
    component: <OwnerDrivers />,
    role: 'owner',
  },
  {
    name: 'Cities',
    layout: '/owner',
    path: '/cities',
    icon: <Icon as={MdLocationCity} width="20px" height="20px" color="inherit" />,
    component: <OwnerCities />,
    role: 'owner',
  },
  {
    name: 'Product Types',
    layout: '/owner',
    path: '/product-types',
    icon: <Icon as={MdCategory} width="20px" height="20px" color="inherit" />,
    component: <OwnerProductTypes />,
    role: 'owner',
  },
  {
    name: 'Deliveries',
    layout: '/owner',
    path: '/deliveries',
    icon: <Icon as={MdLocalShipping} width="20px" height="20px" color="inherit" />,
    component: <OwnerDeliveries />,
    role: 'owner',
  },
  {
    name: 'Logs',
    layout: '/owner',
    path: '/logs',
    icon: <Icon as={MdHistory} width="20px" height="20px" color="inherit" />,
    component: <OwnerLogs />,
    role: 'owner',
  },

  // --- EMPLOYER ROUTES ---
  {
    name: 'Dashboard',
    layout: '/employer',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <EmployerDashboard />,
    role: 'employer',
  },
  {
    name: 'Deliveries',
    layout: '/employer',
    path: '/deliveries',
    icon: <Icon as={MdLocalShipping} width="20px" height="20px" color="inherit" />,
    component: <EmployerDeliveries />,
    role: 'employer',
  },
  {
    name: 'Assign City',
    layout: '/employer',
    path: '/assign-city',
    icon: <Icon as={MdLocationCity} width="20px" height="20px" color="inherit" />,
    component: <EmployerAssignCity />,
    role: 'employer',
  },

  // --- DRIVER ROUTES ---
  {
    name: 'Dashboard',
    layout: '/driver',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <DriverDashboard />,
    role: 'driver',
  },
  {
    name: 'My Deliveries',
    layout: '/driver',
    path: '/my-deliveries',
    icon: <Icon as={MdLocalShipping} width="20px" height="20px" color="inherit" />,
    component: <DriverMyDeliveries />,
    role: 'driver',
  },

  // --- AUTH ROUTES ---
  {
    name: 'Login',
    layout: '/auth',
    path: '/login',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <Login />,
  },
  {
    name: 'Register',
    layout: '/auth',
    path: '/register',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <Register />,
  },
];

export const getRoutesByRole = (role) => {
  return allRoutes.filter(route => !route.role || route.role === role);
};

export default allRoutes;