import { SafeAreaView, ScrollView, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import { palette } from '@/theme/';
import { Box, Button, Icon, Pressable, PrimaryInput, Text } from '@/components/';
import { RootStackScreenProps } from '@/navigation/types';
import { useForm } from 'react-hook-form';

const ticketPrices = [
  { title: 'Gold', price: '500,000', info: 'Table of ten', id: 1 },
  { title: 'VIP', price: '50,000', info: 'VIP section', id: 2 },
  { title: 'Regular', price: '15,000', info: 'Regular ticket', id: 3 },
]

const Subscription = ({ navigation }: RootStackScreenProps<"SubscriptionScreen">) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (item: any) => {
    setActiveIndex(item.id);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      unit: "",
    },
  });

  const handleBuyTicket = (data: { unit: string }) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);

    }, 1000);
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }} style={{ flex: 1 }}>
        <Box paddingHorizontal="md">
          <Box flexDirection='row' alignItems="center" marginTop="md">
            <Pressable onPress={() => navigation.goBack()} type='scale'>
              <Icon name='arrow_back' size={16} />
            </Pressable>
            <Text variant="medium24" marginLeft='md'>Tickets</Text>
          </Box>

          <Box marginTop='lg' >
            <Text variant="bold24" >Buy your ticket</Text>
            <Text variant="regular14" color='secondary' marginTop='xs'>Choose your preference</Text>

            <Box marginTop="xxl">
              {ticketPrices.map((item) => {
                const { id, info, price, title } = item;
                return (
                  <Pressable
                    backgroundColor={activeIndex === id ? 'blueHighlight' : 'transparent'}
                    padding='md'
                    borderRadius={16}
                    flexDirection='row'
                    alignItems='center'
                    marginBottom='sml'
                    borderWidth={activeIndex === id ? 0 : 1}
                    borderColor='border'
                    onPress={() => handleSelect(item)}
                  >
                    <Box
                      height={16}
                      width={16}
                      borderRadius={8}
                      borderWidth={activeIndex === id ? 4 : 1}
                      borderColor={activeIndex === id ? "textBlue" : "border"}
                    />
                    <Box flexDirection='row' justifyContent='space-between' width={"100%"} paddingRight='md' paddingLeft='sml' alignItems='center'>
                      <Box >
                        <Text variant="bold14" >{title}</Text>
                        <Text variant="regular10" color='textBlue' marginTop='xs' >{info}</Text>
                      </Box>

                      <Box >
                        <Text variant="bold16" >{`₦${price}`}</Text>
                      </Box>
                    </Box>
                  </Pressable>
                )
              })}
            </Box>

            <Box marginTop="lg" >
              <PrimaryInput
                placeholder='Enter number of tickets you want'
                control={control}
                name="unit"
                label='Ticket unit'
                keyboardType="numeric"
                rules={{
                  required: "Unit is required",
                  maxLength: {
                    value: 3,
                    message: "Maximum of 3 characters",
                  },
                }}
                errorMessage={errors.unit?.message}
              />
            </Box>

            <Box padding='lg' borderRadius={16} marginTop='xl' backgroundColor='blueHighlight'>
              <Text variant="bold16" >You'll get:</Text>

              <Box flexDirection='row' alignItems='center' marginTop='md' >
                <Box backgroundColor='black' height={8} width={8} borderRadius={4} />
                <Text variant="regular12" marginLeft='sml' color='secondary'>Unlimited access</Text>
              </Box>
              <Box flexDirection='row' alignItems='center' marginTop='md'>
                <Box backgroundColor='black' height={8} width={8} borderRadius={4} />
                <Text variant="regular12" marginLeft='sml' color='secondary'>200GB storage</Text>
              </Box>
              <Box flexDirection='row' alignItems='center' marginTop='md'>
                <Box backgroundColor='black' height={8} width={8} borderRadius={4} />
                <Text variant="regular12" marginLeft='sml' color='secondary'>Sync all your devices</Text>
              </Box>
            </Box>

            <Button
              label='Buy'
              onPress={handleSubmit(handleBuyTicket)}
              backgroundColor="primary"
              variant='textColor'
              marginTop='xl'
              isloading={isLoading}
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
};

export default Subscription;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.background,
  },
});
