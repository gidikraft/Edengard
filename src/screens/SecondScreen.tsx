import { StyleSheet, } from 'react-native';
import React from 'react';
import { Box, Text } from '@/components/';

const SecondScreen = () => {
  return (
    <Box flex={1} backgroundColor="white">
      <Text variant="header">Second Screen</Text>
    </Box>
  )
};

export default SecondScreen;

const styles = StyleSheet.create({});
