import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PrimaryButton } from '../components';

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',

      }}
    >
      <View style={{ flex: 0.9, paddingHorizontal: 16 }} >
        <Text>HomeScreen</Text>
      </View>
      <View style={{ flex: 0.1, paddingHorizontal: 16 }} >
        <PrimaryButton
          label='Go to next'
          onPress={() => console.log('first')}
        />

      </View>
    </SafeAreaView>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({});
