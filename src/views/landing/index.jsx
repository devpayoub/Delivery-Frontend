import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  Container,
  SimpleGrid,
  Image,
  Badge,
  Link,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { motion, isValidMotionProp } from 'framer-motion';
import { 
  MdLocalShipping, 
  MdSecurity, 
  MdFlashOn, 
  MdCheckCircle, 
  MdGroup, 
  MdMap,
  MdDashboard
} from 'react-icons/md';
import LandingNavbar from 'components/navbar/LandingNavbar';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Feature = ({ title, text, icon, delay = 0 }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      p={8}
      bg={useColorModeValue('white', 'navy.800')}
      borderRadius="24px"
      boxShadow="0 10px 30px rgba(0, 0, 0, 0.05)"
      border="1px solid"
      borderColor={useColorModeValue('secondaryGray.100', 'whiteAlpha.100')}
      _hover={{ transform: 'translateY(-10px)', transition: 'all 0.3s ease' }}
    >
      <Flex
        w={12}
        h={12}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'16px'}
        bg={'brand.500'}
        mb={6}>
        {icon}
      </Flex>
      <Heading fontSize={'xl'} mb={4} color={useColorModeValue('navy.700', 'white')}>
        {title}
      </Heading>
      <Text color={'gray.500'} fontSize={'md'} lineHeight={1.8}>
        {text}
      </Text>
    </MotionBox>
  );
};

const RoleCard = ({ role, title, description, icon, bg, color }) => {
  return (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      p={8}
      borderRadius="30px"
      bg={bg}
      color={color}
      position="relative"
      overflow="hidden"
    >
      <Icon 
        as={icon} 
        position="absolute" 
        right="-20px" 
        top="-20px" 
        w="120px" 
        h="120px" 
        opacity={0.1} 
      />
      <Badge bg="whiteAlpha.300" color="white" mb={4} borderRadius="full" px={3}>
        {role}
      </Badge>
      <Heading size="lg" mb={4}>{title}</Heading>
      <Text opacity={0.9} mb={6}>{description}</Text>
      <NavLink to="/auth/register">
        <Button variant="white" color={color} borderRadius="full" px={8}>Explore {role} Tools</Button>
      </NavLink>
    </MotionBox>
  );
};

