import { SafeAreaView, ScrollView, StyleSheet, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Icon, IconName, Pressable, Text } from '@/components/';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { PaletteType, palette } from '@/theme';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/authSlice';
import { RootState } from '@/store/Store';
import { RootTabScreenProps } from '@/navigation/types';

type TThings = {
  title: string;
  id: number;
  background: PaletteType
};

const things = [
  { title: 'Health', background: 'blueBackground', icon: "health", id: 1 },
  { title: 'Sport', background: 'buttonGreen', icon: "sports", id: 2 },
  { title: 'News', background: 'gradientBlue', icon: "news", id: 3 },
  { title: 'Events', background: 'lightBorder', icon: "events", id: 4 },
];

const HomeScreen = ({ navigation}: RootTabScreenProps<"HomeScreen">) => {
  const { userData } = useSelector((state: RootState) => state.auth);

  const dbReference = database();
  const firebaseAuth = auth();
  const dispatch = useDispatch();

  const updateDb = (name: string) => {
    dbReference.ref(`/User/${name}`).update({
      age: 30,
    })
      .then(() => console.log('Data updated to db.'));
  };

  const onPostLike = (postId: string) => {
    const reference = dbReference.ref(`/likes/${postId}`);

    // Execute transaction
    return reference.transaction(currentLikes => {
      if (currentLikes === null) return 1;
      return currentLikes + 1;
    });
  };

  useEffect(() => {
    const username = firebaseAuth?.currentUser?.email.split("@")?.[0];
    const reference = dbReference
      .ref(`/User/${username}`)
      .on('value', snapshot => {
        // console.log('User data: ', snapshot.val());
        dispatch(setUser(snapshot.val()));
      });

    // Stop listening for updates when no longer required
    return () => dbReference.ref('/User').off('child_added', reference);
  }, []);

  const goToNotification = () => {
    navigation.navigate("NotificationScreen");
  };


  // useEffect(() => {
  //   const userAgeRef = dbReference.ref('/User/Health/age');

  //   userAgeRef.on('value', snapshot => {
  //     console.log('Users age: ', snapshot.val());
  //   });

  //   dbReference
  //     .goOffline()
  //     .then(() => {
  //       return dbReference.ref(`/User/Health`).update({
  //         age: 22,
  //         name: "Health"
  //       });
  //     })
  //     .then(() => {
  //       console.log('User updated whilst offline.');
  //     });
  // }, []);


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: palette.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <Box paddingHorizontal='md' flex={1}>
          <Box flexDirection="row" justifyContent="space-between" marginTop="xl" width='100%' >
            <Box width='90%'>
              <Text variant="medium16" textTransform='capitalize' >Hi, {userData?.name}</Text>
            </Box>
            <Pressable type='scale' width='20%' onPress={goToNotification}>
              <Icon name='bell' />
            </Pressable>
          </Box>

          <Box marginTop='xl'>
            <Text variant="regular24" >1,234.00</Text>

            <Box marginTop="xs" flexDirection='row' alignItems='center'>
              <Icon name='address_book' size={14} />
              <Text variant="medium16" marginLeft='xs'>NGN</Text>
            </Box>
          </Box>

          <Text variant="regular14" marginTop='xl' color='secondary'>Here are some things you can do</Text>

          <Box flexDirection='row' flexWrap='wrap' justifyContent='space-between'>
            {things.map((item) => {
              const { background, id, title, icon } = item;
              return (
                <EventsItem
                  background={background as PaletteType}
                  icon={icon as IconName}
                  id={id}
                  title={title}
                  itemPress={() => { }}
                />
              )
            })}
          </Box>

          <Text variant="regular14" marginTop='xl' color='secondary'>Your favorite people.</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Box flexDirection="row" marginTop="md">
              {new Array(7).fill(0).map((_, i) => {
                return (
                  <Box justifyContent='center' marginRight='sm' key={i.toString()}>
                    {/* <Box height={60} width={60} borderRadius={30} backgroundColor="pinBackground" marginRight='sm' /> */}
                    <Icon name='profile_pic' size={60} />
                    <Text variant="medium12" marginTop='xs' color='textColor'>Username</Text>
                  </Box>
                )
              })}
            </Box>

          </ScrollView>

        </Box>

      </ScrollView>
    </SafeAreaView>
  )
};

type EventsProps = {
  background: PaletteType;
  icon: IconName;
  id: number
  itemPress: () => void
  title: string;
}

const EventsItem = ({
  background,
  icon,
  id,
  itemPress,
  title,
}: EventsProps) => {
  return (
    <Box
      width='48%'
      height={150}
      marginTop='sm'
      borderRadius={10}
      id={id.toString()}
      justifyContent='center'
      alignItems='center'
      paddingVertical='sm'
      backgroundColor={background}
    >
      <Pressable alignItems='center' onPress={itemPress} type='scale'>
        <Icon name={icon} size={60} />
        <Text variant="medium16" marginTop='md' color='textColor'>{title}</Text>
      </Pressable>
    </Box>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({});
