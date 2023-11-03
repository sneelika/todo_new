import React from 'react';
import {Box, Text} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {AuthScreenNavigationType} from '../../navigation/types';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import Button from '../../components/shared/button';

const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'Welcome'>>();

  const navigateToSigInScreen = () => {
    navigation.navigate('SignIn');
  };

  const navigateToSignUpScreen = () => {
    console.log('Button Pressed');
    navigation.navigate('SignUp');
  };

  const WELCOME_IMAGE =
    'https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?w=1060&t=st=1697041955~exp=1697042555~hmac=61116bcb8afa230165f7e4cf52d60911fdfc2ce32dc127f0603934db81ab4fdb';
  return (
    <SafeAreaWrapper>
      <Box flex={1} justifyContent="center">
        <Box alignItems="center" mb="3.5">
          <Image
            source={{
              uri: WELCOME_IMAGE,
              width: 350,
              height: 350,
            }}
          />
        </Box>
        <Text textAlign="center" variant="textXl" fontWeight="700">
          Welcome to TODO App
        </Text>
        <Box my="3.5" mx="10">
          <Button label="Let's get started" onPress={navigateToSignUpScreen} />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;