export default function LandingPage() {
  const bg = useColorModeValue('secondaryGray.300', 'navy.900');
  const textColor = useColorModeValue('navy.700', 'white');
  const secondaryBg = useColorModeValue('white', 'navy.800');

  return (
    <Box bg={bg} minH="100vh" overflowX="hidden">
      <LandingNavbar logoText="DELIVERY" />

      {/* Hero Section */}
      <Container maxW={'7xl'} pt={{ base: 40, md: 52 }} pb={20}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 20 }}
          direction={{ base: 'column', md: 'row' }}>
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Stack spacing={8}>
              <Badge
                px={4}
                py={2}
                bg="brand.100"
                color="brand.500"
                borderRadius="full"
                w="fit-content"
                fontSize="sm"
                fontWeight="bold">
                🚀 Version 2.0 Now Live
              </Badge>
              <Heading
                lineHeight={1.1}
                fontWeight={800}
                fontSize={{ base: '4xl', sm: '5xl', lg: '7xl' }}>
                <chakra.span color={textColor}>
                  The Smartest Way to
                </chakra.span>
                <br />
                <chakra.span 
                  bgGradient="linear(to-r, brand.400, brand.600)"
                  bgClip="text"
                >
                  Deliver Anything.
                </chakra.span>
              </Heading>
              <Text color={'gray.500'} fontSize="xl" maxW="lg" lineHeight={1.8}>
                A complete hybrid logistics engine that unifies owners, employers, and drivers into a single high-performance delivery ecosystem.
              </Text>
              <Stack
                spacing={4}
                direction={{ base: 'column', sm: 'row' }}>
                <NavLink to="/auth/register">
                  <Button
                    borderRadius="20px"
                    size={'lg'}
                    h="70px"
                    px={12}
                    fontSize="lg"
                    colorScheme={'brand'}
                    bg={'brand.500'}
                    boxShadow="0 15px 25px rgba(67, 24, 255, 0.3)"
                    _hover={{ bg: 'brand.600', transform: 'translateY(-2px)' }}>
                    Get Started Free
                  </Button>
                </NavLink>
                <NavLink to="/auth/login">
                  <Button
                    borderRadius="20px"
                    size={'lg'}
                    h="70px"
                    px={12}
                    fontSize="lg"
                    variant="outline"
                    color={textColor}
                    _hover={{ bg: 'whiteAlpha.100' }}>
                    View Demo
                  </Button>
                </NavLink>
              </Stack>
            </Stack>
          </MotionBox>
          <MotionBox
            flex={1}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            position="relative"
          >
            <Box
              position="absolute"
              top="-20%"
              right="-20%"
              w="140%"
              h="140%"
              bgGradient="radial(brand.500 0%, transparent 70%)"
              opacity={0.1}
              zIndex={0}
            />
            <Image
              alt={'Dashboard Preview'}
              borderRadius="30px"
              boxShadow="0 50px 100px rgba(0,0,0,0.2)"
              src={'https://images.unsplash.com/photo-1551288049-bbbda546697a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
              zIndex={1}
              position="relative"
            />
          </MotionBox>
        </Stack>
      </Container>

      {/* Role Section */}
      <Box id="roles" py={24} bg={secondaryBg}>
        <Container maxW={'7xl'}>
          <Stack textAlign="center" mb={20} spacing={4}>
            <Heading color={textColor} size="2xl" fontWeight="800">One Platform. Three Experiences.</Heading>
            <Text color="gray.500" fontSize="xl">Tailored tools for every member of your logistics chain.</Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <RoleCard 
              role="Owner" 
              title="Full System Control" 
              description="Manage cities, product types, and oversee all employers and drivers from a master dashboard."
              icon={MdSecurity}
              bg="brand.500"
              color="white"
            />
            <RoleCard 
              role="Employer" 
              title="Streamlined Logistics" 
              description="Create deliveries, manage client data, and assign drivers to specific urban zones with ease."
              icon={MdDashboard}
              bg="navy.700"
              color="white"
            />
            <RoleCard 
              role="Driver" 
              title="Ready to Deliver" 
              description="Real-time access to assigned deliveries, client details, and one-tap status updates."
              icon={MdLocalShipping}
              bg="orange.400"
              color="white"
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box id="stats" py={20}>
        <Container maxW={'7xl'}>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10} textAlign="center">
            <Box>
              <Heading color={textColor} size="2xl">15k+</Heading>
              <Text color="gray.500">Deliveries Monthly</Text>
            </Box>
            <Box>
              <Heading color={textColor} size="2xl">99.8%</Heading>
              <Text color="gray.500">Success Rate</Text>
            </Box>
            <Box>
              <Heading color={textColor} size="2xl">24/7</Heading>
              <Text color="gray.500">Active Monitoring</Text>
            </Box>
            <Box>
              <Heading color={textColor} size="2xl">4.9/5</Heading>
              <Text color="gray.500">User Rating</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Detail */}
      <Box py={24} bg={secondaryBg}>
        <Container maxW={'7xl'}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20} align="center">
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                borderRadius="30px" 
                boxShadow="xl"
              />
            </MotionBox>
            <Stack spacing={8} justify="center" textAlign="left">
              <Heading color={textColor} size="xl">Smart City-Based Dispatch</Heading>
              <Stack spacing={4}>
                <Flex align="center">
                  <Icon as={MdCheckCircle} color="brand.500" w={6} h={6} mr={3} />
                  <Text color={textColor} fontWeight="600">Assign drivers to specific city sectors</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={MdCheckCircle} color="brand.500" w={6} h={6} mr={3} />
                  <Text color={textColor} fontWeight="600">Filter deliveries by urban zones</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={MdCheckCircle} color="brand.500" w={6} h={6} mr={3} />
                  <Text color={textColor} fontWeight="600">Automated performance tracking by city</Text>
                </Flex>
              </Stack>
              <Button colorScheme="brand" size="lg" w="fit-content" borderRadius="full">Learn More about Cities</Button>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box id="features" py={24}>
        <Container maxW={'7xl'}>
          <Stack spacing={4} textAlign="center" mb={20}>
            <Heading color={textColor} size="2xl">Loved by Logistics Teams</Heading>
            <Text color="gray.500" fontSize="xl">Don't just take our word for it.</Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature 
              icon={<Icon as={MdGroup} w={8} h={8} />}
              title="Best System Ever"
              text="Our delivery efficiency increased by 40% in the first month. The role-based dashboards are a game changer."
              delay={0.1}
            />
            <Feature 
              icon={<Icon as={MdMap} w={8} h={8} />}
              title="Urban Tracking"
              text="Managing drivers across multiple cities used to be a nightmare. Now it takes seconds to assign and monitor."
              delay={0.2}
            />
            <Feature 
              icon={<Icon as={MdFlashOn} w={8} h={8} />}
              title="Lightning Fast"
              text="The interface is incredibly responsive. Our drivers love the mobile view for updating delivery statuses."
              delay={0.3}
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20}>
        <Container maxW={'7xl'}>
          <Box 
            p={{ base: 10, md: 20 }} 
            borderRadius="40px" 
            bgGradient="linear(to-br, brand.500, brand.700)" 
            textAlign="center"
            color="white"
            position="relative"
            overflow="hidden"
          >
            <Box position="absolute" top="0" left="0" w="100%" h="100%" opacity={0.1} bgImage="url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" />
            <Heading size="2xl" mb={6} position="relative">Ready to Transform Your Delivery Business?</Heading>
            <Text fontSize="xl" mb={10} maxW="2xl" mx="auto" position="relative">Join over 500 companies that trust Delivery Pro to power their logistics operations.</Text>
            <Stack direction={{ base: 'column', sm: 'row' }} justify="center" spacing={4} position="relative">
              <NavLink to="/auth/register">
                <Button size="xl" h="70px" px={12} bg="white" color="brand.500" borderRadius="full" fontSize="lg" _hover={{ bg: 'secondaryGray.100' }}>Get Started Now</Button>
              </NavLink>
              <NavLink to="/auth/login">
                <Button size="xl" h="70px" px={12} variant="outline" borderColor="white" color="white" borderRadius="full" fontSize="lg" _hover={{ bg: 'whiteAlpha.200' }}>Contact Sales</Button>
              </NavLink>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box py={10} borderTop="1px solid" borderColor={useColorModeValue('secondaryGray.200', 'whiteAlpha.100')}>
        <Container maxW={'7xl'}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={12} mb={20}>
            <Stack spacing={6}>
              <Heading fontSize="24px" color={textColor} fontWeight="800">
                DELIVERY<Text as="span" color="brand.500">PRO</Text>
              </Heading>
              <Text color="gray.500">The next generation of logistics management software.</Text>
            </Stack>
            <Stack spacing={4}>
              <Text fontWeight="bold" color={textColor}>Product</Text>
              <Link color="gray.500">Features</Link>
              <Link color="gray.500">Role Dashboards</Link>
              <Link color="gray.500">Pricing</Link>
            </Stack>
            <Stack spacing={4}>
              <Text fontWeight="bold" color={textColor}>Company</Text>
              <Link color="gray.500">About Us</Link>
              <Link color="gray.500">Careers</Link>
              <Link color="gray.500">Blog</Link>
            </Stack>
            <Stack spacing={4}>
              <Text fontWeight="bold" color={textColor}>Legal</Text>
              <Link color="gray.500">Privacy Policy</Link>
              <Link color="gray.500">Terms of Service</Link>
              <Link color="gray.500">Cookie Policy</Link>
            </Stack>
          </SimpleGrid>
          <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }}>
            <Text color="gray.500">© 2024 CeruLabs. All rights reserved.</Text>
            <Stack direction="row" spacing={6} mt={{ base: 4, md: 0 }}>
              <Link color="gray.500">Twitter</Link>
              <Link color="gray.500">LinkedIn</Link>
              <Link color="gray.500">GitHub</Link>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
