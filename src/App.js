import './assets/css/App.css';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import OwnerLayout from './layouts/owner';
import EmployerLayout from './layouts/employer';
import DriverLayout from './layouts/driver';
import LandingPage from './views/landing';
import { ChakraProvider } from '@chakra-ui/react';
import { AppDataProvider } from './contexts/AppDataContext';
import { useState } from 'react';
import initialTheme from './theme/theme';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  
  return (
    <AppDataProvider>
      <ChakraProvider theme={currentTheme}>
        <Routes>
          <Route path="auth/*" element={<AuthLayout />} />
          
          <Route
            path="owner/*"
            element={<OwnerLayout theme={currentTheme} setTheme={setCurrentTheme} />}
          />
          
          <Route
            path="employer/*"
            element={<EmployerLayout theme={currentTheme} setTheme={setCurrentTheme} />}
          />
          
          <Route
            path="driver/*"
            element={<DriverLayout theme={currentTheme} setTheme={setCurrentTheme} />}
          />
          
          {/* Landing page at root */}
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </ChakraProvider>
    </AppDataProvider>
  );
}
