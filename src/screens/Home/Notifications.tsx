import { FlatList, SafeAreaView, StyleSheet, } from 'react-native';
import React from 'react';
import { Box, Icon, Pressable, Text } from '@/components/';
import { RootStackScreenProps } from '@/navigation/types';
import { palette } from '@/theme/';
import { useGetNotificationsQuery } from '../../api/services';

const Notifications = ({ navigation }: RootStackScreenProps<"NotificationScreen">) => {

  const { data, isLoading } = useGetNotificationsQuery('posts');
  // console.log(data, isLoading, 'data');

  return (
    <Box flex={1} backgroundColor='background'>
      <Box flex={1} backgroundColor="background" paddingHorizontal='sm' marginTop="xl">
        <Box flexDirection='row' alignItems="center" marginTop="md">
          <Pressable onPress={() => navigation.goBack()} type='scale'>
            <Icon name='arrow_back' size={16} />
          </Pressable>
          <Text variant="medium24" marginLeft='md'>Notification</Text>
        </Box>

        <Box marginTop='lg'>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingTop: 4, paddingBottom: 60, paddingHorizontal: 4 }}
            renderItem={({ item }) => {
              const { body, id, title, userId } = item;
              return (
                <Box
                  paddingVertical='ssm'
                  paddingHorizontal='sl'
                  backgroundColor='blueHighlight'
                  flexDirection='row'
                  borderRadius={8}
                  width={'100%'}
                  marginBottom='ssm'
                  alignItems='center'
                  style={{
                    shadowColor: 'rgba(0,0,0,0.2',
                    elevation: 4,
                    shadowOffset: {
                      width: 0,
                      height: 1
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22
                  }}
                >
                  <Box width={'18%'} height={54} borderRadius={8} backgroundColor='border' />

                  <Box paddingHorizontal='md' flexDirection='row' alignItems='center' justifyContent='space-between' width={'82%'} >
                    <Box  >
                      <Text variant="medium12" >{title}</Text>
                      <Text variant="regular10" marginTop='xs'>A sentence or two of what the notification is about (max 2 lines)</Text>
                    </Box>

                    <Icon name='trash' />
                  </Box>
                </Box>
              )
            }}
            showsVerticalScrollIndicator={false}
          // refreshControl={ }
          />
        </Box>
      </Box>
    </Box>
  )
};

export default Notifications;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.background,
  },
});
