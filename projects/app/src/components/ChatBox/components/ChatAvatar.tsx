import Avatar from '@/components/Avatar';
import { Box } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/system';
import React from 'react';

const ChatAvatar = ({ src, type }: { src?: string; type: 'Human' | 'AI' }) => {
  const theme = useTheme();
  return (
    <Box
      w={'40px'}
      h={'40px'}
      borderRadius={'50%'}
      overflow={'hidden'}
      bg={type === 'Human' ? 'white' : 'primary.50'}
    >
      <Avatar src={src} w={'100%'} h={'100%'} />
    </Box>
  );
};

export default React.memo(ChatAvatar);
