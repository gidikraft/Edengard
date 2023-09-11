import { StyleSheet, } from 'react-native';
import React from 'react';
import { Box, Icon, Text } from '@/components/';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette } from '@/theme';

const eventFilters = [
  {title: 'All events', id: 1},
  {title: 'Concerts', id: 2},
  {title: 'Technology', id: 3},
  {title: 'Sports', id: 4},
  {title: 'Party', id: 5},
];

const Events = () => {
  return (
    <SafeAreaView style={styles.maincontainer} >
      <Box flex={1} backgroundColor="background" paddingHorizontal='md'>
        <Icon name='search'/>
        {/* <Text variant="header">Second Screen</Text> */}
      </Box>

    </SafeAreaView>
  )
};

export default Events;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.background,
  },
});
