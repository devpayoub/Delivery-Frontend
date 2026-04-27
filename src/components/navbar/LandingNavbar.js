import React from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { DeliveryLogo } from "components/icons/Icons";
import { useAppData } from 'contexts/AppDataContext';

export default function LandingNavbar(props) {
  const { logoText } = props;
  const { state } = useAppData();
  const textColor = useColorModeValue("navy.700", "white");
  const logoColor = useColorModeValue("navy.700", "white");
  const navbarBg = useColorModeValue("rgba(255, 255, 255, 0.7)", "rgba(11, 20, 55, 0.5)");
  const navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );

  return (
    <Flex
      position='fixed'
      top='16px'
      left='50%'
      transform='translate(-50%, 0px)'
      background={navbarBg}
      backdropFilter='blur(20px)'
      boxShadow={navbarShadow}
      borderRadius='15px'
      px='16px'
      py='12px'
      mx='auto'
      width='1044px'
      maxW='90%'
      alignItems='center'
      zIndex='100'>
      <Flex w='100%' justifyContent='space-between' alignItems='center'>
        <NavLink to='/'>
          <Flex align='center'>
            <DeliveryLogo h='30px' w='30px' color={logoColor} />
            <Text fontSize='sm' mt='3px' ml='5px' fontWeight='bold' color={textColor}>
              {logoText}
            </Text>
          </Flex>
        </NavLink>
        
        <HStack display={{ base: "none", lg: "flex" }} spacing='30px'>
          <Link href="#features">
            <Text color={textColor} fontSize='sm' fontWeight='600'>
              Features
            </Text>
          </Link>
          <Link href="#roles">
            <Text color={textColor} fontSize='sm' fontWeight='600'>
              Roles
            </Text>
          </Link>
          <Link href="#stats">
            <Text color={textColor} fontSize='sm' fontWeight='600'>
              Impact
            </Text>
          </Link>
          {state.currentUser ? (
            <NavLink to={`/${state.currentUser.role}/dashboard`}>
              <Button
                bg='brand.500'
                color='white'
                fontSize='xs'
                variant='no-effects'
                borderRadius='15px'
                px='30px'
                _hover={{ bg: 'brand.600' }}>
                Go to Dashboard
              </Button>
            </NavLink>
          ) : (
            <>
              <NavLink to='/auth/login'>
                <Text color={textColor} fontSize='sm' fontWeight='600'>
                  Sign In
                </Text>
              </NavLink>
              <NavLink to='/auth/register'>
                <Button
                  bg='brand.500'
                  color='white'
                  fontSize='xs'
                  variant='no-effects'
                  borderRadius='15px'
                  px='30px'
                  _hover={{ bg: 'brand.600' }}>
                  Get Started
                </Button>
              </NavLink>
            </>
          )}
        </HStack>
        
        {/* Mobile View */}
        <Box display={{ base: "flex", lg: "none" }}>
            {state.currentUser ? (
              <NavLink to={`/${state.currentUser.role}/dashboard`}>
                  <Button size='sm' variant='brand'>Dashboard</Button>
              </NavLink>
            ) : (
              <NavLink to='/auth/login'>
                  <Button size='sm' variant='brand'>Login</Button>
              </NavLink>
            )}
        </Box>
      </Flex>
    </Flex>
  );
}
