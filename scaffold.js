const fs = require('fs');
const path = require('path');

const views = {
  auth: ['login.js', 'register.js'],
  owner: ['dashboard.js', 'employers.js', 'drivers.js', 'cities.js', 'productTypes.js', 'deliveries.js', 'logs.js'],
  employer: ['dashboard.js', 'deliveries.js', 'assignDrivers.js'],
  driver: ['dashboard.js', 'myDeliveries.js']
};

const baseDir = path.join(__dirname, 'src', 'views');

const template = (name) => `import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function ${name.replace('.js', '').charAt(0).toUpperCase() + name.replace('.js', '').slice(1)}() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Text fontSize="2xl" fontWeight="bold">${name.replace('.js', '')}</Text>
    </Box>
  );
}
`;

for (const [folder, files] of Object.entries(views)) {
  const dir = path.join(baseDir, folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  for (const file of files) {
    fs.writeFileSync(path.join(dir, file), template(file));
  }
}
console.log('Scaffold complete');
