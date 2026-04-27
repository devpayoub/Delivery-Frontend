import React from 'react';
import { Box, Flex, Heading, Text, Button, useColorModeValue, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import notFoundImg from 'assets/img/landing/notfound.png';

export default function NotFound() {
  const navigate = useNavigate();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100vw"
      bg={useColorModeValue('secondaryGray.300', 'navy.900')}
    >
      <Box textAlign="center" px={6}>
        <Image 
          src={notFoundImg} 
          alt="404 Not Found" 
          maxW="300px" 
          mx="auto" 
          mb={8} 
          borderRadius="30px"
          boxShadow="0 20px 40px rgba(0,0,0,0.2)"
        />
        <Heading
          display="inline-block"
          as="h1"
          size="4xl"
          bgGradient={`linear(to-r, ${brandColor}, brand.400)`}
          backgroundClip="text"
          mb={4}
        >
          404
        </Heading>
        <Text fontSize="2xl" mt={3} mb={2} color={textColor} fontWeight="bold">
          Page Not Found
        </Text>
        <Text color="secondaryGray.600" mb={8} fontSize="lg">
          The page you're looking for doesn't exist or has been moved.
        </Text>

        <Button
          colorScheme="brand"
          bg={brandColor}
          color="white"
          variant="solid"
          px={8}
          py={6}
          fontSize="md"
          fontWeight="500"
          _hover={{ bg: 'brand.600' }}
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Flex>
  );
}
