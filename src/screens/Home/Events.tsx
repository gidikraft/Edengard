import { Image, ScrollView, StyleSheet, TouchableOpacity, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Button, Icon, Pressable, Text } from '@/components/';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette } from '@/theme/';
import { RootTabScreenProps } from '@/navigation/types';
import { events, formatEllipseText } from '@/utils/';
import database from '@react-native-firebase/database';
import { TEvent } from '@/types/';

const eventFilters = [
  { title: 'All events', id: 1 },
  { title: 'Concerts', id: 2 },
  { title: 'Technology', id: 3 },
  { title: 'Sports', id: 4 },
  { title: 'Party', id: 5 },
];

const eventBackground = require('@/assets/images/event_image.png');

const Events = ({ navigation }: RootTabScreenProps<"EventsScreen">) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [eventList, setEventList] = useState([]);

  const dbReference = database();

  const handleFilterPress = (item: any) => {
    setActiveIndex(item.id);
  };

  useEffect(() => {
    const reference = dbReference
      .ref(`/events`)
      .on('value', snapshot => {
        // console.log('Event data: ', snapshot.val());
        setEventList(snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => dbReference.ref('/events').off('child_added', reference);
  }, []);

  return (
    <SafeAreaView style={styles.maincontainer} >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
      >
        {/* <Icon name='search' /> */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 24 }}
        >
          {eventFilters.map((item) => {
            const { id, title } = item;
            return (
              <Box
                backgroundColor={activeIndex === id ? "textBlue" : "blueHighlight"}
                paddingVertical='sms'
                paddingHorizontal='ssm'
                borderRadius={12}
                marginRight='sml'
                id={`${id.toString()}${title}`}
              >
                <Pressable onPress={() => handleFilterPress(item)} type='scale'>
                  <Text variant="medium12" color={activeIndex === id ? "white" : 'textBlue'}>{title}</Text>
                </Pressable>
              </Box>
            )
          })}
        </ScrollView>

        <Box flexDirection='row' justifyContent='space-between' marginTop='xxl'>
          <Text variant='bold14'>Near you</Text>
          <Pressable onPress={() => { }} type='scale' >
            <Text variant='medium12' color="textBlue">See more</Text>
          </Pressable>
        </Box>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {events.map((item: TEvent) => {
            const { artist, date, id, venue } = item;
            return (
              <Box marginTop='md' id={`${id.toString()}${artist}`} marginRight='sm' >
                <Image source={eventBackground} style={{ height: 120, width: 280, borderTopLeftRadius: 16, borderTopRightRadius: 16, }} />
                <Box position='absolute' right={10} top={10} paddingHorizontal="sml" paddingVertical='sms' backgroundColor='textBlue' borderRadius={12}>
                  <Text color='white' variant="medium10" textTransform='uppercase'>{date}</Text>
                </Box>
                <Box padding="md" backgroundColor='superlightgrey' borderBottomLeftRadius={16} borderBottomRightRadius={16}>
                  <Text variant="bold14" textTransform='capitalize'>{artist}</Text>
                  <Text variant="regular12" textTransform='capitalize' marginTop='xs'>{formatEllipseText(venue, 20)}</Text>

                  <Pressable
                    borderWidth={1}
                    height={40}
                    borderRadius={12}
                    marginTop='md'
                    borderColor='textBlue'
                    alignItems='center'
                    justifyContent='center'
                    type='scale'
                    onPress={() => {
                      setTimeout(() => {
                        navigation.navigate("SubscriptionScreen", {eventItem: item})
                      }, 300);
                    }}
                  >
                    <Text variant="medium12" color='textBlue' >Buy tickets</Text>
                  </Pressable>
                </Box>
              </Box>
            )
          })}
        </ScrollView>

        <Text variant="bold14" marginTop='xxl'>Your events</Text>

        <Box >
          {events.map((item) => {
            const { artist, id, venue } = item;
            return (
              <Box marginTop='md' flexDirection='row' id={`${id.toString()}${artist}`}>
                <Image source={eventBackground} style={{ height: 69, width: '20%', borderTopLeftRadius: 16, borderBottomLeftRadius: 16, }} />

                <Box
                  justifyContent='space-between'
                  flexDirection='row' height={69}
                  paddingHorizontal='md'
                  alignItems="center"
                  width={'80%'}
                  backgroundColor='superlightgrey'
                  borderTopRightRadius={16}
                  borderBottomRightRadius={16}
                >
                  <Box justifyContent='center'>
                    <Text variant="bold14" >{formatEllipseText(artist, 20)}</Text>
                    <Text variant="regular12" color='secondary' marginTop='xs'>{formatEllipseText(venue, 20)}</Text>
                  </Box>
                  <Icon name='arrow_forward' size={12} />
                </Box>
              </Box>
            )
          })}
        </Box>
        <Box flexDirection='row' justifyContent='space-between' marginTop='xxl'>
          <Text variant='bold14'>Selling out</Text>
          <Pressable onPress={() => { }} type='scale' >
            <Text variant='medium12' color="textBlue">See more</Text>
          </Pressable>
        </Box>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {events.map((item) => {
            const { artist, date, id, venue } = item;
            return (
              <Box marginTop='md' id={`${id.toString()}${artist}`} marginRight='sm' >
                <Image source={eventBackground} style={{ height: 120, width: 280, borderTopLeftRadius: 16, borderTopRightRadius: 16, }} />
                <Box position='absolute' right={10} top={10} paddingHorizontal="sml" paddingVertical='sms' backgroundColor='textBlue' borderRadius={12}>
                  <Text color='white' variant="medium10" textTransform='uppercase'>{date}</Text>
                </Box>
                <Box padding="md" backgroundColor='superlightgrey' borderBottomLeftRadius={16} borderBottomRightRadius={16}>
                  <Text variant="bold14" textTransform='capitalize'>{artist}</Text>
                  <Text variant="regular12" textTransform='capitalize' marginTop='xs'>{formatEllipseText(venue, 20)}</Text>

                  <Pressable
                    borderWidth={1}
                    height={40}
                    borderRadius={12}
                    marginTop='md'
                    borderColor='textBlue'
                    alignItems='center'
                    justifyContent='center'
                    type='scale'
                    onPress={() => {
                      setTimeout(() => {
                        navigation.navigate("SubscriptionScreen", {eventItem: item})
                      }, 300);
                    }}
                  >
                    <Text variant="medium12" color='textBlue' >Buy tickets</Text>
                  </Pressable>
                </Box>
              </Box>
            )
          })}
        </ScrollView>
      </ScrollView>
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
