import { FlatList, RefreshControl, SafeAreaView, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import { Box, Icon, Pressable, Text } from '@/components/';
import { RootStackScreenProps } from '@/navigation/types';
import { palette } from '@/theme/';
import { useGetNotificationsQuery } from '../../api/services';
import Bottomsheet from '../../components/Bottomsheet';
import { NotificationDetails } from '../../components/Modals';
import { NotificationItem, NotificationResponse } from '@/types/';
import { formatEllipseText } from '@/utils/';
import IIcon from 'react-native-vector-icons/Ionicons';

const Notifications = ({ navigation }: RootStackScreenProps<"NotificationScreen">) => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeIndex, setActiveIndex] = useState<NotificationItem>();
  const [refreshing, setRefreshing] = React.useState(false);

  const { data, isLoading } = useGetNotificationsQuery('posts');
  // console.log(data, isLoading, 'data');

  const toggleDetails = () => setShowDetails(prev => !prev);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.maincontainer} >
      <Box flex={1} backgroundColor="background" paddingHorizontal='sm' >
        <Box flexDirection='row' alignItems="center" marginTop="md">
          <Pressable onPress={() => navigation.goBack()} type='scale'>
            <IIcon name="chevron-back-outline" size={16} color={palette.black} />
          </Pressable>
          <Text variant="bold20" marginLeft='md'>Notification</Text>
        </Box>

        <Box marginTop='lg'>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingTop: 4, paddingBottom: 60, paddingHorizontal: 4 }}
            renderItem={({ item }) => {
              const { body, id, title, userId } = item;
              return (
                <NotificationFile
                  body={body}
                  title={title}
                  itemPress={() => {
                    toggleDetails();
                    setActiveIndex(item);
                    console.log(item, 'item')
                  }}
                />
              )
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[palette.blue, palette.success, palette.error]}
                tintColor={palette.primary}
                title="Refreshing"
                titleColor={palette.primary}
              />
            }
            showsVerticalScrollIndicator={false}
          // refreshControl={ }
          />
        </Box>
      </Box>
      <NotificationDetails
        closeModal={toggleDetails}
        showModal={showDetails}
        title={activeIndex?.title}
        body={activeIndex?.body}
      />
    </SafeAreaView>
  )
};

type NotificationItemProp = {
  body: string;
  title: string;
  itemPress: () => void;
};

const NotificationFile = ({ body, title, itemPress }: NotificationItemProp) => {
  return (
    <Pressable
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
      onPress={itemPress}
    >
      <Box flexDirection='row' alignItems='center' width={'100%'}>
        <IIcon name="chatbox-ellipses-outline" size={30} color={palette.black} />
        <Box marginLeft='ssm'>
          <Text variant="medium12" >{title}</Text>
          <Text variant="regular10" marginTop='xs'>{formatEllipseText(body, 40)}</Text>
        </Box>
      </Box>
    </Pressable>

  )
};

export default Notifications;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.background,
  },
});
