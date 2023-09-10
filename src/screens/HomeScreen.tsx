import { SafeAreaView, ScrollView, StyleSheet, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/authSlice';
import { RootState } from '@/store/Store';
import { Box, Button, Icon, Pressable, PrimaryButton, PrimaryInput, Text } from '@/components/';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const things = [
  { title: 'Health', background: 'blueBackground', id: 1 },
  { title: 'Sport', background: 'contactColor', id: 2 },
  { title: 'News', background: 'gradientBlue', id: 3 },
  { title: 'Events', background: 'lightBorder', id: 4 },
]

const HomeScreen = () => {
  const [name, setName] = useState("Coder");
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    getFieldState,
  } = useForm({
    defaultValues: {
      childFirstName: "",
      // childLastName: "",
    },
  });

  const dbReference = database();
  const dispatch = useDispatch();

  const addToDb = (name: string) => {
    //set to null to delete data or .remove()
    dbReference.ref(`/User/${name}`).set({
      name: name,
      age: 300,
    })
    .then(() => console.log('Data set to db.'));
  };

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
    const reference = dbReference
      .ref('/User')
      .on('value', snapshot => {
        // console.log('User data: ', snapshot.val());
        setName(snapshot.val())
      });

    // Stop listening for updates when no longer required
    return () => dbReference.ref('/User').off('child_added', reference);
  }, []);

  
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


  const loginOutUser = async () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        dispatch(logout());
      });
    
    // await dbReference.goOnline();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <Box paddingHorizontal='md' flex={1}>
          <Box flexDirection="row" justifyContent="space-between" marginTop="xl">
            <Text variant="medium16" >Hi, User</Text>
            <Pressable type='scale' onPress={loginOutUser}>
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
              const { background, id, title } = item;
              return (
                <Box
                  width='48%'
                  height={150}
                  backgroundColor={background}
                  marginTop='sm'
                  borderRadius={10}
                  id={id.toString()}
                  justifyContent='flex-end'
                  alignItems='center'
                  paddingVertical='sm'
                  onPress={() => updateDb(title)}
                  type='scale'
                >
                  <Text variant="medium16" marginLeft='xs' color='textColor'>{title}</Text>
                </Box>
              )
            })}
          </Box>

          <Text variant="regular14" marginTop='xl' color='secondary'>Your favorite people.</Text>

          <Box flexDirection="row" marginTop="md">
            {new Array(4).fill(0).map((_, i) => {
              return (
                <Box justifyContent='center' key={i.toString()}>
                  <Box height={60} width={60} borderRadius={30} backgroundColor="pinBackground" marginRight='sm' />
                  <Text variant="medium12" marginTop='xs' color='textColor'>Username</Text>
                </Box>
              )
            })}
          </Box>

          {/* <PrimaryInput
            placeholder='Enter your name'
            control={control}
            name="childFirstName"
            label='Name'
            errorMessage={errors.childFirstName?.message}
          />
          <PrimaryButton
            label='Go to next'
            onPress={loginAction}
          />
          <Pressable onPress={buttonPress} type='scale'>
            <Icon name='address_book' />
          </Pressable> */}

          {/* <Button
            label='Go to tabs'
            onPress={() => onPostLike('2').then(transaction => {
              console.log('New post like count: ', transaction.snapshot.val());
            })}
            backgroundColor="buttonGreen"
            variant='secondary'
          /> */}
        </Box>

      </ScrollView>
    </SafeAreaView>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({});
